import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// ============================================================
// WORLD BANK COMMODITY PRICE DATA (Pink Sheet)
// Free, no API key required
// Docs: https://datacatalog.worldbank.org/dataset/commodity-prices-pink-sheet
// Endpoint: https://api.worldbank.org/v2/en/indicator/{INDICATOR}?format=json&mrv=24&frequency=M
// ============================================================

const WB_INDICATORS = {
  copper:     { id: 'PCOPP',    label: 'Copper',           unit: 'USD/mt' },
  aluminum:   { id: 'PALUM',    label: 'Aluminum',         unit: 'USD/mt' },
  nickel:     { id: 'PNICK',    label: 'Nickel',           unit: 'USD/mt' },
  gold:       { id: 'PGOLD',    label: 'Gold',             unit: 'USD/troy oz' },
  coal:       { id: 'PCOAL',    label: 'Coal (Australia)', unit: 'USD/mt' },
  crude_oil:  { id: 'POILAPSP', label: 'Crude Oil (avg)',  unit: 'USD/bbl' },
  brent:      { id: 'POILBRE',  label: 'Crude Oil (Brent)',unit: 'USD/bbl' },
  natural_gas:{ id: 'PNGASEU', label: 'Natural Gas (EU)', unit: 'USD/mmbtu' },
  wheat:      { id: 'PWHEAMT',  label: 'Wheat',            unit: 'USD/mt' },
  zinc:       { id: 'PZINC',    label: 'Zinc',             unit: 'USD/mt' },
  iron_ore:   { id: 'PIORECR',  label: 'Iron Ore',         unit: 'USD/mt' },
  lead:       { id: 'PLEAD',    label: 'Lead',             unit: 'USD/mt' },
  tin:        { id: 'PTIN',     label: 'Tin',              unit: 'USD/mt' },
}

// World Bank API: to get time series data, must use country/all path
const WB_BASE = 'https://api.worldbank.org/v2/country/all/indicator'
const CACHE_MS = 6 * 60 * 60 * 1000 // 6 hours — Pink Sheet updates monthly

let _wbCache = null // { data: {}, fetchedAt }

async function fetchIndicator(indicatorId) {
  // World Bank Pink Sheet: use source=89 (GEM Commodities) and WLD aggregate
  const url = `${WB_BASE}/${indicatorId}?format=json&mrv=24&frequency=M&source=89`
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { 'User-Agent': 'NAUTILUS-Terminal/1.0' },
    })
    if (!res.ok) return null
    const json = await res.json()
    // World Bank returns [metadata, data_array]
    if (!Array.isArray(json) || json.length < 2) return null
    const entries = json[1]
    if (!Array.isArray(entries) || entries.length === 0) return null

    // Pink Sheet uses 'WLD' country code for the world/global commodity price
    // Filter to WLD entries first, fall back to any valid entry
    let filtered = entries.filter(e => e.value !== null && e.date && e.country?.id === 'WLD')
    if (filtered.length === 0) {
      // Some indicators use 'EUU' or other aggregates — take all non-null
      filtered = entries.filter(e => e.value !== null && e.date)
    }
    const valid = filtered.sort((a, b) => a.date.localeCompare(b.date))

    if (valid.length === 0) return null

    const latest = valid[valid.length - 1]
    const prev = valid.length >= 2 ? valid[valid.length - 2] : null
    const oldest = valid[0]

    const pctChange1m = prev && prev.value
      ? ((latest.value - prev.value) / prev.value) * 100
      : null

    const pctChange12m = valid.length >= 13
      ? ((latest.value - valid[valid.length - 13].value) / valid[valid.length - 13].value) * 100
      : null

    // Build 24-month series for sparkline
    const series = valid.map(e => ({ date: e.date, value: e.value }))

    return {
      latestValue: latest.value,
      latestDate: latest.date,
      pctChange1m: pctChange1m !== null ? parseFloat(pctChange1m.toFixed(2)) : null,
      pctChange12m: pctChange12m !== null ? parseFloat(pctChange12m.toFixed(2)) : null,
      series,
    }
  } catch {
    return null
  }
}

async function loadAllIndicators() {
  if (_wbCache && Date.now() - new Date(_wbCache.fetchedAt).getTime() < CACHE_MS) {
    return _wbCache
  }

  // Fetch all indicators in parallel
  const keys = Object.keys(WB_INDICATORS)
  const results = await Promise.allSettled(
    keys.map(k => fetchIndicator(WB_INDICATORS[k].id))
  )

  const data = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const meta = WB_INDICATORS[key]
    const result = results[i].status === 'fulfilled' ? results[i].value : null
    if (result) {
      data[key] = {
        ...meta,
        ...result,
      }
    }
  }

  _wbCache = { data, fetchedAt: new Date().toISOString() }
  return _wbCache
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const commodity = searchParams.get('commodity') // optional filter
  const seriesOnly = searchParams.get('series') === 'true'

  try {
    const cached = await loadAllIndicators()
    let data = cached.data

    if (commodity) {
      const key = commodity.toLowerCase().replace(/[^a-z_]/g, '_')
      if (data[key]) {
        data = { [key]: data[key] }
      } else {
        return NextResponse.json({ error: `Unknown commodity: ${commodity}` }, { status: 404 })
      }
    }

    // If series not requested, trim the series arrays to save bandwidth
    if (!seriesOnly) {
      const trimmed = {}
      for (const [k, v] of Object.entries(data)) {
        trimmed[k] = {
          ...v,
          series: v.series?.slice(-6) ?? [], // last 6 months for sparkline
        }
      }
      data = trimmed
    }

    return NextResponse.json({
      source: 'World Bank Pink Sheet',
      sourceUrl: 'https://datacatalog.worldbank.org/dataset/commodity-prices-pink-sheet',
      fetchedAt: cached.fetchedAt,
      commodities: data,
      availableKeys: Object.keys(WB_INDICATORS),
      note: 'World Bank monthly commodity prices. Data updates monthly. Free, no API key required.',
    })
  } catch (err) {
    console.error('[/api/world-bank]', err.message)
    return NextResponse.json({ error: 'Failed to fetch World Bank commodity data', detail: err.message }, { status: 500 })
  }
}
