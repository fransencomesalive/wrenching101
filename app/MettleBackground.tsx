'use client'

import { useEffect, useRef } from 'react'
import styles from './wrenching101.module.css'

type MeshDef = { hex: string; rMin: number; rMax: number; a0: string }

const MESH_DEFS: MeshDef[] = [
  { hex: '#00aac9', rMin: 0.55, rMax: 0.75, a0: 'dd' },
  { hex: '#016a7d', rMin: 0.20, rMax: 0.30, a0: '66' },
  { hex: '#00899e', rMin: 0.38, rMax: 0.52, a0: '99' },
  { hex: '#c45e1a', rMin: 0.50, rMax: 0.68, a0: 'cc' },
  { hex: '#d48728', rMin: 0.52, rMax: 0.70, a0: 'cc' },
  { hex: '#7c3a10', rMin: 0.18, rMax: 0.28, a0: '55' },
  { hex: '#fcba4b', rMin: 0.48, rMax: 0.65, a0: 'cc' },
  { hex: '#013d4a', rMin: 0.15, rMax: 0.25, a0: '44' },
]

type MeshNode = {
  x: number
  y: number
  vx: number
  vy: number
  hex: string
  a0: string
  r: number
}

function initMeshNodes(): MeshNode[] {
  return MESH_DEFS.map((def) => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00025,
    vy: (Math.random() - 0.5) * 0.00025,
    hex: def.hex,
    a0: def.a0,
    r: def.rMin + Math.random() * (def.rMax - def.rMin),
  }))
}

function drawMesh(ctx: CanvasRenderingContext2D, nodes: MeshNode[], width: number, height: number) {
  ctx.fillStyle = '#011c24'
  ctx.fillRect(0, 0, width, height)

  nodes.forEach((node) => {
    const cx = node.x * width
    const cy = node.y * height
    const radius = node.r * Math.max(width, height)
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)

    gradient.addColorStop(0, node.hex + node.a0)
    gradient.addColorStop(0.55, node.hex + '55')
    gradient.addColorStop(1, node.hex + '00')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  })
}

export default function MettleBackground() {
  const bgRef = useRef<HTMLCanvasElement>(null)
  const grainRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const bgCanvas = bgRef.current
    const grainCanvas = grainRef.current

    if (!bgCanvas || !grainCanvas) return

    const bgCtx = bgCanvas.getContext('2d')
    const grainCtx = grainCanvas.getContext('2d')

    if (!bgCtx || !grainCtx) return

    const meshNodes = initMeshNodes()

    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight
    let pixelWidth = 0
    let pixelHeight = 0
    let grainImage = grainCtx.createImageData(1, 1)
    let grainCount = 0
    let frame = 0
    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1

      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      pixelWidth = Math.floor(viewportWidth * dpr)
      pixelHeight = Math.floor(viewportHeight * dpr)

      bgCanvas.width = viewportWidth
      bgCanvas.height = viewportHeight
      grainCanvas.width = pixelWidth
      grainCanvas.height = pixelHeight
      grainCanvas.style.width = `${viewportWidth}px`
      grainCanvas.style.height = `${viewportHeight}px`

      grainImage = grainCtx.createImageData(pixelWidth, pixelHeight)
      grainCount = Math.floor(pixelWidth * pixelHeight * 0.02)
      drawMesh(bgCtx, meshNodes, viewportWidth, viewportHeight)
    }

    const tick = () => {
      frame += 1

      if (frame % 2 === 0) {
        meshNodes.forEach((node) => {
          node.x += node.vx
          node.y += node.vy

          if (node.x < 0.05 || node.x > 0.95) node.vx *= -1
          if (node.y < 0.05 || node.y > 0.95) node.vy *= -1
        })

        drawMesh(bgCtx, meshNodes, viewportWidth, viewportHeight)
      }

      if (frame % 3 === 0) {
        const data = grainImage.data
        data.fill(0)

        for (let i = 0; i < grainCount; i += 1) {
          const base = ((Math.random() * pixelHeight | 0) * pixelWidth + (Math.random() * pixelWidth | 0)) * 4
          data[base] = 255
          data[base + 1] = 225
          data[base + 2] = 160
          data[base + 3] = 90
        }

        grainCtx.putImageData(grainImage, 0, 0)
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <canvas ref={bgRef} className={styles.bgCanvas} aria-hidden="true" />
      <canvas ref={grainRef} className={styles.grainCanvas} aria-hidden="true" />
    </>
  )
}
