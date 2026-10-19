import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "yahya-portfolio-qwen-next",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
}
