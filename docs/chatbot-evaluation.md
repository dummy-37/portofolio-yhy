# Phase 3 — Chatbot Evaluation and Guardrails

Phase ini menambahkan evaluasi kualitas chatbot agar jawaban lebih konsisten, tetap berbasis data portofolio/resume, dan tidak menjawab informasi yang tidak tersedia.

## Guardrail yang Ditambahkan

1. Chatbot diarahkan untuk menjawab hanya dari konteks portofolio dan resume.
2. Pertanyaan sensitif atau di luar portofolio diblokir sebelum dikirim ke model.
3. Jawaban diarahkan untuk menampilkan label sumber seperti `Profile`, `Skills`, `Projects`, `Experience`, `Education`, `Contact`, `Organisations`, atau `Model Setup`.
4. Runtime log sekarang menyimpan provider, status guardrail, source labels, dan pertanyaan.
5. Fallback lokal juga diberi source footer agar format jawaban konsisten.

## File Baru

- `lib/chat-guardrails.ts`: pemeriksaan scope, label sumber, dan jawaban out-of-scope.
- `tests/chat-eval-cases.json`: daftar pertanyaan uji untuk chatbot.
- `scripts/evaluate-chat.mjs`: script evaluasi otomatis berbasis API `/api/chat`.
- `docs/chatbot-evaluation.md`: dokumentasi phase ini.

## Cara Menjalankan Evaluasi

Pastikan aplikasi sedang berjalan.

```bash
npm run dev
```

Di terminal lain, jalankan:

```bash
npm run chat:evaluate
```

Atau jika aplikasi berjalan di host berbeda:

```bash
CHAT_API_URL=http://localhost:3000/api/chat npm run chat:evaluate
```

## Kriteria Uji Awal

Evaluasi awal mengecek tiga hal:

1. Jawaban mengandung keyword penting yang sesuai dengan pertanyaan.
2. Jawaban atau respons API memuat source label yang relevan.
3. Pertanyaan privat atau di luar portofolio diblokir dengan guardrail `blocked-out-of-scope`.

## Catatan

Evaluasi ini belum menggantikan penilaian manual. Untuk model Qwen LoRA yang sudah aktif, hasil jawaban tetap perlu dibaca ulang karena gaya bahasa dan kelengkapan jawaban dapat berubah sesuai konfigurasi model, temperature, dan adapter LoRA yang digunakan.
