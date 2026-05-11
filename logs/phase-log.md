# Phase Log — Yahya Portfolio Next.js + Qwen LoRA Chatbot

## Phase 1 — Project scaffold, portfolio migration, chatbot shell, and Docker readiness

Status: Done
Date: 2026-05-04

Work completed:

- Created a Next.js App Router project structure with TypeScript.
- Migrated core portfolio content into `lib/portfolio-data.ts`.
- Created reusable UI components for Header, Hero, Skills, Projects, Resume, Contact, and ChatWidget.
- Created a modern visual style that keeps the original single-page portfolio layout concept while changing the UI direction.
- Added chatbot interface for portfolio/resume questions.
- Added `/api/chat` route for server-side chatbot requests.
- Prepared Qwen LoRA integration through `QWEN_API_URL`, `QWEN_MODEL`, and `QWEN_API_KEY` environment variables.
- Added local fallback answer logic so the chatbot can still answer core portfolio questions when Qwen endpoint is not configured.
- Added runtime chat logging to `logs/chat-runtime.log`.
- Added Dockerfile and docker-compose configuration.
- Added `.env.example`, `.dockerignore`, `.gitignore`, and README instructions.

Notes:

- The actual Qwen LoRA model endpoint is not included yet because the model server URL, serving framework, and payload format were not provided.
- The current Qwen client assumes an OpenAI-compatible chat completions endpoint. This can be adjusted in Phase 2.

## Phase 2 — Qwen LoRA endpoint integration

Status: Done
Date: 2026-05-04

Work completed:

- Expanded `lib/qwen-client.ts` from a single OpenAI-compatible connector into a multi-provider Qwen LoRA client.
- Added support for `QWEN_PROVIDER=openai`, `ollama`, `tgi`, and `fastapi`.
- Added provider-specific request payload builders for OpenAI-compatible chat completions, Ollama chat API, Hugging Face TGI generate API, and custom FastAPI inference endpoints.
- Added a more flexible response parser for `choices[0].message.content`, `choices[0].text`, `message.content`, `generated_text`, `response`, `answer`, `content`, `text`, `output`, and `result` formats.
- Added timeout handling through `QWEN_TIMEOUT_MS`.
- Added generation settings through `QWEN_TEMPERATURE` and `QWEN_MAX_TOKENS`.
- Added `app/api/chat/health/route.ts` for runtime chatbot configuration checks.
- Added `scripts/test-chat.mjs` and the `npm run chat:test` command for smoke testing the chatbot API.
- Updated `.env.example` with Phase 2 provider configuration.
- Updated `docker-compose.yml` with example notes for vLLM/OpenAI-compatible and Ollama model servers.
- Added `docs/qwen-lora-integration.md` as a practical guide for connecting the Next.js app to a Qwen LoRA server.

Notes:

- The project still does not include model weights or LoRA adapters. The Qwen LoRA model should run as a separate inference server.
- If the actual inference server uses a different payload shape, use `QWEN_PROVIDER=fastapi` and adapt the custom FastAPI server to the documented payload.
- For production testing, set `ENABLE_LOCAL_FALLBACK=false` so server errors are visible instead of being masked by local fallback.

## Phase 3 — Chatbot quality evaluation and guardrails

Status: Done
Date: 2026-05-04

Work completed:

- Added `lib/chat-guardrails.ts` for scope checking, source label detection, source footers, and out-of-scope responses.
- Updated the Qwen system prompt so the model must answer only from portfolio/resume context and include source labels.
- Added pre-model blocking for sensitive or unsupported questions such as salary, identity numbers, home address, credentials, family status, politics, weather, and other non-portfolio topics.
- Updated local fallback answers so they also include source labels.
- Extended `/api/chat` runtime logging with guardrail status and source labels.
- Updated the chat UI to show provider, guardrail state, and source labels for assistant responses.
- Added `tests/chat-eval-cases.json` with initial evaluation questions.
- Added `scripts/evaluate-chat.mjs` and `npm run chat:evaluate` for repeatable chatbot evaluation through the running API.
- Added `docs/chatbot-evaluation.md` as the Phase 3 evaluation and guardrail guide.

Notes:

- The evaluation script checks keyword coverage, source labels, and out-of-scope blocking. It is a first-pass quality gate, not a replacement for manual review.
- Once the real Qwen LoRA endpoint is active, the same tests should be run with `ENABLE_LOCAL_FALLBACK=false` to expose endpoint or prompt issues.

## Phase 4 — UI polishing and content refinement

Status: Done
Date: 2026-05-04

Work completed:

- Added `components/ProjectExplorer.tsx` for client-side project browsing.
- Added project filtering by category with per-category counts.
- Added project search across title, company, role, period, category, summary, and technology stack.
- Added an empty-state view and reset action when filters return no results.
- Updated the Projects section copy to focus on quick recruiter-style scanning.
- Added lightweight card reveal animation with `prefers-reduced-motion` support.
- Added accessible keyboard focus styling.
- Added mobile-friendly horizontal filter controls.
- Updated the chatbot with minimize/expand behavior through a floating launcher.
- Added automatic scroll-to-latest-message behavior inside the chatbot message panel.
- Added `docs/ui-polishing.md` for Phase 4 notes and open UI items.
- Fixed a duplicate `year` key in `lib/portfolio-data.ts`.

Notes:

- The placeholder `YF` avatar is still used because no profile image asset was provided.
- Project screenshots are still not included because no project image assets were provided.
- Full production build should be run after installing dependencies in the target development or deployment environment.

## Phase 5 — Deployment preparation

Status: completed structurally.

Completed work:

- Added production Docker Compose configuration in `docker-compose.prod.yml`.
- Added production environment template in `.env.production.example`.
- Added general deployment health check endpoint in `app/api/healthz/route.ts`.
- Added readiness endpoint in `app/api/readiness/route.ts` to check logs directory and Qwen configuration.
- Added Dockerfile healthcheck using `/api/healthz`.
- Added basic security headers through `next.config.ts`.
- Added deployment configuration checker in `scripts/check-deployment-config.mjs`.
- Added post-deployment health check script in `scripts/health-check.mjs`.
- Added npm scripts: `typecheck`, `deploy:check`, `deploy:health`, and `ci`.
- Added GitHub Actions CI template in `.github/workflows/ci.yml`.
- Added deployment documentation in `docs/deployment.md`.
- Added final Phase 5 checklist in `docs/phase-5-checklist.md`.
- Updated `README.md` with production run instructions and Phase 5 summary.

Remaining work for a real production launch:

- Choose the final hosting target.
- Configure the real Qwen LoRA inference endpoint.
- Run build verification in the target environment.
- Connect domain and HTTPS.
- Run chatbot evaluation against the real model endpoint.
- Add platform-specific CD after the deployment target is selected.

## Phase 6 — Landing page simplification and personal data warehouse project

Status: completed structurally.
Date: 2026-05-04

Completed work:

- Reviewed the previous UI direction and simplified it into a cleaner light landing-page style.
- Reworked the hero section to be more direct and recruiter-friendly.
- Added a portfolio assistant preview in the hero area.
- Added `components/FeaturedDataWarehouse.tsx` as a featured personal project section.
- Added the personal project `Netflix Data Warehouse AI Workspace` into `lib/portfolio-data.ts`.
- Added compressed project screenshots in `public/projects/`.
- Updated chatbot local fallback and guardrail keyword coverage so questions about Netflix, dashboard, ETL, XGBoost, notebook, and data warehouse analytics are handled better.
- Updated ESLint setup for the current Next.js project structure.
- Added Phase 6 documentation in `docs/phase-6-landing-review.md`.

Notes:

- Full `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` still need to be run in the local development environment or deployment environment because dependencies are not installed inside this handoff folder.
- The actual Qwen LoRA endpoint still needs to be connected for real model testing.

## Phase 7 — Landing Page Redesign Implementation

Implemented the approved landing page mockup into the Phase 6 project. The layout was simplified into a cleaner light SaaS-style portfolio with a stronger hero, compact skill strip, featured Data Warehouse AI Workspace section, concise selected project cards, experience cards, and a floating circular chatbot button. The chatbot is no longer shown as a large open panel by default; it opens only when the user clicks the floating assistant button.

Added:
- `scripts/static-check.mjs`
- `docs/phase-7-landing-implementation.md`

Updated:
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/Skills.tsx`
- `components/FeaturedDataWarehouse.tsx`
- `components/Projects.tsx`
- `components/Resume.tsx`
- `components/ChatWidget.tsx`
- `components/Contact.tsx`
- `app/globals.css`
- `package.json`


## Phase 8 — Minimal Elegant Redesign

Completed:
- Redesigned the Phase 7 landing page into a simpler, brighter, and more elegant interface.
- Reduced the number of dense cards and visual elements.
- Rebuilt the hero with clearer copy, focused CTA buttons, and a clean Data Warehouse AI Workspace preview.
- Simplified About, Skills, Featured Project, Selected Work, Experience, Education, and Contact sections.
- Kept the chatbot as a floating circular assistant button with a lightweight panel.
- Updated static check to match the new layout structure.

Validation:
- `node scripts/static-check.mjs` passed.

## Phase 9 — Tooltip-Based Minimal Text

- Added reusable tooltip component for hidden detail text.
- Converted long capability descriptions into hover/focus tooltips.
- Simplified About, Skills, Projects, Experience, and Education visual density.
- Kept the chatbot as a floating button with compact panel.
- Added documentation in `docs/phase-9-tooltip-minimal-text.md`.

## Phase 10 — Chat Icon, Font, and Particle Background Refinement

- Replaced the emoji chatbot launcher with a custom SVG assistant orb.
- Added animated glow rings and micro-particles to make the chatbot button feel more premium.
- Added a lightweight canvas-based particle background with pointer interaction and reduced-motion support.
- Refined typography using a cleaner product-style font stack.
- Updated static checks to verify the particle background and improved assistant icon.
