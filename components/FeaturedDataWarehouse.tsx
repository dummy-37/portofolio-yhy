import { Tooltip } from "@/components/Tooltip";

const capabilities = [
  {
    title: "Workspace",
    description:
      "Node-based canvas for CSV source nodes, dataset joins, and data-flow organization before analysis."
  },
  {
    title: "AI dashboard",
    description:
      "Assistant flow that suggests dashboard widgets, explains chart choices, and helps create analytics views from the prepared data."
  },
  {
    title: "Lab & export",
    description:
      "Notebook/lab environment for IMDb score experiments, with reporting flow that supports dashboard export to PDF."
  }
];

const gallery = [
  {
    src: "/projects/data-warehouse-polished-dashboard.webp",
    alt: "Polished Netflix analytics dashboard",
    label: "Dashboard"
  },
  {
    src: "/projects/data-warehouse-notebook.webp",
    alt: "Notebook lab for Netflix rating analysis",
    label: "Notebook"
  }
];

export function FeaturedDataWarehouse() {
  return (
    <section className="section featured-section" id="featured">
      <div className="section-heading slim">
        <p className="eyebrow">Featured personal project</p>
        <h2>Data Warehouse AI Workspace</h2>
        <p className="short-copy">
          A minimal analytics workspace for pipeline building, AI-assisted dashboards, notebook exploration,
          and export-ready reporting.
        </p>
      </div>

      <div className="featured-card elegant-featured-card">
        <div className="featured-main-image">
          <img src="/projects/data-warehouse-ai-dashboard.webp" alt="AI dashboard builder preview" />
        </div>

        <div className="featured-content compact-featured-content">
          <div className="title-with-tooltip">
            <h3>From raw data to clear dashboard insights.</h3>
            <Tooltip
              label="Project detail"
              content="This personal project shows backend design, data workflow thinking, and AI interaction in one product: source-node pipeline, join process, dashboard builder, chatbot assistant, notebook experiment, and PDF export."
            />
          </div>

          <div className="capability-list compact-capability-list" aria-label="Data warehouse workspace capabilities">
            {capabilities.map((item) => (
              <article className="capability-item compact-capability" key={item.title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="tech-line minimal-tech-line" aria-label="Main technologies">
            {["Next.js", "Python", "PostgreSQL", "Docker", "XGBoost", "Qwen LoRA"].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="gallery-row compact-gallery" aria-label="Additional project screenshots">
        {gallery.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.alt} />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
