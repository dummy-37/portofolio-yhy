import { Tooltip } from "@/components/Tooltip";
import { profile } from "@/lib/portfolio-data";

const skillGroups = [
  {
    title: "Backend Engineering",
    icon: "⚙️",
    items: ["Python", "Django", "Flask", "PostgreSQL", "REST API", "Docker"],
    detail: "Backend work covers API development, database-backed systems, deployment preparation, reporting, and maintenance for web products."
  },
  {
    title: "Data & AI Products",
    icon: "🧠",
    items: ["Data Warehouse", "Dashboard", "NLP", "Chatbot", "Qwen LoRA", "XGBoost"],
    detail: "Data and AI product work includes dashboard workflows, chatbot/NLP features, notebook experimentation, and AI-assisted analytics experiences."
  }
];

export function Skills() {
  return (
    <section className="section about-skills" id="about">
      <article className="about-card compact-about-card">
        <p className="eyebrow">About</p>
        <div className="title-with-tooltip">
          <h2>Backend-focused engineer with data product experience.</h2>
          <Tooltip label="About detail" content={profile.about} />
        </div>
        <p>{profile.headline}</p>
      </article>

      <div className="skills-card compact-skills-card" id="skills">
        {skillGroups.map((group) => (
          <article className="skill-group compact-skill-group" key={group.title}>
            <div className="card-title-row">
              <h3><span aria-hidden="true">{group.icon}</span> {group.title}</h3>
              <Tooltip label={`${group.title} detail`} content={group.detail} />
            </div>
            <div className="chip-list">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
