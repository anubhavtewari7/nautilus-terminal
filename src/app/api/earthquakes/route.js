import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// USGS Earthquake Hazards Program -- free, no API key required
const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'
const CACHE_MS  = 30 * 60 * 1000 // 30 minutes

// Module-level cache (resets on cold start)
let _cache     = null
let _cacheTime = 0

// Supply chain critical geographies -- earthquakes here get boosted relevance
const CRITICAL_REGIONS = [
  'japan', 'taiwan', 'china', 'indonesia', 'philippines', 'south korea',
  'turkey', 'chile', 'peru', 'mexico', 'alaska', 'california',
  'new zealand', 'papua new guinea', 'pakistan', 'india', 'iran',
  'malaysia', 'vietnam', 'thailand', 'myanmar'
]

function isCriticalRegion(place) {
  if (!place) return false
  const p = place.toLowerCase()
  return CRITICAL_REGIONS.some(r => p.includes(r))
}

function earthquakeToRisk(feature) {
  const props  = feature.properties || {}
  const mag    = props.mag
  const place  = props.place || 'Unknown region'
  const quakeTime = new Date(props.time)
  const daysAgo   = Math.floor((Date.now() - quakeTime.getTime()) / 86400000)
  const timeLabel = daysAgo === 0 ? 'today' : daysAgo === 1 ? 'yesterday' : `${daysAgo}d ago`

  const coords = feature.geometry?.coordinates || []
  const depthKm = coords[2] != null ? Math.round(coords[2]) : null
  const depthStr = depthKm != null ? `, ${depthKm}km depth` : ''

  // Severity mapping: M7.0+ = HIGH, M6.0-6.9 = MEDIUM, <6.0 = LOW
  let severity
  if (mag >= 7.0)      severity = 'HIGH'
  else if (mag >= 6.0) severity = 'MEDIUM'
  else                 severity = 'LOW'

  const isHighImpact = mag >= 6.5 || (mag >= 5.5 && isCriticalRegion(place))
  const infra = mag >= 6.5
    ? 'High risk of infrastructure damage, port closures, and road disruption in the affected region.'
    : 'Potential for localised disruption. Monitor aftershock sequence and freight partner comms.'

  return {
    id:        `eq_${feature.id}`,
    title:     `M${mag.toFixed(1)} Earthquake -- ${place}`,
    type:      'Risk',
    severity,
    desc:      `Magnitude ${mag.toFixed(1)} seismic event recorded near ${place} (${timeLabel}${depthStr}). ${infra}`,
    mitigation: 'Confirm shipment status with freight forwarders. Verify port operational status at nearest hub. Pre-qualify alternate routing if primary lane is disrupted.',
    source:    'USGS',
    magnitude: mag,
    place,
    isHighImpact,
    timestamp: quakeTime.toISOString()
  }
}

export async function GET() {
  try {
    // Serve from in-memory cache if still fresh
    if (_cache && Date.now() - _cacheTime < CACHE_MS) {
      return NextResponse.json(_cache)
    }

    const res = await fetch(USGS_URL, {
      headers: { 'User-Agent': 'NAUTILUS-Terminal/1.0 (supply-chain-intelligence)' },
      next:    { revalidate: 1800 }
    })

    if (!res.ok) throw new Error(`USGS responded ${res.status}`)

    const geojson  = await res.json()
    const features = geojson.features || []

    // Only map events >= 5.0 that are either in a critical region or mag >= 6.5
    const risks = features
      .filter(f => {
        const mag = f.properties?.mag ?? 0
        return mag >= 5.0 && (mag >= 6.5 || isCriticalRegion(f.properties?.place))
      })
      .map(earthquakeToRisk)
      .sort((a, b) => b.magnitude - a.magnitude)
      .slice(0, 6) // Cap at 6 to avoid overwhelming the panel

    const payload = {
      risks,
      totalEvents: features.length,
      filtered:    risks.length,
      updated:     new Date().toISOString(),
      source:      'USGS Earthquake Hazards Program'
    }

    _cache     = payload
    _cacheTime = Date.now()

    return NextResponse.json(payload)

  } catch (err) {
    console.error('[/api/earthquakes]', err.message)
    // Return empty risks so the caller falls back cleanly
    return NextResponse.json(
      { risks: [], totalEvents: 0, filtered: 0, error: err.message },
      { status: 200 }
    )
  }
}
