import { useState, useEffect, useMemo, useRef } from "react"
import { GAP, TARGET_SIZE, GRID_INSET } from "../constants/grid"

const MAX_ANGLE = 22
const RANGE_CELLS = 2.5

function GridSquare({ opaque, onClick, squareRef }) {
  return (
    <div
      ref={squareRef}
      onClick={onClick}
      style={{
        borderRadius: 4,
        background: opaque ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.15)",
        cursor: onClick ? "pointer" : "default",
        pointerEvents: onClick ? "auto" : "none",
        willChange: "transform",
      }}
    />
  )
}

export default function GridBackground({ groups = new Map(), onLogoClick }) {
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
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const { cols, rows, sqW, sqH } = useMemo(() => {
    const innerW = vp.width - 2 * GRID_INSET
    const innerH = vp.height - 2 * GRID_INSET
    const cols = Math.max(1, Math.round((innerW + GAP) / (TARGET_SIZE + GAP)))
    const sqW = (innerW - GAP * (cols - 1)) / cols
    const rows = Math.max(1, Math.round((innerH + GAP) / (sqW + GAP)))
    const sqH = (innerH - GAP * (rows - 1)) / rows
    return { cols, rows, sqW, sqH }
  }, [vp])

  const opaqueMap = useMemo(() => {
    const map = new Map()
    const inRow = cols >= 9
    const loW = inRow ? 9 : 3
    const loH = inRow ? 1 : 3

    groups.forEach(({ x, y }, id) => {
      const startCol = Math.max(0, Math.min(x - 1, cols - loW))
      const startRow = Math.max(0, Math.min(y - 1, rows - loH))
      for (let r = 0; r < loH; r++)
        for (let c = 0; c < loW; c++)
          map.set((startRow + r) * cols + startCol + c, id)
    })

    return map
  }, [groups, cols, rows])

  const gridRef = useRef(null)
  const squaresRef = useRef([])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    let gridRect = grid.getBoundingClientRect()
    const updateRect = () => { gridRect = grid.getBoundingClientRect() }
    window.addEventListener("resize", updateRect)

    const avgSq = (sqW + sqH) / 2
    const maxDist = RANGE_CELLS * (avgSq + GAP)

    let rafId = null
    let lastX = -9999
    let lastY = -9999

    const applyTilts = (mx, my) => {
      const squares = squaresRef.current
      for (let i = 0; i < squares.length; i++) {
        const el = squares[i]
        if (!el) continue
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = col * (sqW + GAP) + sqW / 2
        const cy = row * (sqH + GAP) + sqH / 2
        const dx = mx - cx
        const dy = my - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDist) {
          const t = 1 - dist / maxDist
          const factor = t * t
          const angle = Math.atan2(dy, dx)
          const rotY = Math.cos(angle) * MAX_ANGLE * factor
          const rotX = Math.sin(angle) * MAX_ANGLE * factor
          const scale = 1 - 0.15 * factor
          el.style.transition = "transform 0.08s ease-out"
          el.style.transform = "perspective(500px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) scale(" + scale + ")"
        } else if (el.style.transform !== "") {
          el.style.transition = "transform 0.45s ease-out"
          el.style.transform = ""
        }
      }
    }

    const onMove = (e) => {
      lastX = e.clientX - gridRect.left
      lastY = e.clientY - gridRect.top
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        applyTilts(lastX, lastY)
      })
    }

    const onLeave = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null }
      squaresRef.current.forEach(el => {
        if (!el) return
        el.style.transition = "transform 0.45s ease-out"
        el.style.transform = ""
      })
    }

    window.addEventListener("mousemove", onMove)
    document.documentElement.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("resize", updateRect)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [cols, rows, sqW, sqH])

  return (
    <div
      ref={gridRef}
      style={{
        position: "fixed",
        inset: GRID_INSET + "px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(" + cols + ", " + sqW + "px)",
        gridAutoRows: sqH + "px",
        gap: GAP + "px",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <GridSquare
          key={i}
          opaque={opaqueMap.has(i)}
          squareRef={(el) => { squaresRef.current[i] = el }}
          onClick={
            opaqueMap.has(i) && onLogoClick
              ? () => onLogoClick(opaqueMap.get(i), i % cols + 1, Math.floor(i / cols) + 1)
              : null
          }
        />
      ))}
    </div>
  )
}