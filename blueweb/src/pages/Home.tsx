import type { ReactNode } from "react"
import { Link } from "react-router"
import { DotField } from "../components/DotField"
import { CipherReveal } from "../components/CipherReveal"
import { Arrow, RevealLines, useReveals } from "../components/site"
import prenifyImage from "../assets/projects/prenify.webp"
import famImage from "../assets/projects/fam.webp"
import tenasImage from "../assets/projects/tenas.webp"
import laptopImage from "../assets/laptop-blueweb.png"
import shopImage from "../assets/shop-247.png"
import icon247 from "../assets/icon-247.png"

const marqueeIcons: Record<string, ReactNode> = {
  Strategy: <svg fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg>,
  "UI/UX Design": <svg fill="none" viewBox="0 0 24 24"><path d="M12 19 5 12l7-7 7 7-7 7Z" /><path d="M12 12 9 9" /></svg>,
  "Web Development": <svg fill="none" viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" /></svg>,
  "Brand Identity": <svg fill="none" viewBox="0 0 24 24"><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8L12 3Z" /></svg>,
  "SEO & Growth": <svg fill="none" viewBox="0 0 24 24"><path d="M3 17l5-5 4 4 8-8" /><path d="M15 8h5v5" /></svg>,
  "Support & Care": <svg fill="none" viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9-9c-1.5-3.4.8-7 4.5-7 2 0 3.5 1.1 4.5 2.7C13 5.1 14.5 4 16.5 4c3.7 0 6 3.6 4.5 7-2 4.4-9 9-9 9Z" /></svg>,
}
const marqueeItems = Object.keys(marqueeIcons)

const heroFeatures = [
  {
    title: "Conversion-first design",
    text: "Every page structured to turn visitors into clients.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
      </svg>
    ),
  },
  {
    title: "Clean, fast engineering",
    text: "Instant loads, secure code, flawless on every device.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
      </svg>
    ),
  },
  {
    title: "Support after launch",
    text: "We stay close, monitor, and optimize as you grow.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M3 17c2.5-6 5.5-9 9-9s6.5 3 9 9" />
        <path d="M12 17V8" />
        <circle cx="12" cy="17" r="2.2" />
      </svg>
    ),
  },
]

export default function Home() {
  useReveals()

  return (
    <>
      {/* ── Hero (pinned wrapper: page holds while the monitor grows) ── */}
      <div className="hero-wrap">
      <section className="hero">
        <DotField />
        <div className="hero-title" data-hero-drift>
          <RevealLines
            as="h1"
            className="hero-h1"
            lines={[<>Sites that</>, <em>perform.</em>]}
          />
          <span className="hero-title-icon icon-tl">
            <svg fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" /></svg>
          </span>
          <span className="hero-title-icon icon-br">
            <svg fill="none" viewBox="0 0 24 24"><rect height="13" rx="2" width="18" x="3" y="4" /><path d="M8 21h8M12 17v4" /></svg>
          </span>
        </div>

        <div className="hero-stage hero-in" style={{ transitionDelay: "0.55s" }}>
          <div className="monitor">
            <div className="monitor-screen">
              <div className="monitor-fader">
                {[prenifyImage, famImage, tenasImage].map((src, i) => (
                  <img alt="" aria-hidden="true" key={i} src={src} style={{ animationDelay: `${i * 7}s` }} />
                ))}
              </div>
            </div>
            <div className="monitor-neck" />
            <div className="monitor-base" />
          </div>

        </div>

        <div className="hero-mid">
          <p>
            We build websites that elevate your brand, keep people engaged and turn visitors
            into customers.
          </p>
          <div className="actions">
            <Link className="button button-blue" to="/contact">
              Contact us <Arrow />
            </Link>
          </div>
        </div>

        <div className="hero-features hero-in" style={{ transitionDelay: "0.75s" }}>
          {heroFeatures.map((feature) => (
            <div className="hero-feature" key={feature.title}>
              <span className="hero-feature-icon">{feature.icon}</span>
              <div>
                <b>{feature.title}</b>
                <span>{feature.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* ── Marquee (gap above keeps the dot effect) ── */}
      <div aria-hidden="true" className="marquee-wrap">
        <DotField />
      </div>
      <div aria-hidden="true" className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {marqueeItems.map((item) => (
                <span key={item}>
                  {marqueeIcons[item]} {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Why us ───────────────────────────── */}
      <section className="showcase-section">
        <DotField />
        <div className="showcase-head" data-reveal>
          <h2 className="handle-title">
            <CipherReveal text="Built On" />
            <br />
            <em><CipherReveal delay={450} text="Purpose." /></em>
          </h2>
          <span className="showcase-icon si-1"><svg fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg></span>
          <span className="showcase-icon si-2"><svg fill="none" viewBox="0 0 24 24"><path d="M12 19 5 12l7-7 7 7-7 7Z" /><path d="M12 12 9 9" /></svg></span>
          <span className="showcase-icon si-3"><svg fill="none" viewBox="0 0 24 24"><path d="M3 17l5-5 4 4 8-8" /><path d="M15 8h5v5" /></svg></span>
        </div>
        <div className="showcase-mid" data-reveal>
          <p>
            We take the time to understand your business, your audience, and your vision before
            writing a single line of code. Every detail is crafted with intention—giving you a
            fast, reliable website that drives real growth.
          </p>
          <Link className="button button-blue" to="/about">
            About us <Arrow />
          </Link>
        </div>
        <div className="showcase-media" data-reveal>
          <img alt="Blueweb Designs loading page on a floating laptop" src={laptopImage} />
        </div>
      </section>

      {/* ── Digital identity ─────────────────── */}
      <section className="showcase-section alt">
        <DotField />
        <div className="showcase-head" data-reveal>
          <h2 className="handle-title">
            <CipherReveal text="Your Digital" />
            <br />
            <em><CipherReveal delay={450} text="Front Door." /></em>
          </h2>
          <span className="showcase-icon si-1"><svg fill="none" viewBox="0 0 24 24"><rect height="14" rx="2" width="18" x="3" y="4" /><path d="M3 9h18" /></svg></span>
          <span className="showcase-icon si-2"><img alt="24/7" src={icon247} /></span>
          <span className="showcase-icon si-3"><svg fill="none" viewBox="0 0 24 24"><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8L12 3Z" /></svg></span>
        </div>
        <div className="showcase-mid" data-reveal>
          <p>
            For most of your customers, your website is where their relationship with your business
            truly begins. It operates 24/7, tells your brand story, and creates the vital first
            impression that turns visitors into paying clients.
          </p>
          <Link className="button button-blue" to="/work">
            <svg className="btn-icon" fill="none" viewBox="0 0 24 24">
              <rect height="14" rx="2" width="18" x="3" y="4" />
              <path d="M3 9h18" />
            </svg>
            See our work <Arrow />
          </Link>
        </div>
        <div className="showcase-media" data-reveal>
          <img alt="Online shop open 24/7 on a phone" src={shopImage} />
        </div>
      </section>

    </>
  )
}
