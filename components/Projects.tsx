import { Tooltip } from "@/components/Tooltip";
import { type Project, projects } from "@/lib/portfolio-data";

const selectedTitles = ["LMS Allianz", "Chatbot Mitsubishi", "Speech Recognition and Text-to-Speech"];
const selectedProjects = selectedTitles
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is Project => Boolean(project));

export function Projects() {
  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading slim left">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title">Focused project highlights</h2>
        <p className="short-copy">Representative work across backend systems, chatbot products, and NLP research.</p>
      </div>

      <div className="work-grid compact-work-grid">
        {selectedProjects.map((project) => (
          <article className="work-card compact-work-card" key={`${project.title}-${project.period}`}>
            <div className="work-meta">
              <span>{project.category}</span>
              <small>{project.period}</small>
            </div>
            <div className="card-title-row">
              <h3>{project.title}</h3>
              {project.summary ? (
                <Tooltip
                  label={`${project.title} detail`}
                  content={`${project.company ? `${project.company}. ` : ""}${project.role ? `${project.role}. ` : ""}${project.summary}`}
                />
              ) : null}
            </div>
            {project.company ? <p className="company-text compact-company-text">{project.company}</p> : null}
            <p>{project.summary}</p>
            <div className="mini-tech-list compact-mini-tech-list">
              {project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
