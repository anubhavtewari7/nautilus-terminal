import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Serves the agent-written market-intelligence.json as a Next.js API route.
// The file lives in /public so the agent can update it with a plain file write
// and git push -- no database required.
// Cache for 55 seconds so Vercel CDN doesn't stale the hourly updates.
export const revalidate = 55;

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'market-intelligence.json');
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);

    // Staleness: prefer top-level lastUpdated, fall back to newest alert timestamp.
    const items = data.alerts || data.briefs || data.items || [];
    const topLevelTs = data.lastUpdated ? new Date(data.lastUpdated).getTime() : 0;
    const newestItemTs = items.length > 0
      ? Math.max(...items.map(i => new Date(i.timestamp || i.date || i.pubDate || 0).getTime()).filter(t => t > 0))
      : 0;
    const latestTimestamp = Math.max(topLevelTs, newestItemTs) || null;
    const ageMs = latestTimestamp ? Date.now() - latestTimestamp : null;
    const ageDays = ageMs !== null ? Math.floor(ageMs / (1000 * 60 * 60 * 24)) : null;

    return NextResponse.json({ ...data, ageDays, latestTimestamp }, {
      headers: { 'Cache-Control': 'public, max-age=55, stale-while-revalidate=300' }
    });
  } catch (err) {
    console.error('[/api/market-data]', err.message);
    return NextResponse.json(
      { error: 'Market intelligence unavailable', alerts: [], commodityNotes: [], disruptionZones: [] },
      { status: 503 }
    );
  }
}
