import { Link } from "react-router"
import { Arrow, RevealLines, useReveals } from "../components/site"
import designImage from "../assets/service-design.png"
import devImage from "../assets/service-dev.png"

const services = [
  {
    tag: "01",
    name: "Strategic UI/UX & Web Design",
    image: designImage,
    imageAlt: "3D browser window with design tools",
    headline: "Bespoke interfaces designed for conversion.",
    description:
      "We craft modern, visually striking user interfaces tailored specifically to your brand. Beyond aesthetics, we structure every page around user psychology, clear visual hierarchy, and seamless navigation to turn everyday site visitors into paying clients.",
    capabilities: [
      "Custom UI/UX & Interactive Wireframing",
      "Mobile-First & Fully Responsive Layouts",
      "Design Systems & Digital Brand Consistency",
      "Conversion Rate & User Flow Optimization",
    ],
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M12 3 2.5 12 12 21l9.5-9L12 3Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    tag: "02",
    name: "Web Development & Web Applications",
    image: devImage,
    imageAlt: "3D laptop with code and development tools",
    headline: "Clean code, blazingly fast execution.",
    description:
      "We turn complex requirements into high-speed, scalable web solutions. By writing clean, modern code from the ground up, we ensure your website loads instantly, operates securely, and functions flawlessly across every browser and device.",
    capabilities: [
      "Custom Web Application & Portal Development",
      "High-Performance Frontend & Backend Systems",
      "API & Third-Party Service Integrations",
      "Technical SEO & Speed Infrastructure",
    ],
    icon: (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
      </svg>
    ),
  },
]

const process = [
  ["01", "Strategy & Architecture", "We analyze your business goals and plan a clear site map and user journey."],
  ["02", "Design & Prototype", "We build bespoke interactive designs so you can test and approve the look and feel."],
  ["03", "Custom Engineering", "We build out the platform with clean code, testing for speed, security, and responsiveness."],
  ["04", "Launch & Optimization", "We deploy your platform live to the web and ensure smooth performance from day one."],
]

export default function Services() {
  useReveals()

  return (
    <div className="services-scope">
      {/* ── Page hero ────────────────────────── */}
      <section className="page-hero" data-ghost="SERVICES">
        <RevealLines
          as="h1"
          className="page-title"
          lines={[<>Specialized in</>, <em>what we do best.</em>]}
        />
        <p>
          We focus exclusively on web design and custom development—delivering high-performing
          digital platforms engineered to grow your business.
        </p>
      </section>

      {/* ── Interactive service cards ────────── */}
      <section className="service-cards">
        {services.map((service, i) => (
          <article className="service-card" data-reveal key={service.tag} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="service-card-top">
              <span className="service-card-icon">{service.icon}</span>
              <span className="service-card-num">{service.tag}</span>
            </div>
            <h2>{service.name}</h2>
            <h3>{service.headline}</h3>
            <p>{service.description}</p>
            <div className="service-card-media">
              <img alt={service.imageAlt} src={service.image} />
            </div>
            <ul>
              {service.capabilities.map((capability, j) => (
                <li key={capability}>
                  <span>{String(j + 1).padStart(2, "0")}</span>
                  {capability}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* ── 03 / How we deliver ──────────────── */}
      <section className="process">
        <div className="process-intro" data-reveal>
          <RevealLines lines={[<>A clear path from</>, <em>idea to launch.</em>]} />
        </div>
        <div className="process-list">
          {process.map(([number, title, text], i) => (
            <article data-reveal key={number} style={{ transitionDelay: `${i * 0.07}s` }}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
          <div className="process-cta" data-reveal>
            <Link className="button button-blue" to="/work">
              See our work <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
