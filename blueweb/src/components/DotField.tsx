import { useEffect, useRef } from "react"

/* Interactive dot grid: dots near the cursor bulge outward and glow.
   Low opacity so it never clashes with the lettering. */
export function DotField({
  dotRadius = 1.2,
  dotSpacing = 16,
  cursorRadius = 260,
  cursorForce = 0.04,
  bulgeStrength = 26,
  glowRadius = 120,
}: {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  cursorForce?: number
  bulgeStrength?: number
  glowRadius?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Dark mode gets +0.2 brightness on both states
    const dark = document.documentElement.dataset.theme === "dark"
    const baseAlpha = dark ? 0.2 : 0.22
    const hoverAlpha = dark ? 0.8 : 0.6

    let raf = 0
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let dots: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = []
    const mouse = { x: -9999, y: -9999, active: false }

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = dotSpacing / 2; y < h; y += dotSpacing) {
        for (let x = dotSpacing / 2; x < w; x += dotSpacing) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
        }
      }
    }

    const ink = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--blue").trim() || "#0061fe"

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      const color = ink()
      const r2 = cursorRadius * cursorRadius

      for (const d of dots) {
        // cursor bulge
        if (mouse.active) {
          const dx = d.ox - mouse.x
          const dy = d.oy - mouse.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < r2) {
            const dist = Math.sqrt(dist2) || 1
            const f = (1 - dist / cursorRadius) ** 2 * bulgeStrength * cursorForce
            d.vx += (dx / dist) * f
            d.vy += (dy / dist) * f
          }
        }
        // spring back + damping
        d.vx += (d.ox - d.x) * 0.06
        d.vy += (d.oy - d.y) * 0.06
        d.vx *= 0.86
        d.vy *= 0.86
        d.x += d.vx
        d.y += d.vy

        // glow when displaced
        const disp = Math.min(Math.hypot(d.x - d.ox, d.y - d.oy) / (glowRadius * 0.12), 1)
        const size = dotRadius * (1 + disp * 0.8)
        ctx.globalAlpha = baseAlpha + disp * (hoverAlpha - baseAlpha)
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    step()
    const ro = new ResizeObserver(build)
    ro.observe(canvas.parentElement!)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeStrength, glowRadius])

  return <canvas aria-hidden="true" className="dot-field" ref={canvasRef} />
}
