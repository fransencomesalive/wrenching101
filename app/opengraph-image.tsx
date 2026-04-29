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

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#011c24',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={svgDataUri} width={1200} height={814} />
      </div>
    ),
    { ...size }
  )
}
