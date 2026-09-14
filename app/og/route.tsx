import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 70px", background: "#f4f0e7", color: "#222623", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", color: "#a7472d", fontSize: 23, letterSpacing: 4 }}>YAHYA FIRDAUS / PORTFOLIO</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>Yahya Firdaus</div>
          <div style={{ display: "flex", fontSize: 30 }}>Software engineer &amp; backend developer</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #a7472d", paddingTop: 24, fontSize: 19 }}>
          <span>Backend systems · Data pipelines · AI</span><span>portofolio.axentraproject.site</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
