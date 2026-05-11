# Yahya Portfolio — Next.js + Qwen LoRA Chatbot

Project ini adalah versi Next.js dari portofolio Yahya Firdaus. Struktur konten mengikuti portofolio lama, tetapi tampilan dibuat ulang menjadi landing page yang lebih sederhana, bersih, dan recruiter-friendly. Chatbot disiapkan untuk menjawab pertanyaan seputar portofolio/resume dengan model Qwen yang sudah menggunakan LoRA.

## Ringkasan Fitur

- Next.js App Router dengan TypeScript.
- Konten portofolio terpusat di `lib/portfolio-data.ts`.
- Chatbot UI di kanan bawah halaman.
- API chatbot di `app/api/chat/route.ts`.
- Integrasi Qwen LoRA multi-provider: `openai`, `ollama`, `tgi`, dan `fastapi`.
- Health check konfigurasi chatbot di `app/api/chat/health/route.ts`.
- Guardrail chatbot untuk membatasi jawaban pada data portofolio/resume.
- Test cases dan script evaluasi chatbot untuk mengecek konsistensi jawaban.
- Featured personal project: Netflix Data Warehouse AI Workspace, lengkap dengan screenshot pipeline, AI dashboard flow, dashboard analytics, dan notebook experiment.
- Project filter, project search, card reveal animation, dan chatbot minimize/expand.
- Fallback lokal tersedia agar chatbot tetap dapat menjawab pertanyaan dasar saat endpoint Qwen belum tersedia.
- Dockerfile, docker-compose development, dan docker-compose production sudah tersedia.
- Health check, readiness check, deployment config check, dan contoh CI GitHub Actions tersedia.
- Log fase pengerjaan tersedia di `logs/phase-log.md`.
- Runtime chat log tersimpan di `logs/chat-runtime.log` ketika aplikasi berjalan.


## Phase 10 Visual Refinement

Phase 10 adds a more polished AI landing-page feel while keeping the interface minimal:

- Custom SVG assistant orb for the floating chatbot button.
- Subtle glowing pulse and micro-particle detail on the chatbot launcher.
- Lightweight canvas particle background with pointer interaction.
- Reduced-motion support for accessibility.
- Cleaner product-style typography and softer glass surfaces.

Static check:

```bash
npm run test:static
```

Documentation:

```bash
docs/phase-10-chat-icon-particles.md
```

## Cara Menjalankan Lokal

```bash
npm install
cp .env.example .env
npm run dev
```

Buka:

```bash
http://localhost:3000
```

## Cara Menjalankan dengan Docker

```bash
cp .env.example .env
docker compose up --build
```

Buka:

```bash
http://localhost:3000
```

## Cara Menjalankan Mode Production

Salin template environment production:

```bash
cp .env.production.example .env.production
```

Validasi konfigurasi deployment:

```bash
npm run deploy:check -- .env.production
```

Jalankan production compose:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Cek status aplikasi:

```bash
npm run deploy:health -- http://localhost:3000
```

Dokumentasi deployment tersedia di:

```bash
docs/deployment.md
docs/phase-5-checklist.md
```

## Konfigurasi Qwen LoRA

Edit file `.env`:

```bash
QWEN_PROVIDER=openai
QWEN_API_URL=http://qwen-lora:8000/v1/chat/completions
QWEN_MODEL=models/qwen-resume-lora-v2.zip
QWEN_API_KEY=
QWEN_TEMPERATURE=0.2
QWEN_MAX_TOKENS=700
QWEN_TIMEOUT_MS=45000
ENABLE_LOCAL_FALLBACK=true
```

Provider yang tersedia:

- `openai`: untuk vLLM, LM Studio, llama.cpp server, atau server lain yang OpenAI-compatible.
- `ollama`: untuk model Qwen LoRA yang sudah tersedia sebagai model Ollama atau sudah di-merge.
- `tgi`: untuk Hugging Face Text Generation Inference.
- `fastapi`: untuk inference server custom berbasis Python/FastAPI.

Dokumentasi detail ada di:

```bash
docs/qwen-lora-integration.md
```

## Health Check dan Readiness

Health check umum untuk container/platform:

```bash
curl http://localhost:3000/api/healthz
```

Readiness check untuk logs directory dan konfigurasi Qwen:

```bash
curl http://localhost:3000/api/readiness
```

Health check chatbot:

```bash
curl http://localhost:3000/api/chat/health
```

Health check chatbot hanya mengecek konfigurasi runtime, bukan melakukan inference ke model.

## Smoke Test Chatbot

Setelah aplikasi berjalan:

```bash
npm run chat:test -- "Which projects involve chatbot or NLP?"
```

Atau:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Which projects involve chatbot or NLP?"}]}'
```


## Evaluasi Chatbot

Setelah aplikasi berjalan, jalankan evaluasi kualitas awal:

```bash
npm run chat:evaluate
```

Test case tersimpan di:

```bash
tests/chat-eval-cases.json
```

Dokumentasi guardrail dan evaluasi tersedia di:

```bash
docs/chatbot-evaluation.md
```

## Struktur Folder

```bash
app/
  api/chat/route.ts             # API chatbot
  api/chat/health/route.ts      # Health check konfigurasi chatbot
  api/healthz/route.ts          # Health check umum untuk deployment
  api/readiness/route.ts        # Readiness check untuk deployment
  globals.css                   # Styling utama landing page
  layout.tsx                    # Metadata dan root layout
  page.tsx                      # Halaman utama
components/                     # Komponen UI portofolio, termasuk FeaturedDataWarehouse
lib/
  portfolio-data.ts             # Sumber data portofolio
  portfolio-context.ts          # Konteks untuk chatbot
  chat-guardrails.ts            # Scope check, source labels, dan out-of-scope handling
  qwen-client.ts                # Integrasi Qwen LoRA multi-provider + fallback lokal
docs/
  qwen-lora-integration.md      # Panduan integrasi Qwen LoRA
  chatbot-evaluation.md         # Panduan evaluasi dan guardrail chatbot
  ui-polishing.md               # Catatan Phase 4 UI polishing
  deployment.md                 # Panduan deployment production
  phase-5-checklist.md          # Checklist Phase 5
  phase-6-landing-review.md     # Catatan review UI dan personal data warehouse project
logs/
  phase-log.md                  # Catatan fase pengerjaan
scripts/
  log-phase.mjs                 # Helper untuk menambah phase log
  test-chat.mjs                 # Smoke test API chatbot
  evaluate-chat.mjs             # Evaluasi chatbot berbasis test cases
  check-deployment-config.mjs   # Validasi konfigurasi deployment
  health-check.mjs              # Health check setelah aplikasi berjalan
public/projects/                # Screenshot project data warehouse yang sudah dikompresi
Dockerfile
docker-compose.yml
docker-compose.prod.yml
.env.production.example
.github/workflows/ci.yml
```

## Menambah Catatan Phase

```bash
npm run phase:log -- "Phase title" "What was completed"
```

Catatan akan ditambahkan ke:

```bash
logs/phase-log.md
```

## Phase yang Sudah Selesai

### Phase 1 — Scaffold, migrasi portofolio, chatbot shell, Docker readiness

Status: selesai.

Hasil utama: project Next.js dibuat, konten portofolio dipindahkan, UI portofolio dibuat, chatbot shell tersedia, Dockerfile dan docker-compose ditambahkan.

### Phase 2 — Integrasi endpoint Qwen LoRA

Status: selesai secara struktural.

Hasil utama: konektor Qwen LoRA sudah mendukung beberapa tipe inference server, konfigurasi environment diperluas, health check ditambahkan, smoke test ditambahkan, dan dokumentasi integrasi dibuat.

Catatan: weight/model Qwen LoRA tetap perlu dijalankan sebagai service terpisah. Project ini sudah siap memanggil service tersebut melalui `QWEN_API_URL`.

### Phase 3 — Evaluasi kualitas chatbot dan guardrail

Status: selesai secara struktural.

Hasil utama: guardrail ditambahkan, pertanyaan sensitif/out-of-scope diblokir, jawaban diberi source labels, runtime log diperluas, test cases dibuat, dan script evaluasi chatbot tersedia melalui `npm run chat:evaluate`.

### Phase 4 — UI polishing dan pengalaman pengguna

Status: selesai secara struktural.

Hasil utama: project filter ditambahkan, project search dibuat, card reveal animation ditambahkan, chatbot dapat diminimalkan/dibuka kembali, scroll chatbot otomatis ke pesan terbaru, focus styling diperbaiki, dan bug duplicate `year` pada data experience diperbaiki. Dokumentasi tersedia di `docs/ui-polishing.md`.

### Phase 5 — Deployment preparation

Status: selesai secara struktural.

Hasil utama: production compose ditambahkan, environment production template dibuat, health/readiness endpoint tersedia, Dockerfile diberi healthcheck, security headers dasar ditambahkan, script validasi deployment dan health check dibuat, serta contoh GitHub Actions CI ditambahkan. Dokumentasi tersedia di `docs/deployment.md` dan `docs/phase-5-checklist.md`.

### Phase 6 — Landing page simplification and personal data warehouse project

Status: selesai secara struktural.

Hasil utama: tampilan direvisi menjadi landing page yang lebih sederhana dan terang, hero dipadatkan, featured project data warehouse ditambahkan, screenshot project dikompresi ke WebP, data project `Netflix Data Warehouse AI Workspace` masuk ke `lib/portfolio-data.ts`, dan guardrail chatbot diperbarui untuk topik Netflix/dashboard/ETL/XGBoost/notebook. Dokumentasi tersedia di `docs/phase-6-landing-review.md`.

## Phase Berikutnya yang Disarankan

Phase berikutnya dapat fokus pada final production handoff: memilih target hosting, menyambungkan endpoint Qwen LoRA asli, menjalankan build di environment target, menguji chatbot dengan model asli, memasang domain/HTTPS, dan membuat CD sesuai platform yang dipilih.

## Phase 7 UI Redesign

The final UI has been redesigned as a cleaner landing page inspired by the approved mockup:

- Light, simple, recruiter-friendly layout.
- Two-column hero with Data Warehouse AI Workspace preview.
- Compact skill strip.
- Data Warehouse AI Workspace as the main featured project.
- Cleaner selected project cards.
- Compact experience, education, and contact sections.
- Floating circular chatbot button with a small assistant panel.

Run a quick static validation:

```bash
npm run test:static
```



## Phase 8 — Minimal Elegant Redesign

The latest version simplifies the portfolio into a cleaner and more elegant landing page. It reduces visual density, keeps the Data Warehouse AI Workspace as the main featured project, and keeps the Qwen LoRA-ready assistant as a floating button.

Run the static check:

```bash
npm run test:static
```

## Phase 9 — Tooltip-Based Minimal Text

This version makes the portfolio cleaner by moving long explanatory text into small tooltip triggers. The main page now prioritizes section titles, short copy, tags, and compact cards, while extra context remains available on hover or keyboard focus.

Main updates:

- Reusable `Tooltip` component.
- Shorter About, Skills, Featured Project, Project, Experience, and Education sections.
- Details are accessible through info icons.
- Floating chatbot remains compact and unchanged.

Run the static check:

```bash
npm run test:static
```
