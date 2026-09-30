// NAUTILUS TERMINAL -- /api/intel/route.js
// Live trade intelligence: NewsAPI.org + static World Bank stability scores
// Requires NEWS_API_KEY environment variable
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic'

// World Bank Political Stability Index 2023 — normalized 0–100
// Source: World Bank Worldwide Governance Indicators (PV.EST, 2023)
// Updates annually — static lookup is appropriate
const WB_STABILITY = {
  CN: 42, JP: 70, MX: 34, VN: 50, IN: 28, DE: 67, US: 45,
  TW: 64, KR: 57, MY: 58, TH: 42, BD: 32, ID: 45, BR: 48,
  TR: 20, PL: 62, CZ: 72, IT: 62, FR: 41, GB: 60, NL: 67,
  BE: 65, ES: 50, CA: 68, SG: 82, PH: 34, LK: 37, KH: 20,
  MM: 8,  MA: 37, ET: 12, EG: 25, IL: 18, AE: 72, SA: 30,
  AU: 85, CL: 60, CO: 22, PE: 28, AR: 35, SE: 88, AT: 85,
  CH: 90, HU: 55, RO: 42, UA: 10, RU: 15, PK: 12, NG: 10,
  ZA: 33, GH: 52,
}

const COUNTRY_ISO2 = {
  'china': 'CN', 'japan': 'JP', 'mexico': 'MX', 'vietnam': 'VN',
  'india': 'IN', 'germany': 'DE', 'usa': 'US', 'united states': 'US',
  'taiwan': 'TW', 'south korea': 'KR', 'korea': 'KR', 'malaysia': 'MY',
  'thailand': 'TH', 'bangladesh': 'BD', 'indonesia': 'ID', 'brazil': 'BR',
  'turkey': 'TR', 'poland': 'PL', 'czech republic': 'CZ', 'czechia': 'CZ',
  'italy': 'IT', 'france': 'FR', 'uk': 'GB', 'united kingdom': 'GB',
  'netherlands': 'NL', 'belgium': 'BE', 'spain': 'ES', 'canada': 'CA',
  'singapore': 'SG', 'philippines': 'PH', 'sri lanka': 'LK',
  'cambodia': 'KH', 'myanmar': 'MM', 'morocco': 'MA', 'ethiopia': 'ET',
  'egypt': 'EG', 'uae': 'AE', 'saudi arabia': 'SA', 'australia': 'AU',
  'chile': 'CL', 'colombia': 'CO', 'peru': 'PE', 'argentina': 'AR',
  'sweden': 'SE', 'austria': 'AT', 'switzerland': 'CH', 'pakistan': 'PK',
  'nigeria': 'NG', 'south africa': 'ZA', 'ghana': 'GH',
}

const NEWS_API_KEY = process.env.NEWS_API_KEY || ''

const FALLBACK_ARTICLES = [
  {
    title: 'Red Sea Disruption: Shipping Reroutes Around Cape of Good Hope',
    description: 'Houthi attacks continue to divert container traffic, adding 10–14 days and $1M+ fuel costs per voyage. Monitor vessel tracking for updates.',
    source: { name: 'Reference — verify with live carrier advisories' },
    publishedAt: '2026-09-01T00:00:00Z',
    url: 'https://www.imo.org',
    isFallback: true,
  },
  {
    title: 'US–China Tariff Landscape: Section 301 Duties Remain in Force',
    description: 'Tariffs of 7.5–25% on $360B+ of Chinese goods remain active. EV battery tariffs raised to 100%. Review USTR HTS codes before sourcing decisions.',
    source: { name: 'Reference — verify with USTR' },
    publishedAt: '2026-09-01T00:00:00Z',
    url: 'https://ustr.gov',
    isFallback: true,
  },
  {
    title: 'Semiconductor Supply Chain: Capacity Additions Ease Lead Times',
    description: 'TSMC Arizona and Samsung Taylor fabs ramping production. Legacy node (28nm+) lead times normalizing to 12–16 weeks from 52-week peaks. Advanced nodes (3nm) remain constrained.',
    source: { name: 'Reference — verify with distributor lead time reports' },
    publishedAt: '2026-09-01T00:00:00Z',
    url: 'https://www.semiconductors.org',
    isFallback: true,
  },
  {
    title: 'Critical Minerals: Lithium Prices Stabilize After 2023–2024 Collapse',
    description: 'Lithium carbonate prices stabilized around $10–12/kg after falling 85% from 2022 peak. DRC cobalt supply remains constrained by artisanal mining regulations.',
    source: { name: 'Reference — verify with Benchmark Mineral Intelligence' },
    publishedAt: '2026-09-01T00:00:00Z',
    url: 'https://www.worldbank.org/en/research/commodity-markets',
    isFallback: true,
  },
]

function extractCountries(opportunities) {
  const found = new Set()
  for (const opp of opportunities) {
    const name = (opp.hub || '').toLowerCase()
    for (const country of Object.keys(COUNTRY_ISO2)) {
      if (name.includes(country)) { found.add(country); break }
    }
  }
  return Array.from(found).slice(0, 5)
}

const STOP = new Set(['and','the','for','with','from','into','that','this','are','have','trade','supply','chain','global'])

function buildKeywords(query, countries) {
  const commodityWords = query
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP.has(w.toLowerCase()))
    .slice(0, 3)
  return { commodityWords, countryTerms: countries.slice(0, 3) }
}

// Strategy A: NewsAPI.org (requires NEWS_API_KEY env var)
async function fetchNewsAPI(countries, query) {
  if (!NEWS_API_KEY) { console.warn('[/api/intel] NEWS_API_KEY not set, using GDELT fallback'); return [] }
  const { commodityWords, countryTerms } = buildKeywords(query, countries)
  const commodityTerms = commodityWords.length ? `(${commodityWords.join(' OR ')})` : ''
  const countryQ       = countryTerms.length   ? `(${countryTerms.join(' OR ')})`   : ''
  const queryParts = [commodityTerms, countryQ].filter(Boolean)
  if (!queryParts.length) return []
  const baseQ = queryParts.join(' AND ')
  const tradeContext = 'AND (trade OR tariff OR "supply chain" OR export OR import OR sanctions OR sourcing OR manufacturing)'
  const q = encodeURIComponent(`${baseQ} ${tradeContext}`)
  const url = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&pageSize=6`
  try {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${NEWS_API_KEY}` },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return []
    const data = await res.json()
    if (data.status !== 'ok') return []
    return (data.articles || []).map(a => ({
      title: a.title,
      url: a.url,
      source: a.source?.name || 'NewsAPI',
      pubDate: a.publishedAt,
      tone: /sanction|tariff|ban|restrict|conflict|crisis|war|halt|shortage/.test((a.title || '').toLowerCase()) ? -5 : 0,
    }))
  } catch { return [] }
}

// Strategy B: GDELT DOC API -- free, no key, updated every 15 min.
// Returns news articles about a topic from global media.
async function fetchGDELTNews(countries, query) {
  try {
    const { commodityWords, countryTerms } = buildKeywords(query, countries)
    const keywords = [...commodityWords, ...countryTerms, 'trade', 'supply chain']
      .filter(Boolean)
      .slice(0, 6)
      .join(' OR ')
    if (!keywords) return []

    const q   = encodeURIComponent(keywords)
    const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}+sourcelang:english&mode=ArtList&format=json&maxrecords=10&timespan=3d&sort=DateDesc`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NautilusTerminal/2.0)', 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 900 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.articles || []).slice(0, 6).map(a => ({
      title:   a.title,
      url:     a.url,
      source:  a.domain || 'GDELT News',
      pubDate: a.seendate ? new Date(
        a.seendate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z')
      ).toISOString() : new Date().toISOString(),
      tone: /sanction|tariff|ban|restrict|conflict|crisis|war|halt|shortage/.test((a.title || '').toLowerCase()) ? -5 : 0,
    }))
  } catch { return [] }
}

export async function POST(req) {
  const rl = await rateLimit(req, { limit: 10, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  try {
    const body = await req.json()
    const { opportunities, query } = body ?? {}
    if (!Array.isArray(opportunities) || opportunities.length === 0) {
      return Response.json({ error: 'opportunities must be a non-empty array' }, { status: 400 })
    }
    if (typeof query !== 'string' || !query.trim() || query.length > 500) {
      return Response.json({ error: 'query must be a non-empty string (max 500 chars)' }, { status: 400 })
    }

    const countries = extractCountries(opportunities)

    // Build country scores instantly from static lookup — no network call needed
    const countryScores = {}
    countries.forEach(country => {
      const iso2 = COUNTRY_ISO2[country]
      if (iso2 && WB_STABILITY[iso2] !== undefined) {
        countryScores[iso2] = { stability: WB_STABILITY[iso2], source: 'WB 2023' }
      }
    })

    // Fetch news: NewsAPI first (requires key), GDELT DOC API as free fallback
    let allArticles = await fetchNewsAPI(countries, query)
    let newsSource = 'NewsAPI'
    if (allArticles.length === 0) {
      allArticles = await fetchGDELTNews(countries, query)
      newsSource = 'GDELT News'
    }

    // Static fallback when both live sources are unavailable
    if (allArticles.length === 0) {
      const topArticles = FALLBACK_ARTICLES.slice(0, 6)
      return Response.json({
        articles: topArticles,
        countryScores,
        articleCount: topArticles.length,
        sourceCount: 1,
        countries,
        newsSource: 'Reference fallback — live intelligence unavailable',
        timestamp: new Date().toISOString(),
        isFallback: true,
      })
    }

    const topArticles = allArticles.slice(0, 6)
    const sourceCount = new Set(topArticles.map(a => a.source).filter(Boolean)).size

    return Response.json({
      articles: topArticles,
      countryScores,
      articleCount: allArticles.length,
      sourceCount,
      countries,
      newsSource,
      timestamp: new Date().toISOString()
    })

  } catch (err) {
    console.error('[/api/intel]', err)
    return Response.json({ error: 'Intel fetch failed' }, { status: 500 })
  }
}
