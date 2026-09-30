import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// OFAC SDN condensed list -- plain text, no API key required
const OFAC_SDN_URL = 'https://www.treasury.gov/ofac/downloads/sdnlist.txt'
const CACHE_MS = 24 * 60 * 60 * 1000 // 24 hours

// Module-level in-memory cache (resets on cold start)
let _cache = null // { names: string[], fetchedAt: string }

/**
 * Parse the OFAC SDN plain-text list.
 * Entries look like:
 *   " 1. ABADIA MEDINA, Alirio de Jesus; DOB 26 Sep 1956; ..."
 *   " 2. ABAD ALVAREZ, Anselmo; ..."
 * We extract the name part (before the first semicolon), stripped of the
 * leading number + period, then trim whitespace.
 */
function parseSdnText(text) {
  const names = []
  const lines = text.split('\n')
  for (const line of lines) {
    // Match lines that start with optional whitespace, a number, a period and a space
    const match = line.match(/^\s*\d+\.\s+(.+)/)
    if (!match) continue
    const rest = match[1]
    // Name is everything before the first semicolon
    const semicolonIdx = rest.indexOf(';')
    const rawName = semicolonIdx !== -1 ? rest.slice(0, semicolonIdx) : rest
    const name = rawName.trim()
    if (name.length > 1) names.push(name)
  }
  return names
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

  // Exact match (case-insensitive)
  if (name === q) return 100

  // Query string appears inside the SDN name
  if (name.includes(q)) return 80

  // Word-level check: every query word appears in the SDN name
  const queryWords = q.split(/\s+/).filter(Boolean)
  const nameWords = name.split(/[\s,;./-]+/).filter(Boolean)

  const allQueryWordsInName = queryWords.every(qw => nameWords.some(nw => nw === qw))
  if (allQueryWordsInName && queryWords.length > 0) return 80

  // Any query word contains a name word (partial match, e.g. acronym expansion)
  const anyNameWordInQuery = nameWords.some(nw => nw.length > 2 && q.includes(nw))
  if (anyNameWordInQuery) return 60

  // Any query word is a substring of a name word (prefix match)
  const anyQueryWordSubstringOfName = queryWords.some(
    qw => qw.length > 2 && nameWords.some(nw => nw.startsWith(qw))
  )
  if (anyQueryWordSubstringOfName) return 55

  return 0
}

async function loadSdnList() {
  // Return from cache if still fresh
  if (_cache && Date.now() - new Date(_cache.fetchedAt).getTime() < CACHE_MS) {
    return { names: _cache.names, cached: true, fetchedAt: _cache.fetchedAt }
  }

  // Fetch with a 10-second timeout
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(OFAC_SDN_URL, {
      signal: controller.signal,
      headers: { 'User-Agent': 'NAUTILUS-Terminal/1.0 (sanctions-screening)' },
    })
    clearTimeout(timer)

    if (!res.ok) throw new Error(`OFAC responded ${res.status}`)

    const text = await res.text()
    const names = parseSdnText(text)
    const fetchedAt = new Date().toISOString()

    _cache = { names, fetchedAt }
    return { names, cached: false, fetchedAt }
  } catch (err) {
    clearTimeout(timer)
    throw err
  }
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

    // Score and filter
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
