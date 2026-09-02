import { NextResponse } from "next/server";
import { access, mkdir } from "fs/promises";
import path from "path";
import { getQwenRuntimeConfig } from "@/lib/qwen-client";

export const runtime = "nodejs";

type Check = {
  name: string;
  status: "ok" | "warning" | "error";
  message: string;
};

async function checkLogsDirectory(): Promise<Check> {
  const logDir = path.join(process.cwd(), "logs");

  try {
    await mkdir(logDir, { recursive: true });
    await access(logDir);
    return {
      name: "logs-directory",
      status: "ok",
      message: "logs directory is available"
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown file-system error";
    return {
      name: "logs-directory",
      status: "error",
      message
    };
  }
}

function checkQwenConfig(): Check {
  const config = getQwenRuntimeConfig();

  if (config.endpointConfigured) {
    return {
      name: "qwen-runtime",
      status: "ok",
      message: `provider=${config.provider}, model=${config.model}, timeoutMs=${config.timeoutMs}`
    };
  }

  if (config.fallbackEnabled) {
    return {
      name: "qwen-runtime",
      status: "warning",
      message: "QWEN_API_URL is not configured; local fallback is enabled"
    };
  }

  return {
    name: "qwen-runtime",
    status: "error",
    message: "QWEN_API_URL is not configured and fallback is disabled"
  };
}

export async function GET() {
  const checks = [await checkLogsDirectory(), checkQwenConfig()];
  const hasError = checks.some((check) => check.status === "error");
  const hasWarning = checks.some((check) => check.status === "warning");

  return NextResponse.json(
    {
      status: hasError ? "error" : hasWarning ? "warning" : "ok",
      checks,
      timestamp: new Date().toISOString()
    },
    { status: hasError ? 503 : 200 }
  );
}
