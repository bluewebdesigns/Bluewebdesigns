import { Link } from "react-router"
import { Arrow, RevealLines, useReveals } from "../components/site"
import { CipherReveal } from "../components/CipherReveal"
import modernWebImage from "../assets/modern-web.png"
import growthChartImage from "../assets/growth-chart.png"

const pillars = [
  {
    number: "01",
    title: "Close Collaboration",
    text: "We work directly with you to turn your exact ideas into reality.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="3.2" />
        <circle cx="16.5" cy="10" r="2.4" />
        <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M14 15.4c1.9.4 3.2 1.7 3.7 3.6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Unique & Modern Design",
    text: "No boring templates. We build custom sites that make your brand stand out.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8L12 3Z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Purposeful Work",
    text: "Every page and button is designed with one goal: turning visitors into clients.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Reliable Build",
    text: "Fast loading speeds and clean code that works perfectly on every device.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M12 2 4 5.5v5.7c0 5 3.4 9 8 10.8 4.6-1.8 8-5.8 8-10.8V5.5L12 2Z" />
        <path d="m8.8 12 2.2 2.2 4.2-4.4" />
      </svg>
    ),
  },
]

const heroStats = [
  {
    label: "Conversion-first",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M3 17l5-5 4 4 8-8" />
        <path d="M15 8h5v5" />
      </svg>
    ),
  },
  {
    label: "Custom-built",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
      </svg>
    ),
  },
  {
    label: "Always-on support",
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
]

export default function About() {
  useReveals()

  return (
    <div className="about-scope">
      {/* ── Page hero ────────────────────────── */}
      <section className="page-hero" data-ghost="ABOUT">
        <RevealLines
          as="h1"
          className="page-title"
          lines={[<>Building websites that expand</>, <>your reach and drive <em>real growth.</em></>]}
        />
        <p>
          At Blueweb Designs, we are a dedicated team of skilled designers and developers passionate
          about building some of the highest-performing web experiences in the industry.
        </p>
        <div className="hero-stats">
          {heroStats.map((s) => (
            <span className="hero-stat" key={s.label}>
              {s.icon}
              {s.label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Mission ──────────────────────────── */}
      <section className="showcase-section">
        <div className="showcase-head" data-reveal>
          <h2 className="handle-title">
            <CipherReveal text="Built For The" />
            <br />
            <em><CipherReveal delay={450} text="Modern Web." /></em>
          </h2>
        </div>
        <div className="showcase-mid" data-reveal>
          <p>
            A great website shouldn’t just sit there looking nice—it should bring you new clients.
            We combine clean design with modern tech to help your business reach more people and
            stay ahead.
          </p>
        </div>
        <div className="showcase-media" data-reveal>
          <img alt="Modern website dashboard surrounded by marketing tools" src={modernWebImage} />
        </div>
      </section>

      {/* ── Philosophy ───────────────────────── */}
      <section className="pillars-section" data-ghost="PILLARS">
        <div className="pillar-list">
          {pillars.map((p, i) => (
            <article data-reveal key={p.number} style={{ transitionDelay: `${i * 0.07}s` }}>
              <span>{p.number}</span>
              <h3>
                <span className="pillar-icon">{p.icon}</span>
                {p.title}
              </h3>
              <p>{p.text}</p>
              <i>↗</i>
            </article>
          ))}
        </div>
      </section>

      {/* ── Ideal partners ───────────────────── */}
      <section className="showcase-section alt">
        <div className="showcase-head" data-reveal>
          <h2 className="handle-title">
            <CipherReveal text="Built For" />
            <br />
            <CipherReveal delay={450} text="Growing" />
            <br />
            <em><CipherReveal delay={900} text="Businesses." /></em>
          </h2>
        </div>
        <div className="showcase-mid" data-reveal>
          <p>
            We work with ambitious business owners who want more exposure and want to leverage
            modern technology. If you are ready for a real digital upgrade, we are ready to build it.
          </p>
          <Link className="button button-blue" to="/services">
            See what we do <Arrow />
          </Link>
        </div>
        <div className="showcase-media" data-reveal>
          <img alt="Rising growth chart arrow" src={growthChartImage} />
        </div>
      </section>
    </div>
  )
}
