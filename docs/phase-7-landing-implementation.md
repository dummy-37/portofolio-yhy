# Phase 7 — Landing Page Redesign Implementation

Phase 7 implements the approved landing page direction into the Phase 6 codebase.

## Implemented

- Reworked the page into a simpler, cleaner, light landing page.
- Updated the sticky header with compact branding, navigation, theme-preview button, and CV CTA.
- Rebuilt the hero into a two-column layout: professional copy on the left and Data Warehouse AI Workspace preview on the right.
- Added a compact skill strip below the hero.
- Rebuilt the About and Core Skills sections into two balanced cards.
- Rebuilt the Data Warehouse AI Workspace section as the main featured project with four screenshot cards.
- Simplified selected projects into concise cards.
- Simplified experience, education, and contact sections.
- Reworked the chatbot into a bottom-right floating circular button.
- The chatbot panel now opens only when the floating button is clicked.
- Added suggested prompts inside the assistant panel.
- Replaced the older crowded CSS with a cleaner global style system.

## Validation notes

Static checks were added through:

```bash
npm run test:static
```

Full Next.js build, lint, and Playwright visual testing still require dependencies to be installed locally:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

A Playwright test can be added after dependencies are installed and the Next.js app is running.
