import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
import { rateLimit } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

const TERMINAL_URL = 'https://nautilus-terminal.vercel.app/terminal'

const welcomeEmailHtml = (email) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to NAUTILUS Terminal</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">

      <!-- Logo -->
      <tr><td style="padding-bottom:28px;">
        <span style="font-size:26px;font-weight:900;letter-spacing:-0.05em;color:#0EA5E9;">NAUTILUS</span>
        <span style="font-size:11px;font-family:'Courier New',monospace;letter-spacing:0.16em;text-transform:uppercase;color:#94A3B8;margin-left:12px;">Terminal</span>
      </td></tr>

      <!-- Card -->
      <tr><td style="background:#ffffff;border-radius:16px;border:1px solid #E2E8F0;padding:40px;">

        <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:#0EA5E9;">// Early Access Granted</p>
        <h1 style="margin:0 0 16px;font-size:30px;font-weight:800;letter-spacing:-0.03em;color:#0F172A;line-height:1.15;">You're in.</h1>
        <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.75;">Welcome to NAUTILUS Terminal -- a live intelligence platform built for procurement and supply chain professionals. Your access is active now.</p>

        <!-- CTA button -->
        <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr><td style="background:linear-gradient(135deg,#0EA5E9,#1D4ED8);border-radius:100px;">
            <a href="${TERMINAL_URL}" style="display:inline-block;padding:15px 36px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:-0.01em;">Open NAUTILUS Terminal &rarr;</a>
          </td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #E2E8F0;margin:0 0 28px;" />

        <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#0F172A;text-transform:uppercase;letter-spacing:0.06em;">What you can do from day one</p>

        <table cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding-bottom:14px;vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td>
          <td style="padding-bottom:14px;font-size:13px;color:#475569;line-height:1.65;">Scan any product in plain language -- NAUTILUS maps global sourcing hubs, names real suppliers, and pulls live UN Comtrade export data.</td></tr>

          <tr><td style="padding-bottom:14px;vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td>
          <td style="padding-bottom:14px;font-size:13px;color:#475569;line-height:1.65;">Monitor 92,000+ live fire hotspots, M4.5+ earthquakes, and 15 conflict zones -- overlaid on your sourcing geography automatically.</td></tr>

          <tr><td style="padding-bottom:14px;vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td>
          <td style="padding-bottom:14px;font-size:13px;color:#475569;line-height:1.65;">Instant compliance: OFAC sanctions, ECCN classification, Section 301 tariffs, and FTA eligibility -- checked at the point of sourcing.</td></tr>

          <tr><td style="vertical-align:top;width:14px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#0EA5E9;margin-top:5px;"></span></td>
          <td style="font-size:13px;color:#475569;line-height:1.65;">Export a PDF mission brief, supplier RFQ, and total landed cost model in one click.</td></tr>
        </table>

        <!-- URL box -->
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;">
          <tr><td style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px 18px;">
            <p style="margin:0 0 16px;font-size:12px;color:#64748B;">📬 If you don't see this email, check your <strong>spam or promotions folder</strong> and mark it as Not Spam.</p>
            <p style="margin:0 0 5px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#94A3B8;">Bookmark this</p>
            <a href="${TERMINAL_URL}" style="font-family:'Courier New',monospace;font-size:12px;color:#0EA5E9;text-decoration:none;word-break:break-all;">${TERMINAL_URL}</a>
          </td></tr>
        </table>

      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:24px 0;text-align:center;">
        <p style="margin:0;font-size:11px;color:#94A3B8;">&copy; 2026 NAUTILUS Terminal &nbsp;&middot;&nbsp; ${email}</p>
        <p style="margin:6px 0 0;font-size:10px;color:#CBD5E1;">You received this because you requested early access.</p>
        <hr style="margin: 32px 0; border-color: #334155; border-style: solid; border-width: 1px 0 0 0;">
        <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">
          You're receiving this because you signed up for the NAUTILUS Terminal waitlist.<br>
          To unsubscribe, <a href="mailto:legal@nautilus-terminal.com?subject=Unsubscribe&body=Please remove me from the NAUTILUS waitlist." style="color: #06b6d4;">click here</a> or email legal@nautilus-terminal.com with subject "Unsubscribe".<br>
          NAUTILUS Intelligence &middot; United States
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
`

export async function POST(request) {
  const rl = await rateLimit(request, { limit: 5, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  try {
    const body = await request.json()
    const email = body?.email?.trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'NAUTILUS Terminal <onboarding@resend.dev>',
      to: email,
      subject: 'Your NAUTILUS Terminal access is ready',
      html: welcomeEmailHtml(email),
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Notify admin -- failure here must NOT affect the user's response
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || ''
    if (adminEmail) {
      try {
        const safeEmail = email.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        await resend.emails.send({
          from: 'NAUTILUS Terminal <onboarding@resend.dev>',
          to: adminEmail,
          subject: `New NAUTILUS signup: ${safeEmail}`,
          html: `<p style="font-family:monospace;font-size:14px;color:#333">New early access request:<br><br><strong>${safeEmail}</strong><br><br>${new Date().toUTCString()}</p>`,
        })
      } catch (notifyErr) {
        console.error('Admin notification failed (user email already sent):', notifyErr)
      }
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
