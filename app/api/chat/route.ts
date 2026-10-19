import { NextResponse } from "next/server";
import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { askPortfolioAssistant, type ChatMessage } from "@/lib/qwen-client";

export const runtime = "nodejs";

type ChatRequest = {
  messages?: ChatMessage[];
};

function isValidMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") return false;
  const record = message as Record<string, unknown>;
  return (
    typeof record.content === "string" &&
    ["user", "assistant"].includes(String(record.role))
  );
}

async function writeChatLog(question: string, provider: string, guardrail: string, sources: string[]) {
  const logDir = path.join(process.cwd(), "logs");
  const logPath = path.join(logDir, "chat-runtime.log");
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    provider,
    guardrail,
    sources,
    question
  });

  await mkdir(logDir, { recursive: true });
  await appendFile(logPath, `${line}\n`, "utf8");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const messages = body.messages ?? [];

    if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
      return NextResponse.json(
        { error: "Request body must contain a non-empty messages array." },
        { status: 400 }
      );
    }

    const result = await askPortfolioAssistant(messages);
    const lastQuestion = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
    await writeChatLog(lastQuestion, result.provider, result.guardrail, result.sources);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected chatbot error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
