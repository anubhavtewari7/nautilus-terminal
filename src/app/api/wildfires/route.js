import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// --------------------------------------------------------------------------
// NASA FIRMS -- Active Fire / Hotspot Data (no API key required for public CSV)
// Source: VIIRS SNPP NRT 24-hour global composite
// Columns: latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,
//          satellite,instrument,confidence,version,bright_ti5,frp,daynight
// --------------------------------------------------------------------------
const FIRMS_CSV_URL =
  'https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv'

// --------------------------------------------------------------------------
// Supply-chain-critical fire zones
// Each region: bounding box [minLat, maxLat, minLng, maxLng], label, commodity
// --------------------------------------------------------------------------
const FIRE_REGIONS = [
  { id:'brazil_cerrado',   minLat:-25, maxLat: -5, minLng:-65, maxLng:-40, label:'Brazil Cerrado',          commodity:'soy, cotton, beef',             sev:'HIGH' },
  { id:'amazon',           minLat:-15, maxLat:  5, minLng:-75, maxLng:-45, label:'Amazon Basin',            commodity:'timber, cattle, soy',           sev:'HIGH' },
  { id:'se_asia',          minLat: -5, maxLat: 20, minLng: 95, maxLng:135, label:'Southeast Asia',          commodity:'rubber, palm oil, electronics', sev:'HIGH' },
  { id:'indonesia',        minLat:-10, maxLat:  6, minLng: 95, maxLng:141, label:'Indonesia / Borneo',      commodity:'palm oil, rubber, coal',        sev:'HIGH' },
  { id:'central_africa',   minLat:-10, maxLat: 15, minLng: 10, maxLng: 40, label:'Central Africa',          commodity:'cobalt, cocoa, timber',         sev:'MEDIUM' },
  { id:'west_africa',      minLat:  2, maxLat: 18, minLng:-20, maxLng: 10, label:'West Africa',             commodity:'cocoa, coffee, cashew',         sev:'MEDIUM' },
  { id:'india_deccan',     minLat:  8, maxLat: 28, minLng: 68, maxLng: 90, label:'India (Deccan)',          commodity:'cotton, spices, textiles',      sev:'MEDIUM' },
  { id:'western_us',       minLat: 32, maxLat: 50, minLng:-125, maxLng:-100, label:'Western US / Canada',  commodity:'timber, semiconductors',        sev:'MEDIUM' },
  { id:'russia_siberia',   minLat: 50, maxLat: 75, minLng: 50, maxLng:180, label:'Russia / Siberia',        commodity:'wheat, energy, timber',         sev:'MEDIUM' },
  { id:'australia',        minLat:-40, maxLat:-10, minLng:110, maxLng:155, label:'Australia',               commodity:'wheat, wool, iron ore, coal',   sev:'MEDIUM' },
]

// Region centroid for lat/lng used on globe
const REGION_CENTROIDS = {
  brazil_cerrado:  { lat:-15.0, lng:-52.5 },
  amazon:          { lat: -5.0, lng:-60.0 },
  se_asia:         { lat:  7.5, lng:115.0 },
  indonesia:       { lat: -2.0, lng:118.0 },
  central_africa:  { lat:  2.5, lng: 25.0 },
  west_africa:     { lat: 10.0, lng: -5.0 },
  india_deccan:    { lat: 18.0, lng: 79.0 },
  western_us:      { lat: 41.0, lng:-115.0 },
  russia_siberia:  { lat: 62.0, lng:105.0 },
  australia:       { lat:-25.0, lng:135.0 },
}

const CACHE_MS  = 30 * 60 * 1000
let _cache     = null
let _cacheTime = 0

// --------------------------------------------------------------------------
// Parse FIRMS CSV (no external library -- hand-rolled for edge runtime compat)
// --------------------------------------------------------------------------
function parseFIRMSCsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim())
  const latIdx  = headers.indexOf('latitude')
  const lngIdx  = headers.indexOf('longitude')
  const frpIdx  = headers.indexOf('frp')         // fire radiative power (MW)
  const confIdx = headers.indexOf('confidence')
  const dateIdx = headers.indexOf('acq_date')
  if (latIdx === -1 || lngIdx === -1) return []

  return lines.slice(1).map(line => {
    const cols = line.split(',')
    return {
      lat:  parseFloat(cols[latIdx]),
      lng:  parseFloat(cols[lngIdx]),
      frp:  frpIdx  >= 0 ? parseFloat(cols[frpIdx])  : 0,
      conf: confIdx >= 0 ? cols[confIdx].trim()       : 'n',
      date: dateIdx >= 0 ? cols[dateIdx].trim()       : '',
    }
  }).filter(p => !isNaN(p.lat) && !isNaN(p.lng))
}

// --------------------------------------------------------------------------
// Assign each hotspot to a region
// --------------------------------------------------------------------------
function classifyHotspots(hotspots) {
  const counts = {}    // regionId -> { count, totalFrp, maxFrp }
  for (const r of FIRE_REGIONS) counts[r.id] = { count:0, totalFrp:0, maxFrp:0 }

  for (const pt of hotspots) {
    for (const r of FIRE_REGIONS) {
      if (pt.lat >= r.minLat && pt.lat <= r.maxLat && pt.lng >= r.minLng && pt.lng <= r.maxLng) {
        counts[r.id].count++
        counts[r.id].totalFrp += pt.frp
        if (pt.frp > counts[r.id].maxFrp) counts[r.id].maxFrp = pt.frp
        break  // assign to first matching region
      }
    }
  }
  return counts
}

// --------------------------------------------------------------------------
// Build risk objects from classified counts
// --------------------------------------------------------------------------
function buildRisks(counts, updatedAt) {
  const risks = []
  for (const region of FIRE_REGIONS) {
    const c = counts[region.id]
    if (c.count === 0) continue

    const intensity = c.count > 500 ? 'Extreme' : c.count > 100 ? 'High' : c.count > 30 ? 'Moderate' : 'Low'
    const severity  = c.count > 100 ? 'HIGH' : region.sev
    const centroid  = REGION_CENTROIDS[region.id]

    risks.push({
      id:       `fire_${region.id}`,
      title:    `Active Wildfires -- ${region.label}`,
      type:     'Risk',
      category: 'Wildfire',
      severity,
      lat:      centroid.lat,
      lng:      centroid.lng,
      desc:     `${c.count.toLocaleString()} active fire detections in the last 24h. ${intensity} intensity (peak FRP: ${Math.round(c.maxFrp)} MW). Affects: ${region.commodity}.`,
      mitigation: `Monitor procurement from ${region.label}. Check supplier sites for operational status. Activate alternate sourcing contingency if fire expands.`,
      source:   'NASA FIRMS VIIRS SNPP',
      hotspots: c.count,
      maxFrp:   Math.round(c.maxFrp),
      updated:  updatedAt,
    })
  }
  return risks.sort((a, b) => b.hotspots - a.hotspots)
}

// --------------------------------------------------------------------------
// Route handler
// --------------------------------------------------------------------------
export async function GET() {
  try {
    if (_cache && Date.now() - _cacheTime < CACHE_MS) {
      return NextResponse.json(_cache)
    }

    const res = await fetch(FIRMS_CSV_URL, {
      headers: { 'User-Agent': 'NAUTILUS-Terminal/1.0' },
      next: { revalidate: 1800 }
    })
    if (!res.ok) throw new Error(`FIRMS ${res.status}`)

    const text     = await res.text()
    const hotspots = parseFIRMSCsv(text)
    const counts   = classifyHotspots(hotspots)
    const updatedAt = new Date().toISOString()
    const risks    = buildRisks(counts, updatedAt)

    const payload = {
      risks,
      totalHotspots: hotspots.length,
      activeRegions: risks.length,
      updated: updatedAt,
      source: 'NASA FIRMS VIIRS SNPP NRT 24h',
    }

    _cache     = payload
    _cacheTime = Date.now()

    return NextResponse.json(payload)

  } catch (err) {
    console.error('[/api/wildfires]', err.message)
    return NextResponse.json({
      risks: [],
      totalHotspots: 0,
      activeRegions: 0,
      updated: new Date().toISOString(),
      source: 'Unavailable',
      error: 'Live fire data unavailable',
    })
  }
}
