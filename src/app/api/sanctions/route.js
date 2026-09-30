import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// OFAC SDN list -- multiple source URLs tried in order.
// treasury.gov and ofac.treasury.gov block many cloud provider IPs.
// sanctionslistservice.ofac.treas.gov is a separate CDN endpoint that
// typically works from serverless runtimes.
// CSV format is ~2MB vs ~10MB for the full text -- much faster to fetch.
const OFAC_SOURCES = [
  // 1. OFAC Sanctions List Service CDN (separate hostname, less blocked)
  'https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.CSV',
  // 2. Direct OFAC CSV (smaller, more parseable than .txt)
  'https://ofac.treasury.gov/downloads/sdn.csv',
  // 3. Legacy OFAC text list
  'https://ofac.treasury.gov/downloads/sdn.txt',
  // 4. Old Treasury path
  'https://www.treasury.gov/ofac/downloads/sdnlist.txt',
]

const CACHE_MS = 24 * 60 * 60 * 1000 // 24 hours

// Module-level in-memory cache (resets on cold start)
let _cache = null // { names: string[], fetchedAt: string }

/**
 * Parse OFAC SDN CSV format.
 * CSV columns: Ent_num, SDN_Name, SDN_Type, Program, Title, Call_Sign,
 *              Vess_type, Tonnage, GRT, Vess_flag, Vess_owner, Remarks
 * Name is column 1 (0-indexed), may be quoted.
 */
function parseSdnCsv(text) {
  const names = []
  const lines = text.split('\n')
  for (const line of lines) {
    if (!line.trim() || line.startsWith('Ent_num') || line.startsWith('"Ent_num')) continue
    // Handle quoted CSV: first field is ent_num, second is SDN_Name
    const cols = line.split(',')
    if (cols.length < 2) continue
    // Name may be quoted
    let name = cols[1].trim().replace(/^"|"$/g, '').trim()
    if (name.length > 1 && !/^\d+$/.test(name)) names.push(name)
  }
  return names
}

/**
 * Parse the OFAC SDN plain-text list.
 * Entries look like:
 *   " 1. ABADIA MEDINA, Alirio de Jesus; DOB 26 Sep 1956; ..."
 */
function parseSdnText(text) {
  const names = []
  const lines = text.split('\n')
  for (const line of lines) {
    const match = line.match(/^\s*\d+\.\s+(.+)/)
    if (!match) continue
    const rest = match[1]
    const semicolonIdx = rest.indexOf(';')
    const rawName = semicolonIdx !== -1 ? rest.slice(0, semicolonIdx) : rest
    const name = rawName.trim()
    if (name.length > 1) names.push(name)
  }
  return names
}

function parseResponse(url, text) {
  if (!text || text.length < 100) return []
  if (url.endsWith('.csv') || url.includes('.CSV')) {
    const names = parseSdnCsv(text)
    // If CSV parse yielded nothing (e.g. we got the text format), try text parser
    return names.length > 50 ? names : parseSdnText(text)
  }
  return parseSdnText(text)
}

/**
 * Score a single SDN name against the search query.
 * Returns a score 0–100; anything below THRESHOLD is excluded.
 */
const SCORE_THRESHOLD = 50

function scoreName(sdnName, query) {
  const name = sdnName.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 0

  if (name === q) return 100
  if (name.includes(q)) return 80

  const queryWords = q.split(/\s+/).filter(Boolean)
  const nameWords = name.split(/[\s,;./-]+/).filter(Boolean)

  const allQueryWordsInName = queryWords.every(qw => nameWords.some(nw => nw === qw))
  if (allQueryWordsInName && queryWords.length > 0) return 80

  const anyNameWordInQuery = nameWords.some(nw => nw.length > 2 && q.includes(nw))
  if (anyNameWordInQuery) return 60

  const anyQueryWordSubstringOfName = queryWords.some(
    qw => qw.length > 2 && nameWords.some(nw => nw.startsWith(qw))
  )
  if (anyQueryWordSubstringOfName) return 55

  return 0
}

async function fetchSdnList() {
  for (const url of OFAC_SOURCES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000) // 15s per URL
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'NAUTILUS-Terminal/1.0 (sanctions-screening; contact: support@nautilus-terminal.com)',
          'Accept': 'text/csv, text/plain, */*',
        },
        next: { revalidate: 86400 }, // cache at edge for 24h
      })
      clearTimeout(timeout)
      if (!res.ok) {
        console.info(`[/api/sanctions] ${url} → HTTP ${res.status}`)
        continue
      }
      const text = await res.text()
      const names = parseResponse(url, text)
      if (names.length > 100) {
        console.info(`[/api/sanctions] Loaded ${names.length} SDN entries from ${url}`)
        return names
      }
      console.info(`[/api/sanctions] ${url} returned only ${names.length} names — skipping`)
    } catch (err) {
      console.info(`[/api/sanctions] ${url} failed: ${err.message}`)
    }
  }
  return null // all URLs failed
}

async function loadSdnList() {
  if (_cache && Date.now() - new Date(_cache.fetchedAt).getTime() < CACHE_MS) {
    return { names: _cache.names, cached: true, fetchedAt: _cache.fetchedAt }
  }

  const names = await fetchSdnList()

  if (!names || names.length < 100) {
    return { names: null, cached: false, fetchedAt: null }
  }

  const fetchedAt = new Date().toISOString()
  _cache = { names, fetchedAt }
  return { names, cached: false, fetchedAt }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim()

  if (!query) {
    return NextResponse.json(
      { matches: [], totalLoaded: 0, source: 'OFAC SDN', error: 'Missing ?q= parameter' },
      { status: 400 }
    )
  }

  try {
    const { names, cached, fetchedAt } = await loadSdnList()

    if (!names || names.length < 100) {
      return NextResponse.json({
        matches: [],
        error: 'OFAC SDN list could not be loaded — all source URLs failed or returned insufficient data. Local risk-signal check still active.',
        fallbackMode: true,
        totalLoaded: 0,
      })
    }

    const scored = names
      .map(name => ({ name, score: scoreName(name, query) }))
      .filter(({ score }) => score >= SCORE_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    return NextResponse.json({
      matches: scored,
      totalLoaded: names.length,
      source: 'OFAC SDN',
      lastFetched: fetchedAt,
      cached,
    })
  } catch (err) {
    console.error('[/api/sanctions]', err.message)
    return NextResponse.json({
      matches: [],
      error: 'OFAC list unavailable',
      fallbackMode: true,
    })
  }
}
