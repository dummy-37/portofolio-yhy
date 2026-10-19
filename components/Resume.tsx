import { Tooltip } from "@/components/Tooltip";
import { education, experiences, organisations } from "@/lib/portfolio-data";

export function Resume() {
  return (
    <section className="section resume-section" id="experience" aria-labelledby="experience-title">
      <div className="section-heading resume-heading">
        <p className="section-kicker">03 / Experience</p>
        <h2 id="experience-title">A timeline of building, maintaining, and learning.</h2>
      </div>

      <div className="experience-list">
        {experiences.map((item) => (
          <article className="experience-item" key={`${item.company}-${item.period}`}>
            <div className="experience-date">
              <time>{item.year}</time>
              <span>{item.period}</span>
            </div>
            <div className="experience-main">
              <div className="card-title-row">
                <div>
                  <h3>{item.title}</h3>
                  <p className="company-text">{item.company}</p>
                </div>
                <Tooltip label={`${item.company} experience detail`} content={item.summary} />
              </div>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="resume-asides">
        <section className="resume-panel" aria-labelledby="education-title">
          <p className="section-kicker">Education</p>
          <h3 id="education-title">Formal foundation</h3>
          {education.map((item) => (
            <div className="resume-detail" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.institution}</span>
              <small>{item.period} · {item.detail}</small>
            </div>
          ))}
        </section>

        <section className="resume-panel" aria-labelledby="organisations-title">
          <p className="section-kicker">Organisations</p>
          <h3 id="organisations-title">Outside the deliverables</h3>
          <ul className="organisation-list">
            {organisations.map((organisation) => <li key={organisation}>{organisation}</li>)}
          </ul>
        </section>
      </div>
    </section>
  );
}
