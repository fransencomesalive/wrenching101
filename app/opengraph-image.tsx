import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const alt = 'Wrenching 101 — Mettle Cycling'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BUTTON_IDS = [
  'Stack-button', 'Reach-button', 'ForkOffest-button', 'FrontCenter-button',
  'STangle-button', 'HTangle-button', 'EffTT-button', 'HTLength-button',
  'Wheelbase-button', 'Trail-button', 'Chainstay-button', 'BBdrop-button',
]

export default function OGImage() {
  let svgText = readFileSync(join(process.cwd(), 'public/diagrams/BikeGeo-chart.svg'), 'utf-8')

  BUTTON_IDS.forEach(id => {
    svgText = svgText.replace(`id="${id}"`, `id="${id}" display="none"`)
  })

  const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`

  const gothamMedium = readFileSync(join(process.cwd(), 'public/fonts/Gotham-Medium.otf'))
  const newAthletic  = readFileSync(join(process.cwd(), 'public/fonts/New Athletic M54.ttf'))

  // SVG aspect ratio: 1180x800. At 1200px wide: height = 1200 * (800/1180) = 814px.
  // Container is 630px tall — the bottom 184px is cropped, which is below the diagram.
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#011c24',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={svgDataUri}
          width={1200}
          height={814}
          style={{ position: 'absolute', top: -20, left: 0, opacity: 0.9 }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 240,
            background: 'linear-gradient(to top, #011c24 0%, rgba(1,28,36,0.92) 55%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            left: 64,
            right: 64,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: 'NewAthletic',
              fontSize: 56,
              color: '#f5f0e8',
              letterSpacing: 3,
              lineHeight: 1,
            }}
          >
            WRENCHING 101
          </div>
          <div
            style={{
              fontFamily: 'Gotham',
              fontSize: 20,
              color: '#00aac9',
              letterSpacing: 0.3,
              lineHeight: 1.45,
            }}
          >
            An intro for cyclists who ride confidently and wrench... less so. Presented by Mettle Cycling.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Gotham',      data: gothamMedium, style: 'normal', weight: 500 },
        { name: 'NewAthletic', data: newAthletic,  style: 'normal', weight: 400 },
      ],
    }
  )
}
