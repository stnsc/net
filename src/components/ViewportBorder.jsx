import { useState, useEffect } from 'react'
import { BORDER_INSET, CORNER_CUT } from '../constants/grid'

export default function ViewportBorder() {
  const [vp, setVp] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  useEffect(() => {
    let rafId
    const onResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() =>
        setVp({ width: window.innerWidth, height: window.innerHeight })
      )
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const { width: W, height: H } = vp
  const I = BORDER_INSET
  const C = CORNER_CUT

  // Top-left chamfer + right-angle TR + right-angle BL + bottom-right chamfer.
  // Z closes from (I, I+C) back to (I+C, I), drawing the TL diagonal line.
  const d = `M ${I + C} ${I} H ${W - I} V ${H - I - C} L ${W - I - C} ${H - I} H ${I} V ${I + C} Z`

  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      <path d={d} fill="none" stroke="var(--text-h)" strokeWidth="1" />
    </svg>
  )
}
