import { useEffect, useRef, useState } from "react"

/* CipherReveal — headline decodes out of scrambled characters when it
   scrolls into view; hovering re-scrambles and decodes again. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function CipherReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3"
}) {
  const [display, setDisplay] = useState("")
  const [started, setStarted] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const t = window.setTimeout(scramble, delay)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(frameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  const scramble = () => {
    cancelAnimationFrame(frameRef.current)
    const len = text.length
    const queue = text.split("").map((ch, i) => ({
      ch,
      start: i * 2 + 1,
      end: i * 2 + 8 + Math.floor(Math.random() * 3),
    }))
    let frame = 0
    const step = () => {
      let out = ""
      let done = 0
      for (const q of queue) {
        if (frame >= q.end || q.ch === " ") {
          out += q.ch
          done++
        } else if (frame >= q.start) {
          out += `<span class="cipher-scr">${GLYPHS[Math.floor(Math.random() * GLYPHS.length)]}</span>`
        } else {
          out += " "
        }
      }
      setDisplay(out)
      frame++
      if (done < len) frameRef.current = requestAnimationFrame(step)
      else setDisplay(text)
    }
    frameRef.current = requestAnimationFrame(step)
  }

  return (
    <Tag
      ref={rootRef as any}
      aria-label={text}
      className={`cipher ${className}`}
      dangerouslySetInnerHTML={{ __html: display }}
    />
  )
}
