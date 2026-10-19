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

const screenshots = [
  {
    src: "/projects/data-warehouse-01-login-20260908.png",
    alt: "Axentra Data workspace login page in dark mode",
    label: "Workspace login",
    width: 3408,
    height: 1770
  },
  {
    src: "/projects/data-warehouse-02-workspaces-20260908.png",
    alt: "Workspace management page with the Data CST project",
    label: "Workspace management",
    width: 3398,
    height: 1762
  },
  {
    src: "/projects/data-warehouse-03-pipeline-20260908.png",
    alt: "Data CST pipeline with the DB_Allianz source, three SQL nodes, and the Egi assistant",
    label: "Pipeline workspace & assistant",
    width: 3412,
    height: 1782
  },
  {
    src: "/projects/data-warehouse-04-dictionary-20260908.png",
    alt: "Data Dictionary showing node metadata, columns, and parent-child relationships",
    label: "Data Dictionary",
    width: 3396,
    height: 1776
  },
  {
    src: "/projects/data-warehouse-05-dashboard-20260908.png",
    alt: "Allianz Learning Dashboard with date filters, monthly learning duration, and course participation tables",
    label: "Learning analytics dashboard",
    width: 3402,
    height: 1768
  },
  {
    src: "/projects/data-warehouse-06-dashboard-editor-20260908.png",
    alt: "Dashboard editor with chart widgets, layout controls, and data settings",
    label: "Dashboard editor",
    width: 3398,
    height: 1770
  },
  {
    src: "/projects/data-warehouse-07-consumer-20260908.png",
    alt: "Data consumer workspace browsing monthly learning duration with search, filters, and export controls",
    label: "Data consumer workspace",
    width: 3402,
    height: 1776
  },
  {
    src: "/projects/data-warehouse-08-admin-20260908.png",
    alt: "Administration overview with users, projects, dashboards, storage, and operational metrics",
    label: "Administration overview",
    width: 3406,
    height: 1778
  }
];

const [cover, ...gallery] = screenshots;

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
          <a href={cover.src} target="_blank" rel="noopener noreferrer" aria-label={`View ${cover.label} screenshot at full size`}>
            <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" decoding="async" />
          </a>
          <figcaption>{cover.label}</figcaption>
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
            <a href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.label} screenshot at full size`}>
              <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
            </a>
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
