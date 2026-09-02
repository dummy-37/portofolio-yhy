import { Tooltip } from "@/components/Tooltip";

const capabilities = [
  {
    title: "Workspace",
    description: "Node-based canvas for CSV sources, dataset joins, and data-flow organization before analysis."
  },
  {
    title: "AI dashboard",
    description: "Assistant flow that suggests widgets, explains chart choices, and helps create analytics views."
  },
  {
    title: "Lab & export",
    description: "Notebook experiments for IMDb scores with a reporting flow that supports PDF dashboard export."
  }
];

const gallery = [
  {
    src: "/projects/data-warehouse-workspace.webp",
    alt: "Data Warehouse AI Workspace pipeline canvas",
    label: "Pipeline workspace"
  },
  {
    src: "/projects/data-warehouse-notebook.webp",
    alt: "Notebook lab for Netflix rating analysis",
    label: "Notebook lab"
  }
];

export function FeaturedDataWarehouse() {
  return (
    <section className="section featured-section" id="featured" aria-labelledby="featured-title">
      <div className="section-heading featured-heading">
        <p className="section-kicker">01 / Featured project</p>
        <h2 id="featured-title">Data Warehouse AI Workspace</h2>
        <p>A focused workspace for turning raw data into clear dashboard insights.</p>
      </div>

      <div className="featured-card">
        <figure className="featured-main-image">
          <img src="/projects/data-warehouse-ai-dashboard.webp" alt="AI dashboard builder preview" />
          <figcaption>AI-assisted analytics workspace</figcaption>
        </figure>

        <div className="featured-content">
          <div className="title-with-tooltip">
            <h3>From raw data to a decision-ready view.</h3>
            <Tooltip
              label="Project detail"
              content="This personal project brings together a source-node pipeline, join process, dashboard builder, chatbot assistant, notebook experiment, and PDF export."
            />
          </div>
          <p className="featured-description">
            A personal data warehouse product built around a practical flow: prepare the source, shape the pipeline,
            explore the result, then communicate it.
          </p>

          <div className="featured-capabilities">
            {capabilities.map((item, index) => (
              <article className="featured-capability" key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="featured-stack" aria-label="Main technologies">
            <span>Go</span>
            <span>Python</span>
            <span>Next.js</span>
            <span>PostgreSQL</span>
            <span>XGBoost</span>
            <span>Qwen LoRA</span>
          </div>
        </div>
      </div>

      <div className="featured-gallery" aria-label="Additional project screenshots">
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
