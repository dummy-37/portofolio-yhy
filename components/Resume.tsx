import { Tooltip } from "@/components/Tooltip";
import { education, experiences } from "@/lib/portfolio-data";

const recentExperiences = experiences.slice(0, 3);

export function Resume() {
  return (
    <section className="section resume-section" id="experience">
      <div className="section-heading slim left">
        <p className="eyebrow">Experience</p>
        <h2>Recent timeline</h2>
      </div>

      <div className="timeline compact-timeline">
        {recentExperiences.map((item) => (
          <article className="timeline-item compact-timeline-item" key={`${item.company}-${item.period}`}>
            <time>{item.year}</time>
            <div className="timeline-main">
              <div className="card-title-row">
                <h3>{item.title}</h3>
                <Tooltip label={`${item.company} experience detail`} content={item.summary} />
              </div>
              <p className="company-text compact-company-text">{item.company} · {item.period}</p>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="education-card compact-education-card">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">Education</p>
            {education.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.institution} · {item.period}</p>
              </div>
            ))}
          </div>
          {education[0]?.detail ? <Tooltip label="Education detail" content={education[0].detail} /> : null}
        </div>
      </div>
    </section>
  );
}
