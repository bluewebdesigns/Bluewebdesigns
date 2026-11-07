import { Arrow, CtaBand, RevealLines, useReveals } from "../components/site"
import famImage from "../assets/projects/fam.webp"
import prenifyImage from "../assets/projects/prenify.webp"
import samrawitImage from "../assets/projects/samrawit.webp"
import tenasImage from "../assets/projects/tenas.webp"

const projects = [
  {
    number: "01",
    name: "Prenify",
    sector: "EdTech",
    description:
      "An automated test-prep platform featuring live exam simulations and integrated local mobile payments built for national exit exams.",
    image: prenifyImage,
    url: "http://212.47.70.245:8081/",
  },
  {
    number: "02",
    name: "FAM Cake & Bakery",
    sector: "Food & Hospitality",
    description:
      "A clean, image-driven website showcasing fresh baked goods daily with an interactive menu and location finder.",
    image: famImage,
    url: "https://famcakeandbakery.et/",
  },
  {
    number: "03",
    name: "Samrawit Foundation",
    sector: "Non-profit",
    description:
      "A trust-focused web portal built to highlight community outreach programs, share stories, and streamline online donations.",
    image: samrawitImage,
    url: "https://samrawitfoundation.org.et/",
  },
  {
    number: "04",
    name: "Tenas Gym & Spa",
    sector: "Fitness & Wellness",
    description:
      "A high-impact dark-mode site built to highlight membership tiers, facilities, and convert web visitors into active members.",
    image: tenasImage,
    url: "https://tenasgymandspa.com.et/",
  },
]

export default function Work() {
  useReveals()

  return (
    <div className="work-scope">
      {/* ── Page hero ────────────────────────── */}
      <section className="page-hero" data-ghost="WORK">
        <RevealLines
          as="h1"
          className="page-title"
          lines={[<>Some of the works</>, <em>we’ve done.</em>]}
        />
        <p>Digital products that pair strong identities with seamless, useful experiences.</p>
      </section>

      {/* ── Project showcase grid ────────────── */}
      <section className="work-grid-section">
        <div className="work-grid">
          {projects.map((project, i) => (
            <article data-reveal key={project.name} style={{ transitionDelay: `${(i % 2) * 0.08}s` }}>
              <a
                aria-label={`Explore ${project.name} live`}
                className="work-visual"
                href={project.url}
                rel="noreferrer"
                target="_blank"
              >
                <div className="imac">
                  <div className="imac-screen">
                    <img alt={`${project.name} website home page`} src={project.image} />
                  </div>
                  <div className="imac-chin">
                    <span className="imac-dot" />
                  </div>
                </div>
                <div aria-hidden="true" className="imac-stand">
                  <span className="imac-neck" />
                  <span className="imac-foot" />
                </div>
                <span className="work-veil">
                  View live <Arrow diagonal />
                </span>
              </a>
              <div className="work-meta">
                <span className="work-tag">{project.sector}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a className="text-link" href={project.url} rel="noreferrer" target="_blank">
                  Explore Live Project <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <CtaBand
        sub="Tell us where your business is headed and we’ll build the site that gets you there."
        tag="Your project"
        title="Like what you see? Let’s build yours next."
      />
    </div>
  )
}
