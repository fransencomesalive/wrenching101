import { NextRequest, NextResponse } from 'next/server'

// Required env vars:
//   KV_REST_API_URL: from Vercel KV store (vercel env pull after linking)
//   KV_REST_API_TOKEN: from Vercel KV store
//   RESEND_API_KEY: from resend.com (domain noreply@mettlecycling.com must be verified)

type RSVPEntry = {
  name: string
  status: 'going' | 'not-going'
  timestamp: number
}

async function getKv() {
  const { kv } = await import('@vercel/kv')
  return kv
}

export async function GET() {
  try {
    const kv = await getKv()
    const rsvps = await kv.lrange<RSVPEntry>('wrenching101:rsvps', 0, -1)
    return NextResponse.json(rsvps ?? [])
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  if (
    !body ||
    typeof body.name !== 'string' ||
    !['going', 'not-going'].includes(body.status)
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const entry: RSVPEntry = {
    name: body.name.trim().slice(0, 100),
    status: body.status,
    timestamp: Date.now(),
  }

  // Persist to KV
  try {
    const kv = await getKv()
    await kv.rpush('wrenching101:rsvps', entry)
  } catch {
    // KV not configured; continue to email
  }

  // Email notification via Resend
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    const label = entry.status === 'going' ? 'Going' : 'Not going'
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Wrenching 101 <noreply@mettlecycling.com>',
        to: ['randall@mettlecycling.com'],
        subject: `Wrenching 101 RSVP: ${entry.name}, ${label}`,
        html: `<p><strong>${entry.name}</strong> responded: <strong>${label}</strong></p><p style="color:#666;font-size:13px;">Submitted ${new Date(entry.timestamp).toLocaleString()}</p>`,
      }),
    }).catch(() => { /* non-blocking */ })
  }

  return NextResponse.json({ ok: true })
}
