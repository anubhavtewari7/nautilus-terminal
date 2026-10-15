import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// ============================================================
// AIS VESSEL TRACKING — NAUTILUS Terminal
// Primary: aisstream.io WebSocket (free tier, 100 req/s)
// Secondary: marinetraffic.com public API (limited)
// Fallback: Static realistic dataset based on 2024–2025 patterns
// ============================================================

// Major maritime chokepoints with bounding boxes
const CHOKEPOINTS = {
  suez: {
    name: 'Suez Canal',
    region: 'Egypt / Red Sea',
    lat: 30.0,
    lon: 32.55,
    bbox: { minLat: 29.5, maxLat: 31.3, minLon: 32.0, maxLon: 33.5 },
    dailyTransits: 50,
    significance: 'Europe–Asia shortcut; 12% of global trade',
    riskFactors: ['Houthi attacks in Red Sea', 'Canal traffic restrictions'],
  },
  hormuz: {
    name: 'Strait of Hormuz',
    region: 'Persian Gulf',
    lat: 26.57,
    lon: 56.26,
    bbox: { minLat: 25.5, maxLat: 27.5, minLon: 55.0, maxLon: 57.5 },
    dailyTransits: 21,
    significance: '20% of global oil trade, 30% of LNG',
    riskFactors: ['Iran regional tensions', 'IRGC vessel seizures'],
  },
  malacca: {
    name: 'Strait of Malacca',
    region: 'Southeast Asia',
    lat: 2.7,
    lon: 101.5,
    bbox: { minLat: 1.0, maxLat: 5.5, minLon: 99.5, maxLon: 104.0 },
    dailyTransits: 85,
    significance: '25% of global trade, 40% of global LNG',
    riskFactors: ['Piracy incidents', 'Shallow draft limitations'],
  },
  bosphorus: {
    name: 'Turkish Straits (Bosphorus)',
    region: 'Turkey',
    lat: 41.12,
    lon: 29.07,
    bbox: { minLat: 40.8, maxLat: 41.4, minLon: 28.7, maxLon: 29.5 },
    dailyTransits: 40,
    significance: 'Black Sea–Mediterranean; Russia grain/oil exports',
    riskFactors: ['Russia sanctions compliance', 'Price cap enforcement', 'Vessel congestion'],
  },
  english_channel: {
    name: 'English Channel (Dover Strait)',
    region: 'UK / France',
    lat: 51.0,
    lon: 1.5,
    bbox: { minLat: 50.5, maxLat: 51.5, minLon: 0.5, maxLon: 2.5 },
    dailyTransits: 500,
    significance: 'Busiest shipping lane globally',
    riskFactors: ['Post-Brexit customs delays', 'High traffic density'],
  },
  panama: {
    name: 'Panama Canal',
    region: 'Panama',
    lat: 9.1,
    lon: -79.7,
    bbox: { minLat: 8.8, maxLat: 9.4, minLon: -80.0, maxLon: -79.4 },
    dailyTransits: 35,
    significance: 'Americas–Asia; 5% of global trade',
    riskFactors: ['Drought reducing water levels', 'Vessel size restrictions (neo-Panamax limit)'],
  },
  cape_good_hope: {
    name: 'Cape of Good Hope',
    region: 'South Africa',
    lat: -34.36,
    lon: 18.47,
    bbox: { minLat: -36.0, maxLat: -33.0, minLon: 17.0, maxLon: 20.5 },
    dailyTransits: 45,
    significance: 'Alternative to Suez; surged due to Houthi disruption',
    riskFactors: ['Weather / Cape storms', 'Longer transit = higher cost'],
  },
  taiwan_strait: {
    name: 'Taiwan Strait',
    region: 'Taiwan / China',
    lat: 24.5,
    lon: 119.8,
    bbox: { minLat: 22.0, maxLat: 27.0, minLon: 118.0, maxLon: 121.5 },
    dailyTransits: 280,
    significance: '88% of world\'s largest container ships transit here',
    riskFactors: ['PLA military exercises', 'Cross-strait geopolitical tension'],
  },
}

// Ship type categories
const SHIP_TYPES = [
  'CRUDE TANKER', 'PRODUCT TANKER', 'LNG CARRIER', 'LPG CARRIER',
  'BULK CARRIER', 'CONTAINER SHIP', 'GENERAL CARGO', 'RO-RO VESSEL',
  'CHEMICAL TANKER', 'VEHICLE CARRIER', 'VLCC', 'ULCC', 'AFRAMAX',
]

const FLAGS = [
  'Panama', 'Liberia', 'Marshall Islands', 'Bahamas', 'Malta', 'Singapore',
  'Cyprus', 'Greece', 'China', 'Hong Kong', 'Norway', 'United Kingdom',
  'Japan', 'South Korea', 'United States',
]

// Deterministic pseudo-random (seed-based) — same output every call within an hour
function seededRandom(seed) {
  let x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function generateMMSI(seed) {
  const base = 200000000 + Math.floor(seededRandom(seed * 7) * 599999999)
  return base.toString()
}

function generateVesselName(seed) {
  const prefixes = ['MSC', 'EVER', 'COSCO', 'CMA', 'ONE', 'HMM', 'YANG MING', 'HAPAG',
    'NORDIC', 'PACIFIC', 'ATLANTIC', 'GLOBAL', 'STAR', 'SEA', 'OCEAN', 'CAPE', 'GULF', 'BAY']
  const suffixes = ['SPIRIT', 'GLORY', 'VENTURE', 'PIONEER', 'EAGLE', 'FALCON', 'HORIZON',
    'VOYAGER', 'EXPLORER', 'CHAMPION', 'GUARDIAN', 'SENTINEL', 'TRADER', 'CARRIER']
  const p = prefixes[Math.floor(seededRandom(seed * 3) * prefixes.length)]
  const s = suffixes[Math.floor(seededRandom(seed * 5) * suffixes.length)]
  return `${p} ${s}`
}

function generateVesselsForChokepoint(chopepointKey, chokepoint, count, timeHash) {
  const vessels = []
  for (let i = 0; i < count; i++) {
    const seed = timeHash + i * 100 + chopepointKey.length
    const bb = chokepoint.bbox
    const lat = bb.minLat + seededRandom(seed) * (bb.maxLat - bb.minLat)
    const lon = bb.minLon + seededRandom(seed + 1) * (bb.maxLon - bb.minLon)
    const speed = 4 + seededRandom(seed + 2) * 14 // 4–18 knots
    const course = Math.floor(seededRandom(seed + 3) * 360)
    const length = 100 + Math.floor(seededRandom(seed + 4) * 280) // 100–380m
    const shipType = SHIP_TYPES[Math.floor(seededRandom(seed + 5) * SHIP_TYPES.length)]
    const flag = FLAGS[Math.floor(seededRandom(seed + 6) * FLAGS.length)]

    vessels.push({
      mmsi: generateMMSI(seed),
      name: generateVesselName(seed),
      type: shipType,
      flag,
      lat: parseFloat(lat.toFixed(4)),
      lon: parseFloat(lon.toFixed(4)),
      speed: parseFloat(speed.toFixed(1)),
      course,
      length,
      chokepoint: chopepointKey,
      status: speed < 1 ? 'AT ANCHOR' : speed < 3 ? 'MOORED' : 'UNDERWAY',
      lastUpdated: new Date().toISOString(),
      dataSource: 'fallback',
    })
  }
  return vessels
}

// ============================================================
// LIVE AIS: aisstream.io REST (free, no key for basic positions)
// ============================================================
async function fetchAisStreamPositions(bbox) {
  // aisstream.io primary endpoint
  const key = process.env.AISSTREAM_API_KEY
  if (!key) return null // Requires API key for HTTP; WebSocket is free but can't use in serverless

  try {
    // aisstream.io doesn't have a simple REST bbox endpoint without auth
    // With API key: https://api.aisstream.io/v0/vessel-positions?bbox=...
    const url = `https://api.aisstream.io/v0/vessel-positions?bbox=${bbox.minLat},${bbox.minLon},${bbox.maxLat},${bbox.maxLon}&limit=30`
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${key}`, 'Accept': 'application/json' },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// ============================================================
// VESSEL DB: datalastic.com free tier (1000 req/month)
// ============================================================
async function fetchDatalastic(bbox) {
  const key = process.env.DATALASTIC_API_KEY
  if (!key) return null

  try {
    const url = `https://api.datalastic.com/api/v0/vessel?api-key=${key}&area_min_lat=${bbox.minLat}&area_min_lon=${bbox.minLon}&area_max_lat=${bbox.maxLat}&area_max_lon=${bbox.maxLon}&limit=25`
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.map(v => ({
      mmsi: v.mmsi?.toString(),
      name: v.name || 'UNKNOWN',
      type: v.type_name || 'VESSEL',
      flag: v.flag || '',
      lat: v.lat,
      lon: v.lon,
      speed: v.speed,
      course: v.course,
      length: v.length,
      status: v.status,
      lastUpdated: v.last_position_UTC,
      dataSource: 'datalastic',
    })) || null
  } catch {
    return null
  }
}

// ============================================================
// CACHE
// ============================================================
const CACHE_MS = 5 * 60 * 1000 // 5 min — AIS data is near-realtime
let _vesselCache = null

async function loadVesselData() {
  if (_vesselCache && Date.now() - new Date(_vesselCache.fetchedAt).getTime() < CACHE_MS) {
    return _vesselCache
  }

  // Time-based seed so data shifts slightly each hour (realistic pattern simulation)
  const timeHash = Math.floor(Date.now() / (60 * 60 * 1000)) // changes hourly

  const allVessels = []
  const chopepointStatus = {}
  let dataSource = 'fallback'

  for (const [key, chokepoint] of Object.entries(CHOKEPOINTS)) {
    // Try live API first
    let liveVessels = null

    if (process.env.AISSTREAM_API_KEY) {
      const raw = await fetchAisStreamPositions(chokepoint.bbox)
      if (raw && Array.isArray(raw)) {
        liveVessels = raw.map(v => ({ ...v, chokepoint: key, dataSource: 'aisstream' }))
        dataSource = 'aisstream'
      }
    }

    if (!liveVessels && process.env.DATALASTIC_API_KEY) {
      const raw = await fetchDatalastic(chokepoint.bbox)
      if (raw && raw.length > 0) {
        liveVessels = raw.map(v => ({ ...v, chokepoint: key }))
        dataSource = 'datalastic'
      }
    }

    // Fallback to realistic generated data
    const vesselCount = liveVessels
      ? liveVessels.length
      : 5 + Math.floor(seededRandom(timeHash + key.length * 13) * 15)

    const vessels = liveVessels || generateVesselsForChokepoint(key, chokepoint, vesselCount, timeHash + key.length * 17)
    allVessels.push(...vessels)

    // Congestion: simple heuristic from vessel density relative to normal
    const congestionRatio = vesselCount / (chokepoint.dailyTransits / 24) // vs expected vessels per hour visible
    const congestionScore = Math.min(100, Math.round(congestionRatio * 20))

    chopepointStatus[key] = {
      ...chokepoint,
      vesselCount: vessels.length,
      congestionScore,
      congestionLabel: congestionScore > 70 ? 'HIGH' : congestionScore > 40 ? 'MODERATE' : 'NORMAL',
    }
  }

  _vesselCache = {
    vessels: allVessels,
    chokepoints: chopepointStatus,
    fetchedAt: new Date().toISOString(),
    dataSource,
    live: dataSource !== 'fallback',
  }
  return _vesselCache
}

// ============================================================
// MAIN HANDLER
// ============================================================
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const chokepointFilter = searchParams.get('chokepoint')
  const typeFilter = searchParams.get('type')
  const summaryOnly = searchParams.get('summary') === 'true'

  try {
    const data = await loadVesselData()

    let vessels = data.vessels
    if (chokepointFilter) vessels = vessels.filter(v => v.chokepoint === chokepointFilter)
    if (typeFilter) vessels = vessels.filter(v => v.type?.toLowerCase().includes(typeFilter.toLowerCase()))

    const response = {
      fetchedAt: data.fetchedAt,
      dataSource: data.dataSource,
      isLive: data.live,
      totalVessels: data.vessels.length,
      chokepoints: data.chokepoints,
      note: data.live
        ? `Live AIS data from ${data.dataSource}`
        : 'Realistic vessel traffic simulation based on 2024-2025 maritime patterns. Connect AISSTREAM_API_KEY or DATALASTIC_API_KEY env vars for live data.',
    }

    if (!summaryOnly) {
      response.vessels = vessels.slice(0, 100) // cap to avoid huge payloads
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('[/api/vessels]', err.message)
    return NextResponse.json({ error: 'Vessel tracking unavailable', detail: err.message }, { status: 500 })
  }
}
