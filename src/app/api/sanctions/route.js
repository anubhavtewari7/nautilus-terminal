import { NextResponse } from 'next/server'
import { SDN_NAMES } from '@/lib/sdn-snapshot'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// OFAC SDN live URLs — tried in order before falling back to embedded snapshot.
// Note: treasury.gov and ofac.treasury.gov frequently block cloud provider IPs.
// The embedded snapshot (sdn-snapshot.js) is always available as a reliable fallback.
const OFAC_SOURCES = [
  'https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.CSV',
  'https://ofac.treasury.gov/downloads/sdn.csv',
  'https://ofac.treasury.gov/downloads/sdn.txt',
  'https://www.treasury.gov/ofac/downloads/sdnlist.txt',
]

const CACHE_MS = 24 * 60 * 60 * 1000 // 24 hours
let _cache = null // { names: string[], fetchedAt: string, isLive: boolean }

function parseSdnCsv(text) {
  const names = []
  const lines = text.split('\n')
  for (const line of lines) {
    if (!line.trim() || line.startsWith('Ent_num') || line.startsWith('"Ent_num')) continue
    const cols = line.split(',')
    if (cols.length < 2) continue
    let name = cols[1].trim().replace(/^"|"$/g, '').trim()
    if (name.length > 1 && !/^\d+$/.test(name)) names.push(name.toUpperCase())
  }
  return names
}

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
    if (name.length > 1) names.push(name.toUpperCase())
  }
  return names
}

function parseResponse(url, text) {
  if (!text || text.length < 100) return []
  if (url.endsWith('.csv') || url.includes('.CSV')) {
    const names = parseSdnCsv(text)
    return names.length > 50 ? names : parseSdnText(text)
  }
  return parseSdnText(text)
}

async function tryFetchLiveSdn() {
  for (const url of OFAC_SOURCES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 12000)
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'NAUTILUS-Terminal/1.0 (sanctions-screening)',
          'Accept': 'text/csv, text/plain, */*',
        },
      })
      clearTimeout(timeout)
      if (!res.ok) { console.info(`[/api/sanctions] ${url} → HTTP ${res.status}`); continue }
      const text = await res.text()
      const names = parseResponse(url, text)
      if (names.length > 100) {
        console.info(`[/api/sanctions] Live SDN loaded: ${names.length} entries from ${url}`)
        return { names, isLive: true }
      }
    } catch (err) {
      console.info(`[/api/sanctions] ${url} failed: ${err.message}`)
    }
  }
  return null
}

async function loadSdnList() {
  // Return from cache if still fresh
  if (_cache && Date.now() - new Date(_cache.fetchedAt).getTime() < CACHE_MS) {
    return _cache
  }

  // Try live OFAC fetch first (best case — ~13,000 entries)
  const live = await tryFetchLiveSdn()
  if (live) {
    _cache = { names: live.names, fetchedAt: new Date().toISOString(), isLive: true }
    return _cache
  }

  // Fall back to embedded snapshot — always works, ~1,800 key entities
  console.info(`[/api/sanctions] All live sources failed — using embedded snapshot (${SDN_NAMES.length} entities)`)
  _cache = { names: SDN_NAMES, fetchedAt: new Date().toISOString(), isLive: false }
  return _cache
}

/**
 * Score a single SDN name against the search query.
 * Returns 0–100; anything below THRESHOLD is excluded.
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

  if (queryWords.every(qw => nameWords.some(nw => nw === qw)) && queryWords.length > 0) return 80
  if (nameWords.some(nw => nw.length > 2 && q.includes(nw))) return 60
  if (queryWords.some(qw => qw.length > 2 && nameWords.some(nw => nw.startsWith(qw)))) return 55

  return 0
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
    const { names, isLive, fetchedAt } = await loadSdnList()

    const scored = names
      .map(name => ({ name, score: scoreName(name, query) }))
      .filter(({ score }) => score >= SCORE_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    return NextResponse.json({
      matches: scored,
      totalLoaded: names.length,
      source: isLive ? 'OFAC SDN (live)' : 'OFAC SDN (embedded snapshot — key entities)',
      isLive,
      lastFetched: fetchedAt,
    })
  } catch (err) {
    console.error('[/api/sanctions]', err.message)
    // Even in hard error — still search the snapshot
    try {
      const scored = SDN_NAMES
        .map(name => ({ name, score: scoreName(name, query) }))
        .filter(({ score }) => score >= SCORE_THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      return NextResponse.json({
        matches: scored,
        totalLoaded: SDN_NAMES.length,
        source: 'OFAC SDN (embedded snapshot)',
        isLive: false,
      })
    } catch {
      return NextResponse.json({ matches: [], error: 'Sanctions check unavailable', fallbackMode: true })
    }
  }
}
