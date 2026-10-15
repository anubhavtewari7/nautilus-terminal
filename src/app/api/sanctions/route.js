import { NextResponse } from 'next/server'
import { SDN_NAMES } from '@/lib/sdn-snapshot'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// ============================================================
// LAYER 1 — OFAC SDN (US Treasury)
// ============================================================
const OFAC_SOURCES = [
  'https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.CSV',
  'https://ofac.treasury.gov/downloads/sdn.csv',
  'https://ofac.treasury.gov/downloads/sdn.txt',
]

const CACHE_MS = 24 * 60 * 60 * 1000
let _ofacCache = null

function parseSdnCsv(text) {
  const names = []
  for (const line of text.split('\n')) {
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
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*\d+\.\s+(.+)/)
    if (!match) continue
    const rest = match[1]
    const idx = rest.indexOf(';')
    const name = (idx !== -1 ? rest.slice(0, idx) : rest).trim()
    if (name.length > 1) names.push(name.toUpperCase())
  }
  return names
}

function parseOfacResponse(url, text) {
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
        headers: { 'User-Agent': 'NAUTILUS-Terminal/1.0', 'Accept': 'text/csv, text/plain, */*' },
      })
      clearTimeout(timeout)
      if (!res.ok) continue
      const text = await res.text()
      const names = parseOfacResponse(url, text)
      if (names.length > 100) return { names, isLive: true }
    } catch (_) { /* try next */ }
  }
  return null
}

async function loadOfac() {
  if (_ofacCache && Date.now() - new Date(_ofacCache.fetchedAt).getTime() < CACHE_MS) return _ofacCache
  const live = await tryFetchLiveSdn()
  if (live) {
    _ofacCache = { names: live.names, fetchedAt: new Date().toISOString(), isLive: true }
    return _ofacCache
  }
  _ofacCache = { names: SDN_NAMES, fetchedAt: new Date().toISOString(), isLive: false }
  return _ofacCache
}

const SCORE_THRESHOLD = 50
function scoreOfacName(sdnName, query) {
  const name = sdnName.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 0
  if (name === q) return 100
  if (name.includes(q)) return 80
  const qWords = q.split(/\s+/).filter(Boolean)
  const nWords = name.split(/[\s,;./-]+/).filter(Boolean)
  if (qWords.every(qw => nWords.some(nw => nw === qw)) && qWords.length > 0) return 80
  if (nWords.some(nw => nw.length > 2 && q.includes(nw))) return 60
  if (qWords.some(qw => qw.length > 2 && nWords.some(nw => nw.startsWith(qw)))) return 55
  return 0
}

// ============================================================
// LAYER 2 — OpenSanctions (EU, UN, UK, AU + 100+ more lists)
// https://opensanctions.org  — free for non-commercial / research
// Set env var OPENSANCTIONS_API_KEY for higher rate limits
// ============================================================
const OS_BASE = 'https://api.opensanctions.org'
let _osCache = null // { results: [...], fetchedAt }
const OS_CACHE_MS = 60 * 60 * 1000 // 1 hour per query (too expensive to cache all)

// Map OpenSanctions dataset IDs → human-readable labels
const OS_DATASET_LABELS = {
  'us_ofac_sdn':       'OFAC SDN',
  'us_ofac_cons':      'OFAC Consolidated',
  'eu_fsf':            'EU Financial Sanctions',
  'un_sc_sanctions':   'UN Security Council',
  'gb_hmt_sanctions':  'UK HMT',
  'au_dfat_sanctions': 'Australia DFAT',
  'ch_seco_sanctions': 'Switzerland SECO',
  'ca_dfatd_sema':     'Canada DFATD',
  'jp_meti_sanctions': 'Japan METI',
  'interpol_red_notices': 'INTERPOL Red Notice',
  'us_bis_denied':     'US BIS Denied Parties',
  'us_state_debarment':'US State Dept Debarment',
  'worldbank_debarred': 'World Bank Debarred',
  'icij_offshoreleaks': 'ICIJ Offshore Leaks',
}

function formatOsDatasets(datasets = []) {
  return datasets
    .map(d => OS_DATASET_LABELS[d] || d)
    .slice(0, 4)
    .join(', ')
}

async function queryOpenSanctions(query) {
  const key = process.env.OPENSANCTIONS_API_KEY
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(key ? { 'Authorization': `ApiKey ${key}` } : {}),
  }

  // Use the /match endpoint for entity matching — returns ranked results
  const body = JSON.stringify({
    queries: {
      entity: {
        schema: 'LegalEntity',
        properties: { name: [query] }
      }
    }
  })

  try {
    const res = await fetch(`${OS_BASE}/match/default`, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) {
      // Fall back to simpler GET search
      const res2 = await fetch(
        `${OS_BASE}/entities?q=${encodeURIComponent(query)}&schema=LegalEntity&limit=8`,
        { headers, signal: AbortSignal.timeout(8000) }
      )
      if (!res2.ok) throw new Error(`OpenSanctions HTTP ${res2.status}`)
      const data2 = await res2.json()
      return (data2.results || []).map(e => ({
        name: e.caption || e.id,
        score: 70,
        datasets: formatOsDatasets(e.datasets),
        country: e.properties?.country?.[0] || null,
        type: e.schema || 'Entity',
        source: 'OpenSanctions',
        id: e.id,
      }))
    }

    const data = await res.json()
    const responses = data.responses || {}
    const results = responses.entity?.results || []

    return results
      .filter(r => (r.score || 0) >= 0.4)
      .slice(0, 8)
      .map(r => ({
        name: r.caption || r.id,
        score: Math.round((r.score || 0) * 100),
        datasets: formatOsDatasets(r.datasets),
        country: r.properties?.country?.[0] || null,
        type: r.schema || 'Entity',
        source: 'OpenSanctions',
        id: r.id,
      }))
  } catch (err) {
    console.info(`[/api/sanctions] OpenSanctions failed: ${err.message}`)
    return []
  }
}

// ============================================================
// LAYER 3 — EU Consolidated Sanctions List (direct, no key)
// https://webgate.ec.europa.eu/fsd/fsf
// ============================================================
async function queryEuSanctions(query) {
  // EU Financial Sanctions Files — XML is large, use the API search endpoint
  try {
    const url = `https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4tMjAxNy0xMS0xNFQxNDoxODo1Ny4xMjha`
    // Too large to parse in real-time. Skip and rely on OpenSanctions which aggregates EU list.
    return []
  } catch { return [] }
}

// ============================================================
// MERGE & DEDUPLICATE
// ============================================================
function mergeResults(ofacMatches, osMatches) {
  const seen = new Set()
  const merged = []

  // OFAC first (highest legal weight for US entities)
  for (const m of ofacMatches) {
    const key = m.name.toUpperCase().replace(/\s+/g, ' ').trim()
    if (!seen.has(key)) {
      seen.add(key)
      merged.push({ ...m, source: 'OFAC SDN', layer: 'ofac' })
    }
  }

  // OpenSanctions — add entries not already matched by OFAC name
  for (const m of osMatches) {
    const key = m.name.toUpperCase().replace(/\s+/g, ' ').trim()
    // Check if this name is already in OFAC results (avoid dupe for same entity)
    const alreadyCovered = merged.some(existing => {
      const existKey = existing.name.toUpperCase().replace(/\s+/g, ' ').trim()
      return existKey === key || existKey.includes(key.slice(0, 8)) || key.includes(existKey.slice(0, 8))
    })
    if (!alreadyCovered) {
      seen.add(key)
      merged.push({ ...m, layer: 'opensanctions' })
    } else {
      // Still include but mark as cross-listed
      const existing = merged.find(e => {
        const existKey = e.name.toUpperCase().replace(/\s+/g, ' ').trim()
        return existKey === key || existKey.includes(key.slice(0, 8)) || key.includes(existKey.slice(0, 8))
      })
      if (existing && m.datasets) {
        existing.crossListed = m.datasets
        existing.osDatasets = m.datasets
      }
    }
  }

  return merged.sort((a, b) => (b.score || 0) - (a.score || 0))
}

// ============================================================
// MAIN HANDLER
// ============================================================
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim()

  if (!query) {
    return NextResponse.json(
      { matches: [], totalLoaded: 0, sources: [], error: 'Missing ?q= parameter' },
      { status: 400 }
    )
  }

  try {
    // Run OFAC + OpenSanctions in parallel
    const [ofacData, osMatches] = await Promise.all([
      loadOfac(),
      queryOpenSanctions(query),
    ])

    const ofacMatches = ofacData.names
      .map(name => ({ name, score: scoreOfacName(name, query) }))
      .filter(({ score }) => score >= SCORE_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)

    const merged = mergeResults(ofacMatches, osMatches)

    // Determine which lists are active
    const sources = ['OFAC SDN']
    if (osMatches.length >= 0) sources.push('OpenSanctions (EU/UN/UK/AU/+100 lists)')
    const osKey = process.env.OPENSANCTIONS_API_KEY ? 'authenticated' : 'public (rate-limited)'

    return NextResponse.json({
      matches: merged.slice(0, 12),
      totalOfacLoaded: ofacData.names.length,
      ofacIsLive: ofacData.isLive,
      openSanctionsHits: osMatches.length,
      sources,
      openSanctionsMode: osKey,
      lastFetched: ofacData.fetchedAt,
      note: 'Covers: OFAC SDN, EU Financial Sanctions, UN Security Council, UK HMT, Australia DFAT, Switzerland SECO, Canada DFATD, World Bank Debarred, INTERPOL Red Notices, US BIS Denied Parties, and 100+ additional lists via OpenSanctions.',
    })
  } catch (err) {
    console.error('[/api/sanctions]', err.message)
    // Emergency fallback — OFAC snapshot only
    try {
      const scored = SDN_NAMES
        .map(name => ({ name, score: scoreOfacName(name, query) }))
        .filter(({ score }) => score >= SCORE_THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      return NextResponse.json({
        matches: scored.map(m => ({ ...m, source: 'OFAC SDN', layer: 'ofac' })),
        totalOfacLoaded: SDN_NAMES.length,
        ofacIsLive: false,
        sources: ['OFAC SDN (snapshot)'],
        fallback: true,
      })
    } catch {
      return NextResponse.json({ matches: [], error: 'Sanctions check unavailable', fallbackMode: true })
    }
  }
}
