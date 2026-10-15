import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// ============================================================
// COMMODITY PRICE HISTORY — NAUTILUS Terminal
// Source: Yahoo Finance monthly OHLCV for commodity futures
// (same reliable source used by /api/commodities)
// Provides 24-month historical series for trend/sparkline use
// ============================================================

// Yahoo Finance futures tickers + unit conversions
// Pink Sheet commodity names kept for API compatibility
const COMMODITIES = {
  copper: {
    ticker: 'HG=F',
    label: 'Copper',
    unit: 'USD/mt',
    // Yahoo quotes in USD/lb → × 2204.62 to get USD/mt
    convert: v => parseFloat((v * 2204.62).toFixed(2)),
  },
  gold: {
    ticker: 'GC=F',
    label: 'Gold',
    unit: 'USD/troy oz',
    convert: v => parseFloat(v.toFixed(2)),
  },
  crude_oil: {
    ticker: 'CL=F',
    label: 'Crude Oil (WTI)',
    unit: 'USD/bbl',
    convert: v => parseFloat(v.toFixed(2)),
  },
  brent: {
    ticker: 'BZ=F',
    label: 'Crude Oil (Brent)',
    unit: 'USD/bbl',
    convert: v => parseFloat(v.toFixed(2)),
  },
  natural_gas: {
    ticker: 'NG=F',
    label: 'Natural Gas (Henry Hub)',
    unit: 'USD/mmbtu',
    convert: v => parseFloat(v.toFixed(3)),
  },
  wheat: {
    ticker: 'ZW=F',
    label: 'Wheat (SRW)',
    unit: 'USD/mt',
    // Yahoo quotes in USD/bushel × 100 (cents) → ÷ 100 × 36.744
    convert: v => parseFloat((v * 0.36744).toFixed(2)),
  },
  corn: {
    ticker: 'ZC=F',
    label: 'Corn',
    unit: 'USD/mt',
    // Yahoo quotes in USD/bushel cents → ÷ 100 × 39.368
    convert: v => parseFloat((v * 0.39368).toFixed(2)),
  },
  silver: {
    ticker: 'SI=F',
    label: 'Silver',
    unit: 'USD/troy oz',
    convert: v => parseFloat(v.toFixed(3)),
  },
  // Reference values for LME metals not on Yahoo Finance futures
  // Updated quarterly from LME / World Bank Pink Sheet
  aluminum: {
    ticker: null,
    label: 'Aluminum (LME)',
    unit: 'USD/mt',
    referenceValue: 2420,
    referenceDate: '2025-08',
    referenceSource: 'LME spot reference',
  },
  nickel: {
    ticker: null,
    label: 'Nickel (LME)',
    unit: 'USD/mt',
    referenceValue: 15800,
    referenceDate: '2025-08',
    referenceSource: 'LME spot reference',
  },
  zinc: {
    ticker: null,
    label: 'Zinc (LME)',
    unit: 'USD/mt',
    referenceValue: 2760,
    referenceDate: '2025-08',
    referenceSource: 'LME spot reference',
  },
  iron_ore: {
    ticker: null,
    label: 'Iron Ore (62% Fe CFR)',
    unit: 'USD/mt',
    referenceValue: 102,
    referenceDate: '2025-08',
    referenceSource: 'Platts reference',
  },
  coal: {
    ticker: null,
    label: 'Coal (Australian export)',
    unit: 'USD/mt',
    referenceValue: 135,
    referenceDate: '2025-08',
    referenceSource: 'S&P Global reference',
  },
}

const CACHE_MS = 4 * 60 * 60 * 1000 // 4 hours
let _cache = null

// ─── Yahoo Finance monthly OHLCV fetch ───────────────────────────────────────
async function fetchYahooMonthly(ticker, months = 24) {
  const now = Math.floor(Date.now() / 1000)
  const from = now - months * 31 * 24 * 3600 // slightly over to ensure full coverage
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?period1=${from}&period2=${now}&interval=1mo&includePrePost=false`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NAUTILUS/1.0)',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null

    const json = await res.json()
    const result = json?.chart?.result?.[0]
    if (!result) return null

    const timestamps = result.timestamp || []
    const closes = result.indicators?.adjclose?.[0]?.adjclose ||
                   result.indicators?.quote?.[0]?.close || []

    if (timestamps.length === 0 || closes.length === 0) return null

    const series = []
    for (let i = 0; i < timestamps.length; i++) {
      const v = closes[i]
      if (v == null || isNaN(v)) continue
      const d = new Date(timestamps[i] * 1000)
      const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
      series.push({ date: dateStr, value: v })
    }

    return series.sort((a, b) => a.date.localeCompare(b.date))
  } catch {
    return null
  }
}

// ─── Build commodity object from live series ─────────────────────────────────
function buildFromSeries(key, meta, rawSeries) {
  if (!rawSeries || rawSeries.length === 0) return null

  // Apply unit conversion
  const series = rawSeries.map(p => ({
    date: p.date,
    value: meta.convert(p.value),
  }))

  const latest = series[series.length - 1]
  const prev = series.length >= 2 ? series[series.length - 2] : null
  const twelve = series.length >= 13 ? series[series.length - 13] : null

  const pctChange1m = prev && prev.value
    ? parseFloat((((latest.value - prev.value) / prev.value) * 100).toFixed(2))
    : null

  const pctChange12m = twelve && twelve.value
    ? parseFloat((((latest.value - twelve.value) / twelve.value) * 100).toFixed(2))
    : null

  return {
    id: key,
    label: meta.label,
    unit: meta.unit,
    latestValue: latest.value,
    latestDate: latest.date,
    pctChange1m,
    pctChange12m,
    series,
    dataSource: 'Yahoo Finance (monthly)',
    live: true,
  }
}

// ─── Build reference entry (no live history) ──────────────────────────────────
function buildReference(key, meta) {
  return {
    id: key,
    label: meta.label,
    unit: meta.unit,
    latestValue: meta.referenceValue,
    latestDate: meta.referenceDate,
    pctChange1m: null,
    pctChange12m: null,
    series: [{ date: meta.referenceDate, value: meta.referenceValue }],
    dataSource: meta.referenceSource,
    live: false,
    note: 'Reference value — connect LME API for live data',
  }
}

// ─── Load all commodities ─────────────────────────────────────────────────────
async function loadAll() {
  if (_cache && Date.now() - new Date(_cache.fetchedAt).getTime() < CACHE_MS) {
    return _cache
  }

  const liveKeys = Object.entries(COMMODITIES).filter(([, m]) => m.ticker)
  const refKeys  = Object.entries(COMMODITIES).filter(([, m]) => !m.ticker)

  // Fetch all live tickers in parallel
  const liveResults = await Promise.allSettled(
    liveKeys.map(([, m]) => fetchYahooMonthly(m.ticker, 24))
  )

  const data = {}

  for (let i = 0; i < liveKeys.length; i++) {
    const [key, meta] = liveKeys[i]
    const rawSeries = liveResults[i].status === 'fulfilled' ? liveResults[i].value : null
    const entry = buildFromSeries(key, meta, rawSeries)
    if (entry) {
      data[key] = entry
    } else {
      // Live fetch failed — build a stub so the key still appears
      data[key] = {
        id: key,
        label: meta.label,
        unit: meta.unit,
        latestValue: null,
        latestDate: null,
        pctChange1m: null,
        pctChange12m: null,
        series: [],
        dataSource: 'Yahoo Finance (unavailable)',
        live: false,
        error: 'Could not fetch live data',
      }
    }
  }

  for (const [key, meta] of refKeys) {
    data[key] = buildReference(key, meta)
  }

  _cache = {
    data,
    fetchedAt: new Date().toISOString(),
    source: 'Yahoo Finance monthly futures + LME reference values',
  }
  return _cache
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const commodity = searchParams.get('commodity')
  const seriesOnly = searchParams.get('series') === 'true'

  try {
    const cached = await loadAll()
    let data = cached.data

    if (commodity) {
      const key = commodity.toLowerCase().replace(/[^a-z_]/g, '_')
      if (data[key]) {
        data = { [key]: data[key] }
      } else {
        return NextResponse.json({ error: `Unknown commodity: ${commodity}` }, { status: 404 })
      }
    }

    // Trim series to last 6 months unless full series requested
    if (!seriesOnly) {
      const trimmed = {}
      for (const [k, v] of Object.entries(data)) {
        trimmed[k] = { ...v, series: v.series?.slice(-6) ?? [] }
      }
      data = trimmed
    }

    return NextResponse.json({
      source: cached.source,
      sourceUrl: 'https://finance.yahoo.com',
      fetchedAt: cached.fetchedAt,
      commodities: data,
      availableKeys: Object.keys(COMMODITIES),
      note: 'Monthly commodity price history from Yahoo Finance futures. Live tickers: copper, gold, crude_oil, brent, natural_gas, wheat, corn, silver. Reference values for aluminum, nickel, zinc, iron_ore, coal.',
    })
  } catch (err) {
    console.error('[/api/world-bank]', err.message)
    return NextResponse.json({ error: 'Commodity history unavailable', detail: err.message }, { status: 500 })
  }
}
