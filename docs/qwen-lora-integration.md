# Phase 2 — Qwen LoRA Integration Guide

Phase 2 menyiapkan koneksi chatbot portofolio ke model Qwen yang sudah menggunakan LoRA. File model/adaptor dapat disimpan di folder `models/`, tetapi Next.js tetap hanya menjadi web app dan API bridge; model Qwen LoRA harus dijalankan sebagai inference server terpisah.

## Provider yang Didukung

Project mendukung empat mode provider melalui `QWEN_PROVIDER`.

### 1. OpenAI-compatible

Gunakan mode ini untuk vLLM, LM Studio, llama.cpp server, atau server lain yang menyediakan endpoint seperti `/v1/chat/completions`.

```env
QWEN_PROVIDER=openai
QWEN_API_URL=http://qwen-lora:8000/v1/chat/completions
QWEN_MODEL=models/qwen-resume-lora-v2.zip
```

Payload yang dikirim:

```json
{
  "model": "models/qwen-resume-lora-v2.zip",
  "messages": [
    { "role": "system", "content": "portfolio context..." },
    { "role": "user", "content": "question..." }
  ],
  "temperature": 0.2,
  "max_tokens": 700,
  "stream": false
}
```

### 2. Ollama

Gunakan mode ini jika model Qwen LoRA sudah di-merge atau sudah tersedia sebagai model Ollama.

```env
QWEN_PROVIDER=ollama
QWEN_API_URL=http://ollama:11434/api/chat
QWEN_MODEL=models/qwen-resume-lora-v2.zip
```

Payload yang dikirim:

```json
{
  "model": "models/qwen-resume-lora-v2.zip",
  "messages": [],
  "stream": false,
  "options": {
    "temperature": 0.2,
    "num_predict": 700
  }
}
```

### 3. Hugging Face TGI

Gunakan mode ini jika model dilayani dengan Text Generation Inference.

```env
QWEN_PROVIDER=tgi
QWEN_API_URL=http://tgi:8080/generate
QWEN_MODEL=models/qwen-resume-lora-v2.zip
```

TGI menerima prompt tunggal, sehingga percakapan akan dikonversi menjadi format teks.

### 4. FastAPI Custom

Gunakan mode ini jika server model dibuat sendiri, misalnya Python FastAPI.

```env
QWEN_PROVIDER=fastapi
QWEN_API_URL=http://qwen-lora:8000/generate
QWEN_MODEL=models/qwen-resume-lora-v2.zip
```

Payload yang dikirim:

```json
{
  "model": "models/qwen-resume-lora-v2.zip",
  "question": "user question",
  "messages": [],
  "context": "portfolio context",
  "system_prompt": "system instruction",
  "temperature": 0.2,
  "max_tokens": 700
}
```

## Endpoint Health Check

Cek konfigurasi chatbot:

```bash
curl http://localhost:3000/api/chat/health
```

Respons contoh:

```json
{
  "status": "ok",
  "chatbot": {
    "endpointConfigured": true,
    "provider": "openai",
    "model": "models/qwen-resume-lora-v2.zip",
    "fallbackEnabled": true,
    "timeoutMs": 45000
  }
}
```

Health check ini tidak memanggil model. Fungsinya hanya memeriksa konfigurasi runtime.

## Smoke Test Chatbot

Setelah aplikasi berjalan:

```bash
npm run chat:test -- "Which projects involve NLP?"
```

Atau dengan Docker:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Which projects involve NLP?"}]}'
```

## Guardrail Jawaban

Prompt sistem memaksa chatbot untuk menjawab hanya berdasarkan konteks portofolio dan resume. Jika pertanyaan berada di luar data yang tersedia, chatbot diminta menyatakan bahwa informasinya tidak tersedia.

Fallback lokal tetap aktif jika `ENABLE_LOCAL_FALLBACK=true`. Ini berguna saat model server belum aktif, tetapi untuk validasi production sebaiknya fallback dimatikan sementara:

```env
ENABLE_LOCAL_FALLBACK=false
```

Dengan konfigurasi tersebut, error dari model server akan terlihat langsung dan tidak tertutup oleh fallback lokal.
