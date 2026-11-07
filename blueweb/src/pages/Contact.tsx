import { useState, type FormEvent } from "react"
import { Arrow, RevealLines, useReveals } from "../components/site"

export default function Contact() {
  useReveals()
  const [sent, setSent] = useState(false)

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Project enquiry from ${data.get("company")}`)
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nProject: ${data.get("project")}\nLaunch: ${data.get("timeline")}\n\n${data.get("message")}`,
    )
    setSent(true)
    window.location.href = `mailto:bluewebdesigns0.1@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="contact-scope">
      {/* ── 01 / Page header ─────────────────── */}
      <section className="page-hero" data-ghost="CONTACT">
        <RevealLines
          as="h1"
          className="page-title"
          lines={[<>Let’s build something</>, <em>great together.</em>]}
        />
        <p>
          Fill out the project inquiry form below or reach out to us directly—we’re ready to discuss
          your next project.
        </p>
      </section>

      {/* ── 02 / Split contact grid ──────────── */}
      <section className="contact-section">
        <div className="contact-grid">
          <form data-reveal onSubmit={submitForm}>
            <h2 className="form-title">Tell us about your project</h2>
            <div className="field-pair">
              <label>
                <span>01 / Your name</span>
                <input name="name" placeholder="Full name" required />
              </label>
              <label>
                <span>02 / Company</span>
                <input name="company" placeholder="Business / brand name" required />
              </label>
            </div>
            <label>
              <span>03 / Email</span>
              <input name="email" placeholder="email@example.com" required type="email" />
            </label>
            <div className="field-pair">
              <label>
                <span>04 / Project type</span>
                <select defaultValue="" name="project" required>
                  <option disabled value="">
                    Choose one
                  </option>
                  <option>Web Design & UI/UX</option>
                  <option>Web App Development</option>
                  <option>Complete Redesign</option>
                </select>
              </label>
              <label>
                <span>05 / Timeline</span>
                <input name="timeline" placeholder="Desired launch date / timeline" />
              </label>
            </div>
            <label>
              <span>06 / Message</span>
              <textarea
                name="message"
                placeholder="Tell us about your goals and details…"
                required
                rows={4}
              />
            </label>
            <button className="button button-blue" type="submit">
              {sent ? "Opening your email…" : "Send Message"} <Arrow diagonal />
            </button>
          </form>

          <aside data-reveal>
            <span className="aside-label">Direct Channels</span>
            <a href="tel:+251976601177">
              +251 976 601 177 <Arrow diagonal />
            </a>
            <a href="mailto:bluewebdesigns0.1@gmail.com">
              bluewebdesigns0.1@gmail.com <Arrow diagonal />
            </a>
            <a href="https://www.bluewebdesigns.et" rel="noreferrer" target="_blank">
              www.bluewebdesigns.et <Arrow diagonal />
            </a>
            <div className="qr-box">
              <img
                alt="Scan to save Blueweb Designs contact details"
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=BEGIN%3AVCARD%0AVERSION%3A3.0%0AFN%3ABlueweb%20Designs%0ATEL%3A%2B251976601177%0AEMAIL%3Abluewebdesigns0.1%40gmail.com%0AURL%3Ahttps%3A%2F%2Fwww.bluewebdesigns.et%0AEND%3AVCARD&color=000000&bgcolor=ffffff&margin=10"
              />
              <div>
                <b>SCAN ME</b>
                <span>Scan with your phone camera to instantly save our full contact card.</span>
              </div>
            </div>
            <div className="socials">
              <a href="https://instagram.com/bluewebdesigns" rel="noreferrer" target="_blank">
                Instagram ↗
              </a>
              <a href="https://t.me/Bluewebdesigns" rel="noreferrer" target="_blank">
                Telegram ↗
              </a>
              <a href="https://wa.me/251976601177" rel="noreferrer" target="_blank">
                WhatsApp ↗
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
