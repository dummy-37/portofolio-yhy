# Phase 9 — Tooltip-Based Minimal Text

This phase refines the minimal landing page by moving long explanatory text into hover/focus tooltips.

## What changed

- Added a reusable `Tooltip` component.
- Reduced visible text in the About, Skills, Featured Project, Selected Projects, and Experience sections.
- Kept important detail accessible through hover and keyboard focus.
- Preserved the floating chatbot interaction from the previous phase.
- Improved the portfolio scan experience by prioritizing titles, tags, and compact summaries.

## Affected files

- `components/Tooltip.tsx`
- `components/FeaturedDataWarehouse.tsx`
- `components/Projects.tsx`
- `components/Resume.tsx`
- `components/Skills.tsx`
- `app/globals.css`
- `scripts/static-check.mjs`
