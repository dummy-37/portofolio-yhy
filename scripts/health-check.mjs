#!/usr/bin/env node
const baseUrl = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

async function requestJson(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const text = await response.text();

  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }

  if (!response.ok) {
    throw new Error(`${pathname} returned HTTP ${response.status}: ${text.slice(0, 300)}`);
  }

  return json;
}

try {
  const health = await requestJson("/api/healthz");
  const readiness = await requestJson("/api/readiness");
  const chat = await requestJson("/api/chat/health");

  console.log(JSON.stringify({ health, readiness, chat }, null, 2));
  process.exit(0);
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown health-check error");
  process.exit(1);
}
