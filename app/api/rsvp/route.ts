import { NextRequest, NextResponse } from 'next/server'
import { put, get } from '@vercel/blob'

// Required env vars:
//   BLOB_READ_WRITE_TOKEN: from Vercel Blob store (set automatically when store is linked)
//   RESEND_API_KEY: from resend.com (domain noreply@mettlecycling.com must be verified)

type RSVPEntry = {
  name: string
  status: 'going' | 'not-going'
  timestamp: number
}

const BLOB_PATH = 'rsvps.json'

async function readRsvps(): Promise<RSVPEntry[]> {
  try {
    const result = await get(BLOB_PATH, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      useCache: false,
    })
    if (!result) return []
    const text = await new Response(result.stream).text()
    return JSON.parse(text)
  } catch {
    return []
  }
}

async function writeRsvps(entries: RSVPEntry[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(entries), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
}

export async function GET() {
  const rsvps = await readRsvps()
  return NextResponse.json(rsvps)
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

  const current = await readRsvps()
  await writeRsvps([...current, entry])

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
