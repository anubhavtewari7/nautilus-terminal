// /api/missions/route.js -- server-backed mission history per authenticated user.
//
// Storage strategy:
//   Primary  -- Vercel KV (persistent across cold starts, 90-day TTL).
//   Fallback -- In-memory Map (used when KV credentials are absent, e.g. local dev).
//               Missions also persist in localStorage via useMissionHistory, so
//               users experience no data loss between sessions in the fallback case.
//   AUTH     -- When auth is active, missions are scoped per user (email).
//               Without auth, an IP-scoped anonymous bucket is used.
//
// Endpoints:
//   GET  /api/missions          -- list missions for current user
//   POST /api/missions          -- append a mission
//   DELETE /api/missions?id=N   -- remove mission by timestamp id

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { kv } from '@vercel/kv'
import { rateLimit } from '@/lib/rate-limit'
import { MAX_MISSION_HISTORY } from '@/lib/terminal-constants'

// In-memory fallback store. Keyed by user id (email or 'anon').
// Used when KV credentials are unavailable (local dev without .env.local KV vars).
const memStore = new Map()

// KV key namespace per user.
const missionKey = (userId) => `missions:${userId}`

// Read missions for a user — prefers KV, falls back to memStore.
async function getMissions(userId) {
  try {
    const data = await kv.get(missionKey(userId))
    return Array.isArray(data) ? data : []
  } catch {
    return memStore.get(userId) || []
  }
}

// Write missions for a user — prefers KV (90-day TTL), falls back to memStore.
async function saveMissions(userId, missions) {
  try {
    await kv.set(missionKey(userId), missions, { ex: 60 * 60 * 24 * 90 })
    return true
  } catch {
    memStore.set(userId, missions)
    return false
  }
}

async function getUserId(request) {
  // Prefer authenticated session email
  try {
    const { auth } = await import('@/auth')
    const session = await auth()
    if (session?.user?.email) return session.user.email
  } catch {}
  // Fall back to IP-scoped anonymous bucket — prevents cross-user data leakage
  // on the same Vercel instance. Not cryptographically secure but far better
  // than a single shared 'anon' bucket for all users.
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : (request.headers.get('x-real-ip') || 'anon')
  return `anon_${ip.replace(/[^a-zA-Z0-9.:]/g, '_')}`
}

export async function GET(request) {
  const rl = await rateLimit(request, { limit: 30, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  const userId = await getUserId(request)
  const missions = await getMissions(userId)
  return NextResponse.json({
    missions,
    storageBackend: process.env.KV_URL ? 'vercel-kv' : 'memory',
  })
}

export async function POST(request) {
  const rl = await rateLimit(request, { limit: 10, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { query, primaryHub, hubCount, topPartner, directive } = body ?? {}
  if (typeof query !== 'string' || !query.trim() || query.length > 500) {
    return NextResponse.json({ error: 'query must be a non-empty string (max 500 chars)' }, { status: 400 })
  }

  const now = Date.now()
  const mission = {
    id:          now,
    query:       query.trim(),
    timestamp:   now,
    primaryHub:  typeof primaryHub === 'string'  ? primaryHub  : null,
    hubCount:    typeof hubCount   === 'number'   ? hubCount    : 0,
    topPartner:  typeof topPartner === 'string'   ? topPartner  : null,
    directive:   directive ?? null,
  }

  const userId   = await getUserId(request)
  const existing = await getMissions(userId)
  const updated  = [...existing, mission].slice(-MAX_MISSION_HISTORY)
  await saveMissions(userId, updated)

  return NextResponse.json({ mission }, { status: 201 })
}

export async function DELETE(request) {
  const rl = await rateLimit(request, { limit: 20, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  const { searchParams } = new URL(request.url)
  const rawId = searchParams.get('id')
  const id = Number(rawId)
  if (!rawId || !Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Missing or invalid id parameter' }, { status: 400 })
  }

  const userId  = await getUserId(request)
  const updated = (await getMissions(userId)).filter(m => m.id !== id)
  await saveMissions(userId, updated)

  return NextResponse.json({ ok: true })
}
