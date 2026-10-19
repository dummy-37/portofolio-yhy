#!/usr/bin/env node
import { existsSync, readFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const envFile = process.argv[2] || ".env.production";
const envPath = path.join(root, envFile);

function parseEnv(content) {
  const output = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    output[key] = value;
  }

  return output;
}

function result(status, label, message) {
  return { status, label, message };
}

function printResult(item) {
  const prefix = item.status === "ok" ? "OK" : item.status === "warn" ? "WARN" : "ERROR";
  console.log(`[${prefix}] ${item.label}: ${item.message}`);
}

const checks = [];

checks.push(
  existsSync(path.join(root, "Dockerfile"))
    ? result("ok", "Dockerfile", "found")
    : result("error", "Dockerfile", "missing")
);

checks.push(
  existsSync(path.join(root, "docker-compose.prod.yml"))
    ? result("ok", "docker-compose.prod.yml", "found")
    : result("error", "docker-compose.prod.yml", "missing")
);

checks.push(
  existsSync(envPath)
    ? result("ok", envFile, "found")
    : result("warn", envFile, `missing; copy .env.production.example to ${envFile}`)
);

const env = existsSync(envPath)
  ? parseEnv(readFileSync(envPath, "utf8"))
  : parseEnv(readFileSync(path.join(root, ".env.production.example"), "utf8"));

const supportedProviders = new Set(["openai", "ollama", "tgi", "fastapi"]);
const provider = env.QWEN_PROVIDER || "openai";
const model = env.QWEN_MODEL || "models/qwen-resume-lora-v2.zip";
const fallbackEnabled = env.ENABLE_LOCAL_FALLBACK !== "false";

checks.push(
  supportedProviders.has(provider)
    ? result("ok", "QWEN_PROVIDER", provider)
    : result("error", "QWEN_PROVIDER", `${provider} is not supported`)
);

if (env.QWEN_API_URL) {
  checks.push(result("ok", "QWEN_API_URL", env.QWEN_API_URL));
} else if (fallbackEnabled) {
  checks.push(result("warn", "QWEN_API_URL", "empty; local fallback will answer until Qwen is connected"));
} else {
  checks.push(result("error", "QWEN_API_URL", "empty and ENABLE_LOCAL_FALLBACK=false"));
}

checks.push(result("ok", "QWEN_MODEL", model));

if ((model.startsWith(".") || model.startsWith("models/") || model.endsWith(".zip")) && !model.startsWith("/")) {
  const modelPath = path.resolve(root, model);
  checks.push(
    existsSync(modelPath)
      ? result("ok", "QWEN_MODEL file", `${model} found`)
      : result("warn", "QWEN_MODEL file", `${model} not found in project`)
  );
}

checks.push(
  env.NEXT_PUBLIC_SITE_URL && !env.NEXT_PUBLIC_SITE_URL.includes("example.com")
    ? result("ok", "NEXT_PUBLIC_SITE_URL", env.NEXT_PUBLIC_SITE_URL)
    : result("warn", "NEXT_PUBLIC_SITE_URL", "replace the placeholder with the production domain")
);

const timeoutMs = Number(env.QWEN_TIMEOUT_MS || 45_000);
checks.push(
  Number.isFinite(timeoutMs) && timeoutMs >= 5_000
    ? result("ok", "QWEN_TIMEOUT_MS", String(timeoutMs))
    : result("warn", "QWEN_TIMEOUT_MS", "use a numeric value of at least 5000")
);

try {
  mkdirSync(path.join(root, "logs"), { recursive: true });
  checks.push(result("ok", "logs", "directory is writable or can be created"));
} catch (error) {
  checks.push(result("error", "logs", error instanceof Error ? error.message : "not writable"));
}

for (const item of checks) printResult(item);

const hasError = checks.some((item) => item.status === "error");
const hasWarning = checks.some((item) => item.status === "warn");

if (hasError) {
  console.error("\nDeployment config check failed.");
  process.exit(1);
}

if (hasWarning) {
  console.warn("\nDeployment config check passed with warnings.");
  process.exit(0);
}

console.log("\nDeployment config check passed.");
