import { Tooltip } from "@/components/Tooltip";
import { profile, skills } from "@/lib/portfolio-data";

const capabilityGroups = [
  {
    number: "01",
    title: "Backend engineering",
    detail: "API development, database-backed systems, deployment preparation, reporting, and maintenance for web products.",
    items: skills.slice(0, 7)
  },
  {
    number: "02",
    title: "Data, AI & delivery",
    detail: "Dashboard workflows, chatbot and NLP features, notebook experimentation, data engineering, and production delivery.",
    items: skills.slice(7)
  }
];

export function Skills() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <p className="section-kicker">01 / About</p>
        <h2 id="about-title">A backend-first engineer with a product mindset.</h2>
      </div>

      <div className="about-layout">
        <div className="about-copy">
          <p className="lead-copy">{profile.headline}</p>
          <p>{profile.about}</p>
        </div>

        <div className="capability-list" aria-label="Core capabilities">
          {capabilityGroups.map((group) => (
            <article className="capability-group" key={group.title}>
              <div className="capability-heading">
                <span className="capability-number">{group.number}</span>
                <h3>{group.title}</h3>
                <Tooltip label={`${group.title} detail`} content={group.detail} />
              </div>
              <div className="skill-list">
                {group.items.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <strong>{skill.name}</strong>
                    <span>{skill.tools.join(" · ")}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
