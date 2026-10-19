import { ProjectExplorer } from "@/components/ProjectExplorer";
import { projects } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading work-heading">
        <p className="section-kicker">02 / Selected work</p>
        <h2 id="work-title">A working archive, not just a highlight reel.</h2>
        <p>Explore backend, data, chatbot, mobile, and NLP projects by category, technology, or context.</p>
      </div>
      <ProjectExplorer projects={projects} />
    </section>
  );
}
