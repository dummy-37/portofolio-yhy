import { profile } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="section-kicker">01 / Introduction</p>
        <p className="hero-location">{profile.location} · Available for collaboration</p>
        <h1 id="hero-title">Building dependable systems for useful products.</h1>
        <p className="hero-intro">
          I&apos;m <strong>{profile.name}</strong>, a {profile.role.toLowerCase()} focused on backend services,
          data workflows, dashboards, chatbot systems, and AI-assisted analytics.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
          <a className="secondary-button" href={`mailto:${profile.email}`}>Email me</a>
        </div>
      </div>

      <figure className="hero-portrait">
        <div className="portrait-frame">
          <img src="/profile/yahya-firdaus.png" alt="Yahya Firdaus portrait" />
        </div>
        <figcaption>
          <span>Backend · Data · AI</span>
          <span>Practical engineering, clear outcomes.</span>
        </figcaption>
      </figure>
    </section>
  );
}
