import { useEffect, useRef, useState } from "react"
import { Link, NavLink, Route, Routes, useLocation } from "react-router"
import Lenis from "lenis"
import { Logo, Mark } from "./components/site"
import { DotField } from "./components/DotField"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Work from "./pages/Work"
import Contact from "./pages/Contact"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
]

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
      onClick={onToggle}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6a8.5 8.5 0 1 0 10.6 10.6Z" />
        </svg>
      )}
    </button>
  )
}

function Header({ menuOpen, setMenuOpen, theme, onToggleTheme }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void; theme: string; onToggleTheme: () => void }) {
  return (
    <header className="header">
      <Logo />
      <nav aria-label="Primary navigation" className={menuOpen ? "nav open" : "nav"}>
        {navItems.filter((item) => item.to !== "/").map((item) => (
          <NavLink
            className={({ isActive }) => `${item.to === "/contact" ? "nav-contact" : ""}${isActive ? " active" : ""}`.trim()}
            end={item.to === "/"}
            key={item.to}
            onClick={() => setMenuOpen(false)}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-right">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <button
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
        className={menuOpen ? "menu open" : "menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <DotField />
      <div className="footer-top">
        <Logo dark />
        <p>Building websites that expand your reach and drive real growth.</p>
        <nav aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Blueweb Designs</span>
        <Link to="/contact">Start a project ↗</Link>
      </div>
    </footer>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light"
    return window.localStorage.getItem("bw-theme") || "light"
  })
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  /* Theme: persist + apply to document */
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem("bw-theme", theme)
  }, [theme])

  /* Preloader — first visit only */
  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1700)
    return () => window.clearTimeout(timer)
  }, [])

  /* Smooth scroll + global scroll effects */
  useEffect(() => {
    if (!loaded) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: !prefersReduced })
    lenisRef.current = lenis

    const header = document.querySelector<HTMLElement>(".header")
    const progress = document.querySelector<HTMLElement>(".scroll-progress span")

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      header?.classList.toggle("scrolled", y > 32)
      if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`

      if (!prefersReduced) {
        const mid = window.innerHeight / 2
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
          const host = img.parentElement
          if (!host) return
          const rect = host.getBoundingClientRect()
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const delta = rect.top + rect.height / 2 - mid
            const speed = Number(img.dataset.parallax) || 0.07
            img.style.transform = `translateY(${delta * -speed}px) scale(1.14)`
          }
        })
        /* Monitor starts tilted at 50%, straightens and grows to max
           while the hero is pinned (page doesn't move yet).
           Spacer (55vh) matches the growth distance — no dead scroll space */
        const monitor = document.querySelector<HTMLElement>(".monitor")
        if (monitor && y < window.innerHeight * 1.5) {
          const p = Math.min(y / (window.innerHeight * 0.55), 1)
          const scale = 0.72 + p * 0.28
          const rx = 24 - p * 24
          const ry = -8 + p * 8
          monitor.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [loaded])

  /* Route change: jump to top, close menu */
  useEffect(() => {
    setMenuOpen(false)
    lenisRef.current?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className={loaded ? "site loaded" : "site"}>
      <div aria-hidden="true" className="preloader">
        <div className="preloader-inner">
          <Mark />
          <div className="preloader-word">
            {"Blueweb".split("").map((ch, i) => (
              <span className="pl-letter" key={`a${i}`} style={{ animationDelay: `${0.15 + i * 0.055}s` }}>
                {ch}
              </span>
            ))}
            <span className="pl-space" />
            {"designs".split("").map((ch, i) => (
              <span className="pl-letter pl-blue" key={`b${i}`} style={{ animationDelay: `${0.6 + i * 0.05}s` }}>
                {ch}
              </span>
            ))}
            <span className="pl-letter pl-blue pl-dot" style={{ animationDelay: "1s" }}>
              .
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="scroll-progress">
        <span />
      </div>

      <Header menuOpen={menuOpen} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} setMenuOpen={setMenuOpen} theme={theme} />

      <main key={location.pathname} className="page-enter">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Services />} path="/services" />
          <Route element={<Work />} path="/work" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Home />} path="*" />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
