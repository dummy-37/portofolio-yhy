import { profile } from "@/lib/portfolio-data";

const quickStats = [
  { value: "5+", label: "years building systems" },
  { value: "Backend", label: "primary engineering track" },
  { value: "Data + AI", label: "current product focus" }
];

export function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-copy">
        <div className="hero-profile" aria-label="Portfolio profile">
          <div className="profile-avatar">
            <img src="/profile/yahya-firdaus.png" alt="Yahya Firdaus portrait" />
          </div>
          <div className="profile-meta">
            <strong>{profile.name}</strong>
            <span>{profile.role} · {profile.location}</span>
          </div>
        </div>
        <span className="availability-badge">Available for collaboration</span>
        <p className="eyebrow">Software Engineer · Backend Developer</p>
        <h1>
          Building <span className="hero-gradient-text">simple, reliable</span> systems for backend, data, and AI products.
        </h1>
        <p className="hero-intro">
          I&apos;m <strong>{profile.name}</strong>. I design backend services, data workflows,
          dashboards, chatbot systems, and AI-assisted analytics tools with a practical engineering mindset.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#featured">View featured project</a>
          <a className="secondary-button" href={`mailto:${profile.email}`}>Contact me</a>
        </div>
      </div>

      <aside className="hero-card" aria-label="Featured portfolio preview">
        <div className="hero-card-header">
          <span>Featured personal project</span>
          <strong>Data Warehouse AI Workspace</strong>
        </div>
        <div className="hero-image-frame">
          <img src="/projects/data-warehouse-workspace.webp" alt="Data Warehouse AI Workspace pipeline preview" />
        </div>
        <div className="hero-card-footer">
          <span>Pipeline builder</span>
          <span>Dashboard AI</span>
          <span>Notebook lab</span>
        </div>
      </aside>

      <div className="hero-stats" aria-label="Portfolio highlights">
        {quickStats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
