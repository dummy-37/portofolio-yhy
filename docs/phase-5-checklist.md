# Phase 5 Checklist

## Selesai pada Phase 5

- Production compose file ditambahkan.
- Environment production template ditambahkan.
- Health endpoint umum ditambahkan.
- Readiness endpoint ditambahkan.
- Dockerfile diberi healthcheck.
- Security headers dasar ditambahkan melalui `next.config.ts`.
- Script validasi deployment ditambahkan.
- Script health check deployment ditambahkan.
- Contoh GitHub Actions CI ditambahkan.
- Dokumentasi deployment ditambahkan.

## Yang Harus Dilengkapi Sebelum Go-Live

- Tentukan domain final.
- Tentukan server model Qwen LoRA aktual.
- Sesuaikan `QWEN_API_URL` dengan endpoint production.
- Validasi format response model menggunakan `npm run chat:test`.
- Jalankan evaluasi chatbot dengan `npm run chat:evaluate`.
- Pasang HTTPS melalui reverse proxy atau hosting platform.
- Review log runtime selama masa uji coba.

## Risiko yang Masih Ada

- Model Qwen LoRA belum disertakan di repository karena ukuran model dan adapter biasanya besar.
- Konfigurasi vLLM pada `docker-compose.prod.yml` masih template.
- CI hanya melakukan build; CD belum dibuat karena target hosting belum ditentukan.
- Quality assurance chatbot tetap perlu dilakukan dengan endpoint model asli.
