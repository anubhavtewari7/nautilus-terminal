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
    region: 'GLOBAL',
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

  const articles = json.articles || [];
  const alerts = articles
    .filter(a => a.title && a.title !== '[Removed]')
    .map(mapArticleToAlert);

  const now = new Date().toISOString();
  const data = {
    lastUpdated: now,
    version: 2,
    agentStatus: 'live',
    source: 'newsapi',
    alerts,
    commodityNotes: [],
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
