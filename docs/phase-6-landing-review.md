# Phase 6 — Landing Page Review, Simplification, and Personal Data Warehouse Project

## Objective

Phase 6 reviews the portfolio UI and code structure after Phase 5, then simplifies the visual direction into a cleaner landing-page style. This phase also adds the personal data warehouse project based on the supplied screenshots.

## Review Notes

The previous UI was functional, but the dark glassmorphism style made the page feel heavier than a common recruiter-facing landing page. The project section also had strong filtering/search features, but the page needed a clearer hero, simpler visual hierarchy, and a stronger featured project block.

The code structure was already modular enough for the next refinement. The safest update path was to keep the App Router structure and existing data-driven components, then refine the styling and add one new featured section.

## Completed Changes

- Converted the visual direction from dark glassmorphism to a brighter landing-page style.
- Simplified the hero section with clearer positioning and fewer decorative elements.
- Added a Qwen LoRA-ready assistant preview inside the hero.
- Added `components/FeaturedDataWarehouse.tsx`.
- Added a featured personal project section for the Netflix data warehouse analytics workspace.
- Added compressed WebP screenshots under `public/projects/`.
- Added the personal project entry `Netflix Data Warehouse AI Workspace` into `lib/portfolio-data.ts`.
- Updated chatbot fallback and guardrail keyword coverage for Netflix, dashboard, ETL, XGBoost, notebook, and analytics workspace questions.
- Updated ESLint script for Next.js 15 style usage.
- Added `eslint.config.mjs` and disabled the image warning because this project intentionally uses static screenshot previews through standard image tags.

## Personal Data Warehouse Project Summary

Project name: `Netflix Data Warehouse AI Workspace`

Type: Personal Project

Core capabilities:

- CSV source nodes for Netflix film and rating data.
- Pipeline workspace with join processing and reusable nodes.
- Dashboard builder for analytics widgets.
- AI assistant flow for dashboard creation and widget addition.
- Dashboard pages for content count, age rating distribution, genre analysis, IMDb score, and trend analysis.
- Notebook workspace for XGBoost-based IMDb score prediction.
- PDF export flow for dashboard reporting.

## Files Added or Updated

- `components/FeaturedDataWarehouse.tsx`
- `components/Hero.tsx`
- `components/Header.tsx`
- `components/Projects.tsx`
- `app/page.tsx`
- `app/globals.css`
- `lib/portfolio-data.ts`
- `lib/portfolio-context.ts`
- `lib/chat-guardrails.ts`
- `public/projects/data-warehouse-workspace.webp`
- `public/projects/data-warehouse-dashboards.webp`
- `public/projects/data-warehouse-ai-dashboard.webp`
- `public/projects/data-warehouse-polished-dashboard.webp`
- `public/projects/data-warehouse-notebook.webp`
- `eslint.config.mjs`
- `package.json`
- `docs/phase-6-landing-review.md`
- `logs/phase-log.md`

## Recommended Next Work

Run a full local verification after installing dependencies:

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

Then review the page at desktop and mobile widths. The remaining production work is to connect the actual Qwen LoRA endpoint and run chatbot evaluation against the real model.
