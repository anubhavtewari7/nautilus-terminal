// /api/notify -- called by the Nautilus Intelligence Agent after each hourly push.
// Fetches the latest market-intelligence.json from GitHub (always fresh after push),
// builds a digest email, and sends it via Resend.
// Protected by NOTIFY_SECRET env var -- agent passes Authorization: Bearer <SECRET> header.

import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const GITHUB_RAW = process.env.GITHUB_MARKET_INTEL_URL || 'https://raw.githubusercontent.com/anubhavtewari7/nautilus-terminal/main/public/market-intelligence.json';
// Recipient -- set NOTIFY_TO or ADMIN_NOTIFY_EMAIL in Vercel env vars
const TO = process.env.NOTIFY_TO || process.env.ADMIN_NOTIFY_EMAIL || '';

// Escape HTML special characters to prevent injection in email body
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Validate that a string is a safe https:// URL before using it as an href
function safeHref(url) {
  try {
    const u = new URL(String(url ?? ''))
    return u.protocol === 'https:' ? u.href : null
  } catch { return null }
}

export async function GET(request) {
  // Rate limit before auth check so we don't burn CPU on brute-force auth attempts
  const rl = await rateLimit(request, { limit: 20, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  // Auth via Authorization header (not URL param -- URL params end up in logs)
  const authHeader = request.headers.get('Authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token || token !== process.env.NOTIFY_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Guard RESEND_API_KEY before doing any work
  if (!process.env.RESEND_API_KEY) {
    console.error('[/api/notify] RESEND_API_KEY not configured');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  // Guard recipient address
  if (!TO) {
    console.warn('[/api/notify] No recipient configured (NOTIFY_TO / ADMIN_NOTIFY_EMAIL not set) -- skipping send');
    return NextResponse.json({ ok: true, skipped: true, reason: 'No recipient configured' });
  }

  // Fetch the latest intelligence data straight from GitHub raw
  let data;
  try {
    const res = await fetch(GITHUB_RAW, { cache: 'no-store' });
    if (!res.ok) throw new Error(`GitHub raw fetch failed: ${res.status}`);
    data = await res.json();
  } catch (err) {
    return NextResponse.json({ error: `Failed to fetch intelligence: ${err.message}` }, { status: 502 });
  }

  const alerts = data.alerts || [];
  const high   = alerts.filter(a => a.severity === 'HIGH');
  const medium = alerts.filter(a => a.severity === 'MEDIUM');
  const ts     = new Date(data.lastUpdated).toUTCString().replace(' GMT', ' UTC');

  // Build HIGH alert list HTML (all dynamic content escaped)
  const highHtml = high.slice(0, 5).map(a => {
    const href = safeHref(a.source)
    const srcLink = href ? ` <a href="${href}" style="color:#38bdf8;font-size:11px">[source]</a>` : '';
    return `<li style="margin-bottom:10px">
      <span style="background:#7f1d1d;color:#fca5a5;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:4px;text-transform:uppercase">${esc(a.type)}</span>
      <strong style="display:block;margin-top:4px;color:#f8fafc">${esc(a.title)}</strong>
      <span style="color:#94a3b8;font-size:12px">${esc(a.summary)}</span>${srcLink}
    </li>`;
  }).join('') || '<li style="color:#64748b">No HIGH severity alerts this hour.</li>';

  // Build commodity notes HTML
  const commHtml = (data.commodityNotes || []).slice(0, 5).map(c => {
    const arrow = c.direction === 'UP' ? '&#9650;' : c.direction === 'DOWN' ? '&#9660;' : '--';
    const color = c.direction === 'UP' ? '#4ade80' : c.direction === 'DOWN' ? '#f87171' : '#94a3b8';
    return `<tr>
      <td style="padding:6px 8px;color:#cbd5e1;font-size:12px">${esc(c.commodity)}</td>
      <td style="padding:6px 8px;font-weight:bold;font-size:13px;color:${color}">${arrow}</td>
      <td style="padding:6px 8px;color:#94a3b8;font-size:11px">${esc(c.driver || '')}</td>
    </tr>`;
  }).join('');

  const subject = `Nautilus Terminal -- ${high.length} HIGH, ${medium.length} MEDIUM alerts | ${ts}`;

  const html = `
<div style="font-family:monospace;max-width:620px;background:#0a0a0a;color:#e2e8f0;padding:28px;border-radius:12px">
  <h2 style="color:#38bdf8;margin:0 0 4px;font-size:18px">Nautilus Intelligence Agent</h2>
  <p style="color:#475569;font-size:11px;margin:0 0 24px">${ts}</p>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <tr>
      <td style="padding:14px;background:#1e293b;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#f87171">${high.length}</div>
        <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;margin-top:2px">HIGH</div>
      </td>
      <td style="width:10px"></td>
      <td style="padding:14px;background:#1e293b;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#fb923c">${medium.length}</div>
        <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;margin-top:2px">MEDIUM</div>
      </td>
      <td style="width:10px"></td>
      <td style="padding:14px;background:#1e293b;border-radius:8px;text-align:center">
        <div style="font-size:28px;font-weight:bold;color:#94a3b8">${alerts.length}</div>
        <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;margin-top:2px">TOTAL</div>
      </td>
    </tr>
  </table>

  <h3 style="color:#f87171;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">High Severity Alerts</h3>
  <ul style="margin:0 0 24px;padding-left:18px;line-height:1.8">${highHtml}</ul>

  ${commHtml ? `
  <h3 style="color:#38bdf8;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">Commodity Movements</h3>
  <table style="width:100%;border-collapse:collapse;background:#1e293b;border-radius:8px;margin-bottom:24px;overflow:hidden">
    ${commHtml}
  </table>` : ''}

  <a href="https://nautilus-terminal.vercel.app/terminal"
     style="display:inline-block;background:#38bdf8;color:#000;padding:11px 22px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px">
    Open Nautilus Terminal
  </a>

  <p style="margin:20px 0 0;font-size:10px;color:#334155">
    Sent automatically by the Nautilus Intelligence Agent -- runs every hour while the Nautilus app is open.
  </p>
</div>`;

  // Send via Resend
  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Nautilus Agent <onboarding@resend.dev>',
      to: [TO],
      subject,
      html,
    }),
  });

  if (!resendRes.ok) {
    console.error('[/api/notify] Resend HTTP error:', resendRes.status);
    return NextResponse.json({ error: 'Failed to send notification email' }, { status: 502 });
  }

  const resendData = await resendRes.json();
  return NextResponse.json({
    ok: true,
    emailId: resendData.id,
    alertCount: alerts.length,
    highCount: high.length,
  });
}
