'use client'

import { useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function HeadlineAutosize() {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    function fit() {
      const h1 = h1Ref.current
      if (!h1) return
      const parent = h1.parentElement
      if (!parent) return
      const containerWidth = parent.offsetWidth
      if (!containerWidth) return

      h1.style.fontSize = '200px'
      const textWidth = h1.scrollWidth
      if (!textWidth) return
      h1.style.fontSize = `${(200 * containerWidth / textWidth).toFixed(2)}px`
    }

    fit()
    document.fonts.ready.then(fit)
    const ro = new ResizeObserver(fit)
    const parent = h1Ref.current?.parentElement
    if (parent) ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  return (
    <h1 className={styles.headline} ref={h1Ref}>
      <span className={styles.titleText}>Wrenching 101</span>
      <span className={styles.titleShadowStrong} aria-hidden="true">Wrenching 101</span>
      <span className={styles.titleShadowSoft} aria-hidden="true">Wrenching 101</span>
    </h1>
  )
}
