import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Serves live supply-chain intelligence from NewsAPI, with a fallback to the
// static public/market-intelligence.json if the API is unavailable.
// Cache revalidates every hour on the server; CDN max-age matches.
export const revalidate = 3600;

const NEWSAPI_URL =
  'https://newsapi.org/v2/everything' +
  '?q=supply+chain+OR+logistics+OR+freight+OR+port+congestion+OR+trade+sanctions' +
  '&language=en&sortBy=publishedAt&pageSize=20';

/** Detect a region from article text. */
function detectRegion(text) {
  const t = (text || '').toLowerCase()
  if (/china|beijing|shanghai|shenzhen|guangdong|yangtze|hong kong/.test(t)) return 'ASIA-PACIFIC'
  if (/india|mumbai|chennai|delhi|bangalore/.test(t)) return 'SOUTH ASIA'
  if (/europe|germany|france|rotterdam|antwerp|hamburg|brussels|eu |european union/.test(t)) return 'EUROPE'
  if (/red sea|suez|houthi|aden|horn of africa|somalia/.test(t)) return 'MIDDLE EAST'
  if (/taiwan|strait|tsmc|hsinchu/.test(t)) return 'ASIA-PACIFIC'
  if (/mexico|nearshore|monterrey|guadalajara|tijuana/.test(t)) return 'LATIN AMERICA'
  if (/brazil|sao paulo|santos|rio/.test(t)) return 'LATIN AMERICA'
  if (/africa|nigeria|kenya|ethiopia|durban|cape town/.test(t)) return 'AFRICA'
  if (/russia|moscow|sanctions|ukraine|black sea/.test(t)) return 'EASTERN EUROPE'
  if (/us |usa|america|washington|new york|los angeles|long beach|houston/.test(t)) return 'NORTH AMERICA'
  if (/singapore|malaysia|indonesia|vietnam|thailand|philippines/.test(t)) return 'SOUTHEAST ASIA'
  if (/japan|korea|busan|tokyo|osaka/.test(t)) return 'NORTHEAST ASIA'
  if (/middle east|saudi|uae|dubai|qatar|kuwait|iran/.test(t)) return 'MIDDLE EAST'
  return 'GLOBAL'
}

const COMMODITY_KEYWORDS = {
  'Oil': ['oil', 'brent', 'crude', 'opec', 'petroleum', 'refinery'],
  'Semiconductors': ['chip', 'semiconductor', 'tsmc', 'wafer', 'foundry', 'memory', 'nand', 'dram'],
  'Lithium': ['lithium', 'battery', 'ev battery', 'cathode', 'anode'],
  'Steel': ['steel', 'hrc', 'iron ore', 'blast furnace', 'coking coal'],
  'Shipping': ['freight', 'container', 'shipping', 'vessel', 'charter', 'bdi', 'dry bulk'],
  'Rare Earths': ['rare earth', 'neodymium', 'cobalt', 'critical minerals', 'graphite'],
}

function detectCommodityDirection(text) {
  const t = (text || '').toLowerCase()
  const upWords = ['rise', 'rises', 'rising', 'surge', 'surges', 'up', 'gain', 'gains', 'higher', 'increase', 'rally', 'soar', 'jump', 'climbs', 'record high']
  const downWords = ['fall', 'falls', 'falling', 'drop', 'drops', 'down', 'decline', 'declines', 'lower', 'decrease', 'plunge', 'slump', 'tumble', 'dip', 'weakens', 'crash']
  const upCount = upWords.filter(w => t.includes(w)).length
  const downCount = downWords.filter(w => t.includes(w)).length
  if (upCount > downCount) return 'UP'
  if (downCount > upCount) return 'DOWN'
  return 'NEUTRAL'
}

function buildCommodityNotes(articles) {
  const notes = []
  for (const [commodity, keywords] of Object.entries(COMMODITY_KEYWORDS)) {
    const relevant = articles.filter(a =>
      keywords.some(k => (a.title + ' ' + (a.description || '')).toLowerCase().includes(k))
    )
    if (relevant.length > 0) {
      notes.push({
        commodity,
        signal: relevant[0].title,
        source: relevant[0].source?.name || 'NewsAPI',
        url: relevant[0].url,
        timestamp: relevant[0].publishedAt,
        direction: detectCommodityDirection(relevant[0].title + ' ' + (relevant[0].description || '')),
      })
    }
  }
  return notes
}

/** Derive severity from article content heuristics. */
function inferSeverity(title = '', description = '') {
  const text = `${title} ${description}`.toLowerCase();
  if (/crisis|shutdown|closure|ban|strike|typhoon|hurricane|sanction|seized|halt/.test(text)) return 'HIGH';
  if (/delay|surged?|spike|congestion|disruption|tariff|shortage/.test(text)) return 'MEDIUM';
  return 'LOW';
}

/** Derive a broad type tag from article content. */
function inferType(title = '', description = '') {
  const text = `${title} ${description}`.toLowerCase();
  if (/weather|typhoon|hurricane|storm|flood/.test(text)) return 'WEATHER';
  if (/tariff|sanction|regulation|ban|policy|customs|trade war/.test(text)) return 'REGULATORY';
  if (/rate|price|cost|index|surcharge/.test(text)) return 'MARKET';
  return 'DISRUPTION';
}

/** Map a NewsAPI article to the shape the terminal alert list expects. */
function mapArticleToAlert(article, index) {
  const title = article.title || 'Untitled';
  const description = article.description || '';
  return {
    id: `newsapi-${index}-${Date.now()}`,
    title,
    summary: description || title,
    severity: inferSeverity(title, description),
    type: inferType(title, description),
    region: detectRegion(title + ' ' + description),
    source: article.url || '',
    timestamp: article.publishedAt || new Date().toISOString(),
  };
}

/** Compute staleness metadata from a list of alerts. */
function stalenessFields(data) {
  const items = data.alerts || data.briefs || data.items || [];
  const topLevelTs = data.lastUpdated ? new Date(data.lastUpdated).getTime() : 0;
  const newestItemTs =
    items.length > 0
      ? Math.max(
          ...items
            .map(i => new Date(i.timestamp || i.date || i.pubDate || 0).getTime())
            .filter(t => t > 0)
        )
      : 0;
  const latestTimestamp = Math.max(topLevelTs, newestItemTs) || null;
  const ageMs = latestTimestamp ? Date.now() - latestTimestamp : null;
  const ageDays = ageMs !== null ? Math.floor(ageMs / (1000 * 60 * 60 * 24)) : null;
  return { ageDays, latestTimestamp };
}

async function fetchFromNewsAPI() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) throw new Error('NEWS_API_KEY not set');

  const res = await fetch(`${NEWSAPI_URL}&apiKey=${apiKey}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`NewsAPI responded ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(`NewsAPI error: ${json.message || json.status}`);

  const rawArticles = json.articles || [];
  const alerts = rawArticles
    .filter(a => a.title && a.title !== '[Removed]')
    .map(mapArticleToAlert);

  const now = new Date().toISOString();
  const data = {
    lastUpdated: now,
    version: 2,
    agentStatus: 'live',
    source: 'newsapi',
    alerts,
    commodityNotes: buildCommodityNotes(rawArticles),
    disruptionZones: [],
  };

  return { ...data, ...stalenessFields(data) };
}

async function fetchFromStatic() {
  const filePath = join(process.cwd(), 'public', 'market-intelligence.json');
  const raw = await readFile(filePath, 'utf-8');
  const data = JSON.parse(raw);
  return { ...data, source: 'static-fallback', ...stalenessFields(data) };
}

export async function GET() {
  // Try live NewsAPI first.
  try {
    const data = await fetchFromNewsAPI();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300' },
    });
  } catch (liveErr) {
    console.warn('[/api/market-data] NewsAPI fetch failed, falling back to static:', liveErr.message);
  }

  // Fall back to static file.
  try {
    const data = await fetchFromStatic();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=55, stale-while-revalidate=300' },
    });
  } catch (staticErr) {
    console.error('[/api/market-data] Static fallback also failed:', staticErr.message);
    return NextResponse.json(
      { error: 'Market intelligence unavailable', alerts: [], commodityNotes: [], disruptionZones: [] },
      { status: 503 }
    );
  }
}
