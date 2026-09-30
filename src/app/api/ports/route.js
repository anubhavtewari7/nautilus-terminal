import { NextResponse } from 'next/server'

// --------------------------------------------------------------------------
// Static baseline -- same 26 ports as PortStatus.js (source of truth here)
// The live layer augments these with fresh congestion estimates when available
// --------------------------------------------------------------------------
const BASELINE_PORTS = [
  { name: 'Port of Shanghai',          country: 'China 🇨🇳',        rank:  1, congestion: 52, waitDays: 3.5, trend: 'up',     volume: '47.3M TEU', alert: null },
  { name: 'Port of Singapore',         country: 'Singapore 🇸🇬',    rank:  2, congestion: 28, waitDays: 1.0, trend: 'stable', volume: '37.3M TEU', alert: null },
  { name: 'Port of Ningbo-Zhoushan',   country: 'China 🇨🇳',        rank:  3, congestion: 61, waitDays: 4.5, trend: 'up',     volume: '33.4M TEU', alert: '⚠️ Elevated congestion -- add 2-day buffer' },
  { name: 'Port of Shenzhen',          country: 'China 🇨🇳',        rank:  4, congestion: 45, waitDays: 3.0, trend: 'stable', volume: '30.0M TEU', alert: null },
  { name: 'Port of Guangzhou',         country: 'China 🇨🇳',        rank:  5, congestion: 38, waitDays: 2.5, trend: 'down',   volume: '23.0M TEU', alert: null },
  { name: 'Port of Qingdao',           country: 'China 🇨🇳',        rank:  6, congestion: 35, waitDays: 2.0, trend: 'stable', volume: '22.0M TEU', alert: null },
  { name: 'Port of Busan',             country: 'South Korea 🇰🇷',  rank:  7, congestion: 22, waitDays: 1.5, trend: 'stable', volume: '21.7M TEU', alert: null },
  { name: 'Port of Tianjin',           country: 'China 🇨🇳',        rank:  8, congestion: 40, waitDays: 2.5, trend: 'up',     volume: '21.6M TEU', alert: null },
  { name: 'Port of Hong Kong',         country: 'Hong Kong 🇭🇰',    rank:  9, congestion: 30, waitDays: 1.5, trend: 'down',   volume: '18.0M TEU', alert: null },
  { name: 'Port of Rotterdam',         country: 'Netherlands 🇳🇱',  rank: 10, congestion: 25, waitDays: 1.0, trend: 'stable', volume: '14.5M TEU', alert: null },
  { name: 'Port of Antwerp-Bruges',    country: 'Belgium 🇧🇪',      rank: 11, congestion: 32, waitDays: 2.0, trend: 'up',     volume: '13.5M TEU', alert: '⚠️ Union talks ongoing -- monitor closely' },
  { name: 'Port of Los Angeles',       country: 'USA 🇺🇸',          rank: 12, congestion: 42, waitDays: 3.0, trend: 'stable', volume: '10.3M TEU', alert: null },
  { name: 'Port of Long Beach',        country: 'USA 🇺🇸',          rank: 13, congestion: 38, waitDays: 2.5, trend: 'stable', volume: '9.6M TEU',  alert: null },
  { name: 'Port of Hamburg',           country: 'Germany 🇩🇪',      rank: 14, congestion: 20, waitDays: 1.0, trend: 'stable', volume: '8.3M TEU',  alert: null },
  { name: 'Port of Dubai (Jebel Ali)', country: 'UAE 🇦🇪',          rank: 15, congestion: 18, waitDays: 1.0, trend: 'stable', volume: '14.4M TEU', alert: null },
  { name: 'Port of Klang',             country: 'Malaysia 🇲🇾',     rank: 16, congestion: 30, waitDays: 2.0, trend: 'stable', volume: '13.2M TEU', alert: null },
  { name: 'Port of Colombo',           country: 'Sri Lanka 🇱🇰',    rank: 17, congestion: 35, waitDays: 2.5, trend: 'up',     volume: '7.2M TEU',  alert: null },
  { name: 'Port of Tanjung Pelepas',   country: 'Malaysia 🇲🇾',     rank: 18, congestion: 22, waitDays: 1.5, trend: 'stable', volume: '11.0M TEU', alert: null },
  { name: 'Port of Santos',            country: 'Brazil 🇧🇷',       rank: 19, congestion: 55, waitDays: 4.0, trend: 'up',     volume: '4.8M TEU',  alert: '⚠️ High congestion -- South America trade impact' },
  { name: 'Port of New York / NJ',     country: 'USA 🇺🇸',          rank: 20, congestion: 30, waitDays: 2.0, trend: 'stable', volume: '9.5M TEU',  alert: null },
  { name: 'Port of Savannah',          country: 'USA 🇺🇸',          rank: 21, congestion: 25, waitDays: 1.0, trend: 'stable', volume: '5.9M TEU',  alert: null },
  { name: 'Port of Charleston',        country: 'USA 🇺🇸',          rank: 22, congestion: 28, waitDays: 1.5, trend: 'stable', volume: '3.0M TEU',  alert: null },
  { name: 'Port of Seattle / Tacoma',  country: 'USA 🇺🇸',          rank: 23, congestion: 35, waitDays: 2.5, trend: 'up',     volume: '3.8M TEU',  alert: null },
  { name: 'Port of Manzanillo',        country: 'Mexico 🇲🇽',       rank: 24, congestion: 40, waitDays: 3.0, trend: 'stable', volume: '3.6M TEU',  alert: null },
  { name: 'Port of Lázaro Cárdenas',  country: 'Mexico 🇲🇽',       rank: 25, congestion: 52, waitDays: 4.0, trend: 'up',     volume: '1.8M TEU',  alert: '⚠️ Rail congestion on KCSM corridor -- add buffer' },
  { name: 'Port of Ensenada',          country: 'Mexico 🇲🇽',       rank: 26, congestion: 22, waitDays: 1.5, trend: 'stable', volume: '0.4M TEU',  alert: null },
]

// --------------------------------------------------------------------------
// IMF PortWatch ArcGIS REST endpoint (free, no API key)
// Daily_Ports_Data — actual available fields: portid, portname, iso3, date,
// portcalls, portcalls_cargo, portcalls_tanker, import, export
// --------------------------------------------------------------------------
const PORTWATCH_URL =
  'https://services9.arcgis.com/weJ1QsnbMYJlCHdG/ArcGIS/rest/services/Daily_Ports_Data/FeatureServer/0/query?where=1%3D1&outFields=portid,portname,iso3,portcalls,portcalls_cargo,import,export&orderByFields=date+DESC&resultRecordCount=500&f=json'

const CACHE_MS  = 30 * 60 * 1000
let _cache     = null
let _cacheTime = 0

// Derive congestion proxy from real PortWatch vessel-call fields
function extractPortAttr(attr) {
  if (!attr) return null
  const portcalls = attr.portcalls ?? attr.PORTCALLS
  const portcalls_cargo = attr.portcalls_cargo ?? attr.PORTCALLS_CARGO
  const importVol = attr.import ?? attr.IMPORT
  const exportVol = attr.export ?? attr.EXPORT
  if (portcalls == null) return null
  // Derive a congestion proxy: high portcalls relative to cargo split indicates congestion
  // Use portcalls as activity indicator, derive wait estimate from cargo ratio
  const cargoRatio = portcalls > 0 ? (portcalls_cargo ?? 0) / portcalls : 0
  // Normalize portcalls to a 0-100 "activity" score (portcalls > 80/day = very busy)
  const activityScore = Math.min(100, Math.round((portcalls / 80) * 100))
  // Congestion proxy: high activity + high cargo ratio = more congestion
  const congestionProxy = Math.min(100, Math.round(activityScore * (0.5 + cargoRatio * 0.5)))
  // Wait time estimate: rough heuristic (high congestion ports = higher wait)
  const waitEstimate = congestionProxy > 70 ? 3 + Math.round((congestionProxy - 70) / 10)
                     : congestionProxy > 40 ? 1 + Math.round((congestionProxy - 40) / 30)
                     : 0.5
  return {
    congestion: congestionProxy,
    waitDays: parseFloat(waitEstimate.toFixed(1)),
    portcalls: portcalls,
    importVol: importVol,
    exportVol: exportVol,
    trend: congestionProxy > 60 ? 'up' : 'stable',
    dataSource: 'IMF PortWatch (live vessel call data)',
  }
}

function normalizePortName(name) {
  return name
    .toLowerCase()
    .replace(/^(port of |port |harbour |harbor |terminal |the )/g, '')
    .replace(/\s+(port|harbour|harbor|terminal|international|container)$/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function mergePortWatchData(portWatchFeatures, baselinePorts) {
  // Build lookup: normalized name → attributes
  const lookup = {}
  for (const f of portWatchFeatures) {
    const attr = f.attributes || f
    const raw = attr.portname || attr.PORTNAME || ''
    const normalized = normalizePortName(raw)
    if (normalized && !lookup[normalized]) lookup[normalized] = attr
  }

  let liveCount = 0
  const ports = baselinePorts.map(bp => {
    const bpNorm = normalizePortName(bp.name)
    // 1. Exact normalized match
    let match = lookup[bpNorm]
    // 2. One is a substring of the other (normalized)
    if (!match) {
      const entry = Object.entries(lookup).find(([k]) =>
        k.includes(bpNorm) || bpNorm.includes(k)
      )
      if (entry) match = entry[1]
    }
    // 3. Any word from bpNorm matches any word in a portwatch key
    if (!match) {
      const bpWords = bpNorm.split(' ').filter(w => w.length > 3)
      const entry = Object.entries(lookup).find(([k]) =>
        bpWords.some(w => k.split(' ').includes(w))
      )
      if (entry) match = entry[1]
    }

    if (match) {
      const enriched = extractPortAttr(match)
      if (enriched) {
        liveCount += 1
        return {
          ...bp,
          congestion: enriched.congestion,
          waitDays: enriched.waitDays,
          trend: enriched.trend,
          liveEnriched: true,
          portcalls: enriched.portcalls,
          liveDataSource: 'IMF PortWatch — live vessel call data',
        }
      }
    }
    return { ...bp, liveEnriched: false }
  })
  return {
    ports,
    liveCount,
    source: liveCount > 0 ? 'IMF PortWatch + Reference Baseline' : 'Reference Baseline',
  }
}

// --------------------------------------------------------------------------
async function fetchPortWatch() {
  const res = await fetch(PORTWATCH_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; NAUTILUS-Terminal/1.0)',
      'Accept': 'application/json, */*',
    },
    signal: AbortSignal.timeout(10000),
    next: { revalidate: 1800 },
  })
  if (!res.ok) throw new Error(`PortWatch HTTP ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(`PortWatch error: ${json.error.message || JSON.stringify(json.error)}`)
  if (!json.features?.length) throw new Error('No PortWatch features')
  return json.features
}

export async function GET() {
  try {
    if (_cache && Date.now() - _cacheTime < CACHE_MS) {
      return NextResponse.json(_cache)
    }

    let result = mergePortWatchData([], BASELINE_PORTS)
    try {
      const features = await fetchPortWatch()
      result = mergePortWatchData(features, BASELINE_PORTS)
    } catch (error) {
      console.info('[/api/ports] Live values unavailable; retaining static baseline:', error.message)
    }
    const payload = {
      ...result,
      updated: new Date().toISOString(),
      dataSource: 'Reference baseline — industry estimates based on 2024 throughput data and current market intelligence. Live enrichment via IMF PortWatch when available.',
      disclaimer: 'Congestion % and wait times are editorial estimates. Verify with your freight forwarder or carrier before operational decisions.',
      isLiveEnriched: result.liveCount > 0,
    }

    _cache     = payload
    _cacheTime = Date.now()

    return NextResponse.json(payload)

  } catch (err) {
    console.error('[/api/ports]', err.message)
    // Hard fallback -- return static baseline unmodified
    return NextResponse.json({
      ports:    mergePortWatchData([], BASELINE_PORTS).ports,
      source:   'Reference Baseline',
      liveCount: 0,
      updated:  new Date().toISOString(),
      dataSource: 'Reference baseline — industry estimates based on 2024 throughput data.',
      disclaimer: 'Congestion % and wait times are editorial estimates. Verify with your freight forwarder or carrier before operational decisions.',
      error:    err.message
    })
  }
}
