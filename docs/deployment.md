# Phase 5 — Deployment Preparation

Dokumen ini menjelaskan persiapan deployment untuk project `yahya-portfolio-qwen-next`.

## Target Deployment

Project ini disiapkan untuk dua pola deployment:

1. **Portfolio app saja** — aplikasi Next.js berjalan di container sendiri, sementara Qwen LoRA endpoint berada di server lain.
2. **Portfolio app + Qwen LoRA dalam satu Docker network** — aplikasi Next.js memanggil service `qwen-lora` melalui hostname internal Docker.

Untuk production, pola pertama biasanya lebih aman dan mudah dikelola karena model Qwen LoRA dapat membutuhkan GPU, VRAM besar, dan runtime khusus.

## File Baru pada Phase 5

- `docker-compose.prod.yml` — compose file khusus production.
- `.env.production.example` — template environment production.
- `app/api/healthz/route.ts` — health check sederhana untuk container/platform.
- `app/api/readiness/route.ts` — readiness check untuk logs directory dan konfigurasi Qwen.
- `scripts/check-deployment-config.mjs` — validasi environment sebelum deployment.
- `scripts/health-check.mjs` — pengecekan health endpoint setelah aplikasi berjalan.
- `.github/workflows/ci.yml` — contoh CI untuk type check dan build.

## Environment Production

Salin template environment:

```bash
cp .env.production.example .env.production
```

Minimal variabel yang perlu dicek:

```bash
NEXT_PUBLIC_SITE_URL=https://domain-portfolio-anda.com
QWEN_PROVIDER=openai
QWEN_API_URL=http://qwen-lora:8000/v1/chat/completions
QWEN_MODEL=models/qwen-resume-lora-v2.zip
ENABLE_LOCAL_FALLBACK=true
```

Gunakan `ENABLE_LOCAL_FALLBACK=true` pada tahap awal deployment agar chatbot tetap menjawab dari fallback lokal ketika endpoint Qwen belum stabil. Setelah endpoint Qwen stabil, nilai ini dapat diganti menjadi `false`.

## Validasi Sebelum Deploy

```bash
npm run deploy:check -- .env.production
```

Jika belum ada `.env.production`, gunakan template sebagai simulasi:

```bash
npm run deploy:check -- .env.production.example
```

Status `WARN` masih dapat diterima untuk staging, tetapi harus diperbaiki sebelum production final, terutama placeholder domain dan endpoint model.

## Menjalankan Production dengan Docker

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Cek container:

```bash
docker compose -f docker-compose.prod.yml ps
```

Cek log:

```bash
docker compose -f docker-compose.prod.yml logs -f portfolio-web
```

## Menjalankan dengan Qwen LoRA Service Opsional

Jika model Qwen LoRA dijalankan dengan vLLM di server yang sama, pastikan folder berikut tersedia:

```bash
models/Qwen-base
models/lora-adapter
```

Lalu jalankan profile `qwen`:

```bash
docker compose -f docker-compose.prod.yml --profile qwen up --build -d
```

Catatan: konfigurasi vLLM pada compose masih berupa template. Nama base model, path adapter LoRA, dan kebutuhan GPU harus disesuaikan dengan server aktual.

## Health Check

Endpoint utama:

```bash
GET /api/healthz
```

Contoh:

```bash
curl http://localhost:3000/api/healthz
```

Readiness check:

```bash
curl http://localhost:3000/api/readiness
```

Chatbot config check:

```bash
curl http://localhost:3000/api/chat/health
```

Script health check:

```bash
npm run deploy:health -- http://localhost:3000
```

## Reverse Proxy

Jika menggunakan Nginx/Caddy/Traefik, arahkan traffic HTTPS ke container `portfolio-web` pada port `3000`.

Contoh konsep routing:

```text
https://domain-portfolio-anda.com  ->  127.0.0.1:3000
```

Untuk production publik, gunakan HTTPS, domain tetap, dan pastikan firewall hanya membuka port yang diperlukan.

## CI/CD

Contoh workflow GitHub Actions tersedia di:

```bash
.github/workflows/ci.yml
```

Workflow melakukan:

1. Install dependency.
2. Validasi template deployment.
3. Type check.
4. Build aplikasi.

Deployment otomatis belum diaktifkan karena target hosting belum ditentukan. Setelah target hosting dipilih, workflow dapat diperluas menjadi push image ke registry atau deploy ke server.

## Checklist Production Final

- Domain production sudah ditentukan.
- HTTPS sudah aktif.
- `.env.production` sudah diisi dan tidak memakai placeholder.
- `QWEN_API_URL` mengarah ke inference server yang benar.
- `ENABLE_LOCAL_FALLBACK=false` hanya jika endpoint Qwen sudah stabil.
- `docker compose -f docker-compose.prod.yml ps` menunjukkan container healthy.
- `/api/healthz`, `/api/readiness`, dan `/api/chat/health` dapat diakses.
- `npm run chat:evaluate` dijalankan minimal satu kali pada environment staging.
- Runtime log `logs/chat-runtime.log` dipantau setelah go-live.
