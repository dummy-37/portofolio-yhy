import { getPortfolioContext, fallbackPortfolioAnswer } from "./portfolio-context";
import { checkPortfolioScope, enforceSourceFooter, outOfScopeAnswer } from "./chat-guardrails";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type QwenProvider = "openai" | "ollama" | "tgi" | "fastapi";

export type ChatResult = {
  answer: string;
  provider:
    | "qwen-lora-openai"
    | "qwen-lora-ollama"
    | "qwen-lora-tgi"
    | "qwen-lora-fastapi"
    | "local-fallback";
  configuredProvider: QwenProvider | "none";
  sources: string[];
  guardrail: "portfolio-grounded" | "blocked-out-of-scope" | "local-fallback";
};

type ProviderPayload = {
  body: Record<string, unknown>;
};

const DEFAULT_MAX_TOKENS = 700;
const DEFAULT_TEMPERATURE = 0.2;
const DEFAULT_TIMEOUT_MS = 45_000;
const DEFAULT_QWEN_MODEL = "models/qwen-resume-lora-v2.zip";

function getProvider(): QwenProvider {
  const provider = (process.env.QWEN_PROVIDER || "openai").toLowerCase();

  if (["openai", "ollama", "tgi", "fastapi"].includes(provider)) {
    return provider as QwenProvider;
  }

  return "openai";
}

function getLastUserMessage(messages: ChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

function buildSystemPrompt(portfolioContext: string) {
  return `You are a portfolio assistant for Yahya Firdaus. Answer only from the provided portfolio and resume context. If the user asks something outside the context, say that the information is not available in the portfolio data. Keep answers concise, professional, and recruiter-friendly. Do not invent dates, companies, tools, salaries, private information, or links that are not present in the context. Never answer private or sensitive questions such as salary, identity numbers, home address, religion, political views, family status, or credentials. End every answer with one line in this exact format: Sources: <Profile|Skills|Projects|Experience|Education|Contact|Organisations|Model Setup>. Use only source labels that support the answer.\n\nPORTFOLIO_CONTEXT:\n${portfolioContext}`;
}

function buildSinglePrompt(systemPrompt: string, messages: ChatMessage[]) {
  const conversation = messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  return `${systemPrompt}\n\nCONVERSATION:\n${conversation}\n\nASSISTANT:`;
}

function extractNestedMessage(record: Record<string, unknown>) {
  const message = record.message;
  if (message && typeof message === "object") {
    const nested = message as Record<string, unknown>;
    if (typeof nested.content === "string") return nested.content;
  }

  return null;
}

function extractTextFromProvider(data: unknown): string | null {
  if (!data) return null;

  if (typeof data === "string") return data;

  if (Array.isArray(data)) {
    for (const item of data) {
      const extracted = extractTextFromProvider(item);
      if (extracted) return extracted;
    }
    return null;
  }

  if (typeof data !== "object") return null;

  const record = data as Record<string, unknown>;

  const directMessage = extractNestedMessage(record);
  if (directMessage) return directMessage;

  const choices = record.choices;
  if (Array.isArray(choices) && choices.length > 0) {
    const firstChoice = choices[0] as Record<string, unknown>;
    const message = firstChoice.message as Record<string, unknown> | undefined;
    if (typeof message?.content === "string") return message.content;
    if (typeof firstChoice.text === "string") return firstChoice.text;
    if (typeof firstChoice.delta === "object") {
      const delta = firstChoice.delta as Record<string, unknown>;
      if (typeof delta.content === "string") return delta.content;
    }
  }

  const knownTextFields = [
    "generated_text",
    "response",
    "answer",
    "content",
    "text",
    "output",
    "result"
  ];

  for (const field of knownTextFields) {
    if (typeof record[field] === "string") return record[field] as string;
  }

  return null;
}

function sanitizeAnswer(answer: string) {
  return answer.trim().replace(/^ASSISTANT:\s*/i, "").trim();
}

function buildProviderPayload({
  provider,
  model,
  systemPrompt,
  messages,
  lastQuestion,
  portfolioContext,
  maxTokens,
  temperature
}: {
  provider: QwenProvider;
  model: string;
  systemPrompt: string;
  messages: ChatMessage[];
  lastQuestion: string;
  portfolioContext: string;
  maxTokens: number;
  temperature: number;
}): ProviderPayload {
  if (provider === "ollama") {
    return {
      body: {
        model,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: false,
        options: {
          temperature,
          num_predict: maxTokens
        }
      }
    };
  }

  if (provider === "tgi") {
    return {
      body: {
        inputs: buildSinglePrompt(systemPrompt, messages),
        parameters: {
          max_new_tokens: maxTokens,
          temperature,
          return_full_text: false
        }
      }
    };
  }

  if (provider === "fastapi") {
    return {
      body: {
        model,
        question: lastQuestion,
        messages,
        context: portfolioContext,
        system_prompt: systemPrompt,
        temperature,
        max_tokens: maxTokens
      }
    };
  }

  return {
    body: {
      model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature,
      max_tokens: maxTokens,
      stream: false
    }
  };
}

function providerLabel(provider: QwenProvider): ChatResult["provider"] {
  if (provider === "ollama") return "qwen-lora-ollama";
  if (provider === "tgi") return "qwen-lora-tgi";
  if (provider === "fastapi") return "qwen-lora-fastapi";
  return "qwen-lora-openai";
}

async function postToQwenEndpoint({
  endpoint,
  apiKey,
  payload,
  timeoutMs
}: {
  endpoint: string;
  apiKey?: string;
  payload: ProviderPayload;
  timeoutMs: number;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify(payload.body),
      signal: controller.signal
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");
      throw new Error(
        `Qwen endpoint returned HTTP ${response.status}${responseText ? `: ${responseText.slice(0, 300)}` : ""}`
      );
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export function getQwenRuntimeConfig() {
  const endpoint = process.env.QWEN_API_URL || "";
  const provider = endpoint ? getProvider() : "none";

  return {
    endpointConfigured: Boolean(endpoint),
    provider,
    model: process.env.QWEN_MODEL || DEFAULT_QWEN_MODEL,
    fallbackEnabled: process.env.ENABLE_LOCAL_FALLBACK !== "false",
    timeoutMs: Number(process.env.QWEN_TIMEOUT_MS || DEFAULT_TIMEOUT_MS)
  };
}

export async function askPortfolioAssistant(messages: ChatMessage[]): Promise<ChatResult> {
  const endpoint = process.env.QWEN_API_URL;
  const provider = getProvider();
  const model = process.env.QWEN_MODEL || DEFAULT_QWEN_MODEL;
  const apiKey = process.env.QWEN_API_KEY;
  const allowFallback = process.env.ENABLE_LOCAL_FALLBACK !== "false";
  const timeoutMs = Number(process.env.QWEN_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);
  const maxTokens = Number(process.env.QWEN_MAX_TOKENS || DEFAULT_MAX_TOKENS);
  const temperature = Number(process.env.QWEN_TEMPERATURE || DEFAULT_TEMPERATURE);
  const lastQuestion = getLastUserMessage(messages);
  const scopeCheck = checkPortfolioScope(lastQuestion);

  if (!scopeCheck.allowed) {
    return {
      answer: enforceSourceFooter(outOfScopeAnswer(scopeCheck.reason), scopeCheck.sources),
      provider: "local-fallback",
      configuredProvider: endpoint ? provider : "none",
      sources: scopeCheck.sources,
      guardrail: "blocked-out-of-scope"
    };
  }

  const portfolioContext = getPortfolioContext();
  const systemPrompt = buildSystemPrompt(portfolioContext);

  if (!endpoint) {
    return {
      answer: enforceSourceFooter(fallbackPortfolioAnswer(lastQuestion), scopeCheck.sources),
      provider: "local-fallback",
      configuredProvider: "none",
      sources: scopeCheck.sources,
      guardrail: "local-fallback"
    };
  }

  try {
    const payload = buildProviderPayload({
      provider,
      model,
      systemPrompt,
      messages,
      lastQuestion,
      portfolioContext,
      maxTokens,
      temperature
    });

    const data = await postToQwenEndpoint({ endpoint, apiKey, payload, timeoutMs });
    const text = extractTextFromProvider(data);

    if (!text) {
      throw new Error("Qwen endpoint response did not contain a readable text field.");
    }

    return {
      answer: enforceSourceFooter(sanitizeAnswer(text), scopeCheck.sources),
      provider: providerLabel(provider),
      configuredProvider: provider,
      sources: scopeCheck.sources,
      guardrail: "portfolio-grounded"
    };
  } catch (error) {
    if (!allowFallback) {
      throw error;
    }

    const reason = error instanceof Error ? error.message : "unknown error";

    return {
      answer: enforceSourceFooter(
        `${fallbackPortfolioAnswer(lastQuestion)}\n\nNote: Qwen LoRA endpoint is not reachable or returned an invalid response, so this answer uses the local portfolio fallback. Reason: ${reason}`,
        scopeCheck.sources
      ),
      provider: "local-fallback",
      configuredProvider: provider,
      sources: scopeCheck.sources,
      guardrail: "local-fallback"
    };
  }
}
