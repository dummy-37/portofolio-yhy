import { NextResponse } from "next/server";
import { getQwenRuntimeConfig } from "@/lib/qwen-client";

export const runtime = "nodejs";

export async function GET() {
  const config = getQwenRuntimeConfig();

  return NextResponse.json({
    status: "ok",
    chatbot: {
      endpointConfigured: config.endpointConfigured,
      provider: config.provider,
      model: config.model,
      fallbackEnabled: config.fallbackEnabled,
      timeoutMs: config.timeoutMs
    }
  });
}
