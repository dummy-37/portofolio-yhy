import { profile } from "@/lib/portfolio-data";

export function Contact() {
  return (
    <footer className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="section-kicker">04 / Contact</p>
        <h2 id="contact-title">Have a backend or data problem worth solving?</h2>
        <p>Open for thoughtful collaboration across backend systems, data workflows, AI products, and developer tooling.</p>
      </div>
      <div className="contact-actions">
        <a className="primary-button" href={`mailto:${profile.email}`}>Email Yahya <span aria-hidden="true">↗</span></a>
        <a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="secondary-button" href={profile.resumeUrl} target="_blank" rel="noreferrer">Download CV</a>
        <a className="text-link" href={profile.portfolio} target="_blank" rel="noreferrer">Original portfolio ↗</a>
      </div>
      <p className="footer-note">© 2026 Yahya Firdaus. Built around useful systems.</p>
    </footer>
  );
}
