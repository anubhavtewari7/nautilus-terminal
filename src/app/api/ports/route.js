import { NextResponse } from 'next/server'
import { mergePortWatchData } from '@/lib/port-data'

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
// Returns vessel call counts as a congestion proxy.
// We fetch outFields=* so the query never 400s on missing field names --
// then we do flexible key matching against whatever the service returns.
// --------------------------------------------------------------------------
const PORTWATCH_BASE =
  'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/PortWatch_Ports/FeatureServer/0/query'
const PORTWATCH_URL =
  PORTWATCH_BASE + '?where=1%3D1&outFields=*&f=json&resultRecordCount=200'

const CACHE_MS  = 30 * 60 * 1000
let _cache     = null
let _cacheTime = 0

// Flexible field extractor -- handles whatever the ArcGIS service actually exposes
function extractPortAttr(attrs) {
  const k = Object.keys(attrs)
  const find = (...names) => {
    for (const n of names) {
      const m = k.find(key => key.toLowerCase() === n.toLowerCase())
      if (m !== undefined && attrs[m] !== null) return attrs[m]
    }
    return null
  }
  return {
    PORT_NAME:       find('port_name', 'portname', 'name', 'portid', 'port', 'label') || null,
    CONGESTION_INDEX: find('congestion_index', 'congestion', 'cong_index', 'congest_idx') || null,
    WAIT_DAYS:       find('wait_days', 'wait', 'waittime', 'delay_days', 'avg_wait') || null,
    TREND:           find('trend', 'congestion_trend', 'trend_dir') || null,
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
  return json.features.map(f => extractPortAttr(f.attributes))
}

export async function GET() {
  try {
    if (_cache && Date.now() - _cacheTime < CACHE_MS) {
      return NextResponse.json(_cache)
    }

    let result = mergePortWatchData(BASELINE_PORTS)
    try {
      result = mergePortWatchData(BASELINE_PORTS, await fetchPortWatch())
    } catch (error) {
      console.info('[/api/ports] Live values unavailable; retaining static baseline:', error.message)
    }
    const payload = {
      ...result,
      updated: new Date().toISOString(),
      dataSource: 'Reference baseline — industry estimates based on 2024 throughput data and current market intelligence. Live enrichment via IMF PortWatch when available.',
      disclaimer: 'Congestion % and wait times are editorial estimates. Verify with your freight forwarder or carrier before operational decisions.',
      isLiveEnriched: false, // will be updated if PortWatch enrichment succeeds
    }

    _cache     = payload
    _cacheTime = Date.now()

    return NextResponse.json(payload)

  } catch (err) {
    console.error('[/api/ports]', err.message)
    // Hard fallback -- return static baseline unmodified
    return NextResponse.json({
      ports:    mergePortWatchData(BASELINE_PORTS).ports,
      source:   'Reference Baseline',
      liveCount: 0,
      updated:  new Date().toISOString(),
      dataSource: 'Reference baseline — industry estimates based on 2024 throughput data.',
      disclaimer: 'Congestion % and wait times are editorial estimates. Verify with your freight forwarder or carrier before operational decisions.',
      error:    err.message
    })
  }
}
