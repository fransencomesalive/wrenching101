import { NextRequest, NextResponse } from 'next/server'
import { put, get } from '@vercel/blob'

// Required env var:
//   BLOB_READ_WRITE_TOKEN: set automatically when the Vercel Blob store is linked

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

  return NextResponse.json({ ok: true })
}
