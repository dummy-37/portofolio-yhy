# Phase 4 — UI Polishing Notes

Phase 4 focuses on improving portfolio usability without changing the core data model or chatbot integration.

## Completed Work

- Added `components/ProjectExplorer.tsx` as a client-side project browser.
- Added category filters with project counts.
- Added project search by title, company, role, period, category, summary, and technology stack.
- Added an empty state with reset action when no project matches the active filters.
- Added card reveal animation with `prefers-reduced-motion` support.
- Added mobile-friendly horizontal filter pills.
- Added chatbot minimize/expand behavior through a floating launcher button.
- Added automatic scroll-to-latest-message behavior inside the chatbot.
- Added accessible focus styling for keyboard navigation.
- Fixed a duplicate `year` key in the experience data.

## UX Decisions

The original portfolio uses a single-page structure. That structure is preserved. The visual direction is different, but the page still keeps the recruiter-friendly order: introduction, skills, projects, resume, contact, and chatbot.

Project filtering is handled entirely in the browser because the portfolio dataset is small and static. This keeps the implementation simple and avoids unnecessary API calls.

The chatbot is still available as a floating widget, but it can now be minimized. This is useful on smaller screens because the widget can otherwise cover a large part of the page.

## Items Still Open

- Replace the `YF` placeholder with a real profile image if an asset is provided.
- Add real project screenshots if image assets are provided.
- Add analytics only after deciding the deployment platform and privacy requirements.
- Run a full production build after installing dependencies in the target environment.
