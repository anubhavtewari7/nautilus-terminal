import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// --------------------------------------------------------------------------
// GDELT GEO 2.0 API -- free, no API key, updated every 15 minutes.
// We query for conflict/terror/unrest themes in supply-chain-critical
// countries and convert the top locations into risk objects with lat/lng.
// --------------------------------------------------------------------------

// Supply-chain-critical bounding boxes [minLat, maxLat, minLng, maxLng]
// Used to filter GDELT point results to relevant geographies.
const SC_REGIONS = [
  { id:'ukraine',      minLat: 44, maxLat: 52, minLng: 22,  maxLng: 40,  label:'Ukraine',              commodity:'wheat, steel, sunflower oil',      baseRisk:'HIGH' },
  { id:'red_sea',      minLat:  8, maxLat: 30, minLng: 32,  maxLng: 55,  label:'Red Sea / Yemen',       commodity:'global shipping lane',             baseRisk:'HIGH' },
  { id:'taiwan',       minLat: 21, maxLat: 27, minLng:118,  maxLng:123,  label:'Taiwan Strait',         commodity:'semiconductors, electronics',       baseRisk:'HIGH' },
  { id:'myanmar',      minLat: 10, maxLat: 28, minLng: 92,  maxLng:102,  label:'Myanmar',               commodity:'garments, jade, rare earth',        baseRisk:'HIGH' },
  { id:'drc',          minLat:-13, maxLat:  5, minLng: 12,  maxLng: 31,  label:'DR Congo',              commodity:'cobalt, coltan, copper',            baseRisk:'HIGH' },
  { id:'middle_east',  minLat: 28, maxLat: 38, minLng: 33,  maxLng: 50,  label:'Middle East',           commodity:'oil, gas, petrochemicals',         baseRisk:'HIGH' },
  { id:'mexico',       minLat: 14, maxLat: 32, minLng:-118, maxLng:-86,  label:'Mexico',                commodity:'auto parts, electronics, agri',    baseRisk:'HIGH' },
  { id:'ethiopia',     minLat:  3, maxLat: 15, minLng: 33,  maxLng: 48,  label:'East Africa',           commodity:'coffee, sesame, cut flowers',      baseRisk:'MEDIUM' },
  { id:'nigeria',      minLat:  4, maxLat: 14, minLng:  3,  maxLng: 15,  label:'Nigeria / Niger Delta',  commodity:'oil, cocoa, palm oil',             baseRisk:'MEDIUM' },
  { id:'bangladesh',   minLat: 20, maxLat: 27, minLng: 88,  maxLng: 93,  label:'Bangladesh',            commodity:'garments, textiles, leather',      baseRisk:'MEDIUM' },
  { id:'pakistan',     minLat: 23, maxLat: 37, minLng: 60,  maxLng: 78,  label:'Pakistan / Afghanistan', commodity:'cotton, textiles',                 baseRisk:'MEDIUM' },
  { id:'venezuela',    minLat:  0, maxLat: 13, minLng:-74,  maxLng:-58,  label:'Venezuela / Colombia',  commodity:'oil, coffee, coal',                baseRisk:'MEDIUM' },
  { id:'sudan',        minLat: 10, maxLat: 23, minLng: 22,  maxLng: 40,  label:'Sudan / Sahel',         commodity:'gold, sesame, gum arabic',         baseRisk:'MEDIUM' },
  { id:'china_coast',  minLat: 18, maxLat: 42, minLng:108,  maxLng:125,  label:'South China Sea',       commodity:'electronics, machinery, manufacturing', baseRisk:'MEDIUM' },
  { id:'caucasus',     minLat: 38, maxLat: 44, minLng: 40,  maxLng: 50,  label:'Caucasus / Iran',       commodity:'oil, gas, minerals',               baseRisk:'MEDIUM' },
]

const CACHE_MS  = 60 * 60 * 1000   // 1-hour cache
let _cache     = null
let _cacheTime = 0

// --------------------------------------------------------------------------
// Classify a lat/lng point into a supply-chain region (first match wins)
// --------------------------------------------------------------------------
function classifyPoint(lat, lng) {
  for (const r of SC_REGIONS) {
    if (lat >= r.minLat && lat <= r.maxLat && lng >= r.minLng && lng <= r.maxLng) {
      return r
    }
  }
  return null
}

// --------------------------------------------------------------------------
// Parse GDELT GeoJSON into per-region aggregates
// --------------------------------------------------------------------------
function aggregateByRegion(geojson) {
  const totals = {}

  for (const feature of (geojson.features || [])) {
    const [lng, lat] = feature.geometry?.coordinates || []
    if (lat == null || lng == null) continue

    const count  = feature.properties?.count  ?? 1
    const name   = feature.properties?.name   ?? ''
    const region = classifyPoint(lat, lng)
    if (!region) continue

    const id = region.id
    if (!totals[id]) {
      totals[id] = { region, count: 0, maxCount: 0, topLocation: '', centroidLat: 0, centroidLng: 0, n: 0 }
    }
    totals[id].count    += count
    totals[id].n        += 1
    totals[id].centroidLat += lat
    totals[id].centroidLng += lng
    if (count > totals[id].maxCount) {
      totals[id].maxCount   = count
      totals[id].topLocation = name
    }
  }

  return Object.values(totals)
}

// --------------------------------------------------------------------------
// Convert aggregated region stats to risk objects
// --------------------------------------------------------------------------
function buildIncidentRisks(aggregates, updatedAt) {
  return aggregates
    .filter(a => a.count > 1)   // ignore single-article noise
    .map(a => {
      const { region } = a
      const centLat = a.centroidLat / a.n
      const centLng = a.centroidLng / a.n
      const intensity = a.count > 500 ? 'Extreme' : a.count > 200 ? 'High' : a.count > 50 ? 'Moderate' : 'Low'
      const severity  = a.count > 200 ? 'HIGH' : region.baseRisk

      return {
        id:       `acled_${region.id}`,
        title:    `${intensity} Instability -- ${region.label}`,
        type:     'Risk',
        category: 'Geopolitical Incident',
        severity,
        lat:      parseFloat(centLat.toFixed(2)),
        lng:      parseFloat(centLng.toFixed(2)),
        desc:     `${a.count.toLocaleString()} conflict/unrest news events in the last 7 days across ${region.label}` +
                  (a.topLocation ? ` (highest concentration: ${a.topLocation})` : '') +
                  `. Affects supply chain exposure to: ${region.commodity}.`,
        mitigation: `Monitor procurement and logistics from ${region.label}. ` +
                    `Review force majeure clauses with suppliers. ` +
                    `Check carrier/insurance war-risk status for affected corridors.`,
        source:   'GDELT Project (live news)',
        articleCount: a.count,
        updated:  updatedAt,
      }
    })
    .sort((a, b) => b.articleCount - a.articleCount)
}

// --------------------------------------------------------------------------
// Hardcoded baseline -- runs when GDELT is unavailable.
// Supply-chain-specific context that pure news volume can't provide.
// --------------------------------------------------------------------------
const FALLBACK_INCIDENTS = [
  { id:'acled_ukraine', title:'Active Combat -- Eastern Ukraine', type:'Risk', category:'Armed Conflict', severity:'HIGH', lat:48.5, lng:37.5, desc:'Ongoing large-scale hostilities. Black Sea grain corridor under pressure; Ukrainian steel and agricultural exports severely curtailed.', mitigation:'Reroute Ukrainian wheat/sunflower oil sourcing to Argentina, Brazil, or EU. Monitor Black Sea insurance premiums.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_red_sea', title:'Houthi Maritime Attacks -- Red Sea', type:'Risk', category:'Armed Conflict', severity:'HIGH', lat:14.0, lng:43.5, desc:'Houthi forces targeting commercial shipping. Major carriers diverted around Cape of Good Hope, adding 12-14 days and ~$1M per vessel.', mitigation:'Price in Cape diversion on Asia-Europe lanes. Review force majeure clauses with carriers. Verify war-risk insurance.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_taiwan', title:'PLA Military Exercises -- Taiwan Strait', type:'Risk', category:'Geopolitical Tension', severity:'HIGH', lat:24.5, lng:120.5, desc:'Periodic PLA exercises restrict commercial traffic. Semiconductor concentration risk (TSMC, ASE) is extreme.', mitigation:'Accelerate dual-sourcing to Korea/US fabs. Build 90-day safety stock on critical chip families.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_myanmar', title:'Civil War -- Myanmar', type:'Risk', category:'Armed Conflict', severity:'HIGH', lat:20.0, lng:96.0, desc:'Multi-front civil conflict disrupts garment and rare earth supply chains. China-Myanmar trade corridors intermittently closed.', mitigation:'Shift garment sourcing to Vietnam or Bangladesh. Audit rare earth suppliers for Myanmar origin.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_drc', title:'Armed Groups -- DRC Kivu Provinces', type:'Risk', category:'Armed Conflict', severity:'HIGH', lat:-2.5, lng:28.0, desc:'M23 active in North and South Kivu threatening cobalt and coltan mining. OECD due diligence requirements apply.', mitigation:'Require RMI-RMAP audit for all DRC cobalt. Develop Indonesia NPI cobalt as alternative.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_mexico', title:'Cartel Cargo Extortion -- Mexico', type:'Risk', category:'Organized Crime', severity:'HIGH', lat:24.0, lng:-104.0, desc:'CJNG and Sinaloa factions operating toll extortion on key highway corridors. Cargo theft up YoY.', mitigation:'Use GPS-tracked convoys with escorts on Michoacán routes. Require cargo insurance with theft riders.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_middle_east', title:'Regional Escalation -- Middle East', type:'Risk', category:'Armed Conflict', severity:'HIGH', lat:31.5, lng:35.0, desc:'Ongoing conflict with regional spillover risk. Haifa port reduced; Eilat near-closed. Israeli tech exports at risk.', mitigation:'Diversify Israeli-origin specialty chemicals and semiconductors. Monitor Suez insurance premiums.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_nigeria', title:'Pipeline Sabotage -- Niger Delta', type:'Risk', category:'Armed Conflict', severity:'MEDIUM', lat:5.5, lng:6.5, desc:'Ongoing pipeline sabotage reduces oil output and disrupts cocoa/palm oil logistics via Port Harcourt.', mitigation:'Flag Nigeria-origin agricultural commodities for supply continuity review. Verify Bonny terminal status.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_bangladesh', title:'Labor Unrest -- Dhaka Garment Sector', type:'Risk', category:'Protests', severity:'MEDIUM', lat:23.8, lng:90.4, desc:'Recurring wage protests at EPZs. Factory shutdowns average 3-7 days. Political instability elevated.', mitigation:'Build 45-day finished goods buffer for Bangladesh-origin SKUs. Pre-position in Vietnam or Cambodia.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_ethiopia', title:'Conflict Spillover -- Ethiopia Corridor', type:'Risk', category:'Armed Conflict', severity:'MEDIUM', lat:9.0, lng:40.0, desc:'Residual Tigray conflict disrupts Addis Ababa-Djibouti rail corridor. Coffee and sesame exports face delays.', mitigation:'Source Ethiopian coffee through forward contracts with Djibouti buffer warehousing.', source:'Baseline', fallback_vintage:'2026-Q3' },
  { id:'acled_venezuela', title:'FARC / ELN -- Colombia Trade Corridors', type:'Risk', category:'Armed Conflict', severity:'MEDIUM', lat:4.5, lng:-74.0, desc:'Dissident factions active in Cauca and Chocó. Buenaventura port access sporadically affected.', mitigation:'Diversify Colombian coffee sourcing with Ethiopian or Vietnamese origins.', source:'Baseline', fallback_vintage:'2026-Q3' },
]

// --------------------------------------------------------------------------
// Route handler
// --------------------------------------------------------------------------
export async function GET() {
  try {
    if (_cache && Date.now() - _cacheTime < CACHE_MS) {
      return NextResponse.json(_cache)
    }

    let incidents, source

    try {
      // GDELT GEO 2.0 -- try two query strategies.
      // Strategy A: CAMEO theme codes (precise, may fail on some API versions)
      // Strategy B: Plain keyword terms (broader, more reliable fallback)
      const gdeltBase = 'https://api.gdeltproject.org/api/v2/geo/geo'
      // Keyword-based query — reliable across all GDELT API versions
      const q = encodeURIComponent('war OR conflict OR military OR attack OR protest OR sanction OR blockade')
      const url = `${gdeltBase}?query=${q}&mode=PointData&format=GeoJSON&timespan=7d&maxpoints=500&geores=1`

      let geojson = null
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NautilusTerminal/2.0)',
            'Accept': 'application/json, */*',
          },
          signal: AbortSignal.timeout(10000),
          next: { revalidate: 3600 },
        })
        if (res.ok) {
          const json = await res.json()
          if (json.features?.length) geojson = json
        }
      } catch { /* fall through to fallback below */ }

      if (!geojson) throw new Error('All GDELT query strategies returned no data')

      const aggregates = aggregateByRegion(geojson)
      const updatedAt  = new Date().toISOString()
      incidents = buildIncidentRisks(aggregates, updatedAt)

      if (incidents.length === 0) throw new Error('No GDELT incidents in supply-chain regions')
      source = 'GDELT Project (live)'

    } catch (gdeltErr) {
      console.info('[/api/incidents] GDELT unavailable, using baseline:', gdeltErr.message)
      incidents = FALLBACK_INCIDENTS
      source    = 'Baseline (GDELT unavailable)'
    }

    const isFallback = incidents === FALLBACK_INCIDENTS
    const payload = {
      incidents,
      total:   incidents.length,
      updated: new Date().toISOString(),
      source,
      ...(isFallback && {
        fallback_vintage: '2026-Q3',
        fallback_note: 'Live GDELT data unavailable. Showing curated reference incidents — verify current status with carrier advisories and government travel alerts.',
      }),
    }

    // Only cache when data is live from GDELT -- don't cache the fallback
    if (source === 'GDELT Project (live)') {
      _cache     = payload
      _cacheTime = Date.now()
    }

    return NextResponse.json(payload)

  } catch (err) {
    console.error('[/api/incidents]', err.message)
    return NextResponse.json({
      incidents: FALLBACK_INCIDENTS,
      total:     FALLBACK_INCIDENTS.length,
      updated:   new Date().toISOString(),
      source:    'Baseline (error fallback)',
      error:     err.message,
      fallback_vintage: '2026-Q3',
      fallback_note: 'Live GDELT data unavailable. Showing curated reference incidents — verify current status with carrier advisories and government travel alerts.',
    })
  }
}
