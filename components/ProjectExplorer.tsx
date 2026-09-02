"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/portfolio-data";

const ALL_CATEGORIES = "All";

type ProjectExplorerProps = {
  projects: Project[];
};

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category))).sort();
    return [ALL_CATEGORIES, ...unique];
  }, [projects]);

  const categoryCounts = useMemo(() => {
    return projects.reduce<Record<string, number>>(
      (accumulator, project) => {
        accumulator[ALL_CATEGORIES] += 1;
        accumulator[project.category] = (accumulator[project.category] ?? 0) + 1;
        return accumulator;
      },
      { [ALL_CATEGORIES]: 0 }
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory = activeCategory === ALL_CATEGORIES || project.category === activeCategory;
      const searchableText = [
        project.title,
        project.company,
        project.role,
        project.period,
        project.category,
        project.summary,
        project.tech.join(" ")
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, projects, query]);

  return (
    <div className="project-explorer">
      <div className="project-toolbar" aria-label="Project filter controls">
        <div className="filter-pills" role="list" aria-label="Filter projects by category">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                aria-pressed={isActive}
                className={isActive ? "active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
                <span>{categoryCounts[category] ?? 0}</span>
              </button>
            );
          })}
        </div>
        <label className="project-search">
          <span>Search projects</span>
          <input
            aria-label="Search projects by title, company, role, or technology"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Django, chatbot, Docker..."
            type="search"
            value={query}
          />
        </label>
      </div>

      <p className="project-result-count">
        Showing {filteredProjects.length} of {projects.length} projects
        {activeCategory !== ALL_CATEGORIES ? ` in ${activeCategory}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
      </p>

      {filteredProjects.length ? (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article
              className="project-card reveal-card"
              key={`${project.title}-${project.period}`}
              style={{ "--reveal-delay": `${Math.min(index, 8) * 55}ms` } as CSSProperties}
            >
              <div className="project-card-top">
                <span>{project.category}</span>
                <small>{project.period}</small>
              </div>
              <h3>{project.title}</h3>
              {project.company ? <p className="company">{project.company}</p> : null}
              {project.role ? <p className="role">{project.role}</p> : null}
              <p>{project.summary}</p>
              <div className="chip-row">
                {project.tech.slice(0, 8).map((tech) => (
                  <span className="chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <strong>No project found.</strong>
          <p>Try a different category or search keyword.</p>
          <button
            className="secondary-button"
            onClick={() => {
              setActiveCategory(ALL_CATEGORIES);
              setQuery("");
            }}
            type="button"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
