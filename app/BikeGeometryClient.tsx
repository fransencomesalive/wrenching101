'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './BikeGeometryDiagram.module.css'

// ── Measurement map ────────────────────────────────────────────────────────────
type GeoTable = { road: string; gravel: string; cx: string }
const PARTS: Record<string, { letter: string; dim?: string; dotted?: string[]; desc: string; table?: GeoTable }> = {
  Stack:       { letter: 'A', dim: 'Stack-dim',       dotted: ['EffTT-dotted'],                                       desc: 'Stack is the vertical height from the center of the bottom bracket up to the top of the head tube. A higher stack puts you in a more upright position.',                                                                                                              table: { road: '515–591 mm', gravel: '530–634 mm', cx: '526–597 mm' } },
  Reach:       { letter: 'B', dim: 'Reach-dim',       dotted: ['Stack-dim'],                                         desc: 'Reach is the horizontal distance from the center of the bottom bracket to the top of the head tube. More reach means a longer, more stretched-out position.',                                                                                                   table: { road: '374–402 mm', gravel: '379–415 mm', cx: '379–405 mm' } },
  ForkOffest:  { letter: 'C', dotted: ['forkoffset-dotted', 'HTangle-dotted'],                                        desc: 'Fork rake (offset) is the perpendicular distance between the front axle and the steering axis. It directly affects trail and, in turn, how the bike handles at speed.',                                                                                          table: { road: '40–55 mm',   gravel: '46–55 mm',   cx: '45–50 mm'   } },
  Trail:       { letter: 'D', dim: 'Trail-dim',       dotted: ['wheelbase2-dotted', 'HTangle-dotted'],                desc: 'Trail is the horizontal distance between where the steering axis hits the ground and where the front axle projects to the ground. More trail means more self-correction and stability; less trail means lighter, quicker steering.',                             table: { road: '55–61 mm',   gravel: '58–71 mm',   cx: '62–71 mm'   } },
  STangle:     { letter: 'F', dim: 'seattubeangle',   dotted: ['seattube-dotted', 'wheelbase-dotted'],                desc: 'Seat tube angle is measured from horizontal. A steeper angle (more vertical) shifts your weight forward over the pedals, common on climbing and TT bikes.',                                                                                                     table: { road: '73–74.5°',   gravel: '73–75°',     cx: '73.2–74.5°' } },
  HTangle:     { letter: 'H', dim: 'HTangle-dim',     dotted: ['HTangle-dotted', 'wheelbase-dotted'],                 desc: 'Head tube angle is measured from horizontal. A slacker angle (lower number) gives more stable, slower steering. A steeper angle makes the steering quicker and more responsive.',                                                                              table: { road: '72–73.8°',   gravel: '69–72°',     cx: '71–72.5°'   } },
  HTLength:    { letter: 'G', dim: 'HTlength-dim',                                                                    desc: 'Head tube length determines how much stack height comes from the frame itself versus from spacers and stem rise. Longer head tubes suit more upright riders.',                                                                                                  table: { road: '106–184 mm', gravel: '97–188 mm',  cx: '110–170 mm' } },
  EffTT:       { letter: 'I', dim: 'effectiveTT-dim', dotted: ['EffTT-dotted'],                                       desc: 'Effective top tube is the horizontal distance between the seat tube centerline and the head tube centerline, measured at saddle height. It reflects the frame\'s reach independent of seat tube angle.',                                                       table: { road: '526–581 mm', gravel: '542–589 mm', cx: '534–578 mm' } },
  Chainstay:   { letter: 'J', dim: 'Chainstay-dim',                                                                   desc: 'Chainstay length runs from the bottom bracket center to the rear axle center. Shorter chainstays make a bike feel snappier and more responsive. Longer stays improve stability and heel clearance.',                                                          table: { road: '405–413 mm', gravel: '420–435 mm', cx: '425 mm'     } },
  Wheelbase:   { letter: 'K', dim: 'Wheelbase-dim',   dotted: ['wheelbase-dotted', 'wheelbase1-dotted', 'wheelbase2-dotted'], desc: 'Wheelbase is the axle-to-axle distance. Longer wheelbase means more stability at speed and over rough terrain. Shorter wheelbase makes the bike more agile and snappy.',                                                                   table: { road: '968–1,011 mm', gravel: '1,010–1,078 mm', cx: '1,006–1,040 mm' } },
  BBdrop:      { letter: 'L', dim: 'BBdrop-dim',      dotted: ['wheelbase-dotted'],                                   desc: 'Bottom bracket drop is how far the BB center sits below the wheel axle centerline. More drop lowers your center of gravity for stability; less drop gives more ground clearance, which matters on rough terrain.',                                           table: { road: '68–77 mm',   gravel: '72–85 mm',   cx: '60–70 mm'   } },
  FrontCenter: { letter: 'N', dim: 'FrontCenter-dim',                                                                 desc: 'Front centre is the horizontal distance from the bottom bracket to the front axle. It affects weight distribution and toe overlap on frames with short chainstays.',                                                                                           table: { road: '574–611 mm', gravel: '602–651 mm', cx: '588–623 mm' } },
}

const PART_KEYS_BY_LETTER = Object.keys(PARTS).sort((a, b) =>
  PARTS[a].letter.localeCompare(PARTS[b].letter)
)

const ALL_DIM_IDS = Object.values(PARTS).flatMap(p => [
  ...(p.dim    ? [p.dim]    : []),
  ...(p.dotted ?? []),
])

export default function BikeGeometryClient({ svgMarkup }: { svgMarkup: string }) {
  const [active, setActive] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Inject SVG and wire up cursor/hitRects imperatively ──────────────────────
  // Set innerHTML directly so React never re-touches this div on state changes.
  // Guard against StrictMode double-invoke with the `root.innerHTML` check.
  useEffect(() => {
    const root = containerRef.current
    if (!root || root.innerHTML) return

    root.innerHTML = svgMarkup

    ALL_DIM_IDS.forEach(id => {
      const el = root.querySelector(`[id="${id}"]`) as SVGElement | null
      if (el) el.style.opacity = '0'
    })

    // Measure bboxes BEFORE adding hitRects so hitRect padding doesn't skew them
    const bboxes: Record<string, DOMRect> = {}
    Object.keys(PARTS).forEach(part => {
      const btn = root.querySelector(`[id="${part}-button"]`) as SVGGraphicsElement | null
      if (!btn) return
      btn.style.cursor = 'pointer'
      try { bboxes[part] = btn.getBBox() } catch (_) {}
    })

    // Add hitRects after measuring
    Object.keys(PARTS).forEach(part => {
      const btn = root.querySelector(`[id="${part}-button"]`) as SVGGraphicsElement | null
      const bb = bboxes[part]
      if (!btn || !bb) return
      const pad = 6
      const hitRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      hitRect.setAttribute('x',      String(bb.x - pad))
      hitRect.setAttribute('y',      String(bb.y - pad))
      hitRect.setAttribute('width',  String(bb.width  + pad * 2))
      hitRect.setAttribute('height', String(bb.height + pad * 2))
      hitRect.setAttribute('fill', 'transparent')
      hitRect.setAttribute('pointer-events', 'all')
      btn.appendChild(hitRect)
    })

    // ── Mobile column scaling with gap enforcement ────────────────────────────
    // getBBox on these groups returns inflated bounds due to invisible paths,
    // so we use measured SVG x positions and label right-edges directly.
    // All values are in SVG user units (viewBox 0 0 1180 800).
    const COLUMNS: Array<{ parts: string[]; x: number; right: number }> = [
      { parts: ['Stack', 'Reach', 'Trail'],              x: 148, right: 235  },
      { parts: ['ForkOffest', 'FrontCenter', 'Wheelbase'], x: 316, right: 462  },
      { parts: ['STangle', 'HTangle', 'Chainstay'],      x: 529, right: 719  },
      { parts: ['EffTT', 'HTLength', 'BBdrop'],          x: 766, right: 1035 },
    ]
    const SCALE = 1.35
    const GAP   = 24 // SVG user-unit minimum gap between scaled column edges

    function applyMobileScale() {
      if (!root) return
      // Guard on rendered SVG width — reliable across devices and DevTools
      const svgEl = root.querySelector('svg')
      const svgWidth = svgEl?.getBoundingClientRect().width ?? 0
      if (svgWidth > 800) return

      let prevRightEdge = -Infinity

      COLUMNS.forEach(({ parts, x, right }) => {
        const cx    = (x + right) / 2
        const halfW = (right - x) / 2
        const scaledLeft  = cx - halfW * SCALE
        const scaledRight = cx + halfW * SCALE

        const shift = prevRightEdge > scaledLeft
          ? prevRightEdge + GAP - scaledLeft
          : 0

        parts.forEach(part => {
          const btn = root.querySelector(`[id="${part}-button"]`) as SVGGraphicsElement | null
          const bb  = bboxes[part]
          if (!btn || !bb) return
          const bcx = bb.x + bb.width  / 2
          const bcy = bb.y + bb.height / 2
          btn.setAttribute('transform',
            `translate(${shift},0) translate(${bcx},${bcy}) scale(${SCALE}) translate(${-bcx},${-bcy})`
          )
        })

        prevRightEdge = scaledRight + shift
      })
    }

    applyMobileScale()

    const onResize = () => {
      if (!root) return
      Object.keys(PARTS).forEach(part => {
        const btn = root.querySelector(`[id="${part}-button"]`) as SVGGraphicsElement | null
        if (btn) btn.removeAttribute('transform')
      })
      applyMobileScale()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [svgMarkup])

  // ── Handle clicks via React synthetic event, not native addEventListener ─────
  // Functional updater guarantees prev is current state regardless of closures.
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as Node
    const root = containerRef.current
    if (!root) return
    for (const part of Object.keys(PARTS)) {
      const btn = root.querySelector(`[id="${part}-button"]`)
      if (btn && btn.contains(target)) {
        setActive(prev =>
          prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
        )
        return
      }
    }
  }

  // ── Sync layer visibility + button states when active list changes ──────────
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const anyActive = active.length > 0

    // Button states
    Object.keys(PARTS).forEach(part => {
      const isActive = active.includes(part)
      const btn = root.querySelector(`[id="${part}-button"]`) as SVGElement | null
      if (btn) {
        btn.style.opacity    = anyActive ? (isActive ? '1' : '0.3') : '1'
        btn.style.filter     = isActive ? 'drop-shadow(0 0 6px rgba(252,185,74,0.6))' : ''
        btn.style.transition = 'opacity 0.2s ease, filter 0.2s ease'
      }
    })

    // Collect which layer IDs are referenced by any currently-active part.
    // A layer may appear in multiple parts' dotted arrays; process active parts
    // first so a shared layer is never reset by an inactive part iterating after.
    const dimActive   = new Set<string>()
    const dottedActive = new Set<string>()
    active.forEach(part => {
      const { dim, dotted } = PARTS[part]
      if (dim) dimActive.add(dim)
      dotted?.forEach(id => dottedActive.add(id))
    })

    ALL_DIM_IDS.forEach(id => {
      const el = root.querySelector(`[id="${id}"]`) as SVGElement | null
      if (!el) return
      el.style.transition = 'opacity 0.2s ease'
      if (dimActive.has(id))    { el.style.opacity = '1'    }
      else if (dottedActive.has(id)) { el.style.opacity = '0.75' }
      else                      { el.style.opacity = '0'    }
    })
  }, [active])

  const activeByLetter = PART_KEYS_BY_LETTER.filter(p => active.includes(p))

  return (
    <div className={styles.wrapper}>
      <style>{`
        @keyframes bikeFrameGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(0,167,197,0.3));  opacity: 0.52; }
          45%, 55% { filter: drop-shadow(0 0 8px rgba(0,167,197,0.85)) drop-shadow(0 0 18px rgba(0,167,197,0.25)); opacity: 1; }
        }
        .bike-geo-svg #Bike_Frame {
          animation: bikeFrameGlow 4s ease-in-out infinite;
        }
        .bike-geo-svg svg {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      <div className={styles.diagramArea}>
        <p className={styles.intro}>
          Click any element to see its dimension and understand its&nbsp;function.
        </p>
        <div
          className="bike-geo-svg"
          ref={containerRef}
          onClick={handleClick}
        />
      </div>

      <div className={styles.descBar}>
        {activeByLetter.length === 0 ? (
          <p className={styles.descPlaceholder}>Select a measurement</p>
        ) : (
          <div className={styles.descList}>
            {activeByLetter.map(part => (
              <div key={part} className={styles.descGroup}>
                <div className={styles.descItem}>
                  <span className={styles.descLetter}>{PARTS[part].letter}</span>
                  <p className={styles.descText}>{PARTS[part].desc}</p>
                </div>
                {PARTS[part].table && (
                  <table className={styles.geoTable}>
                    <thead>
                      <tr>
                        <th>Road</th>
                        <th>Gravel</th>
                        <th>Cyclocross</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{PARTS[part].table!.road}</td>
                        <td>{PARTS[part].table!.gravel}</td>
                        <td>{PARTS[part].table!.cx}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
