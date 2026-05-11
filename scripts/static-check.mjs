import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "app/page.tsx",
  "app/globals.css",
  "components/Header.tsx",
  "components/Hero.tsx",
  "components/Skills.tsx",
  "components/FeaturedDataWarehouse.tsx",
  "components/Projects.tsx",
  "components/Resume.tsx",
  "components/ChatWidget.tsx",
  "components/Tooltip.tsx",
  "components/ParticleBackground.tsx",
  "public/resume/yahya-firdaus-resume.pdf",
  "public/projects/data-warehouse-workspace.webp",
  "public/projects/data-warehouse-ai-dashboard.webp",
  "public/projects/data-warehouse-polished-dashboard.webp",
  "public/projects/data-warehouse-notebook.webp"
];

const requiredCssClasses = [
  ".site-header",
  ".hero",
  ".featured-card",
  ".chat-launcher",
  ".chat-panel",
  ".floating-assistant",
  ".tooltip",
  ".tooltip-bubble",
  ".particle-background",
  ".assistant-orb",
  ".chat-launcher-open"
];

const missingFiles = requiredFiles.filter((file) => !existsSync(file));
if (missingFiles.length) {
  console.error("Missing required files:", missingFiles.join(", "));
  process.exit(1);
}

const css = readFileSync("app/globals.css", "utf8");
const missingClasses = requiredCssClasses.filter((className) => !css.includes(className));
if (missingClasses.length) {
  console.error("Missing CSS classes:", missingClasses.join(", "));
  process.exit(1);
}

const chat = readFileSync("components/ChatWidget.tsx", "utf8");
if (!chat.includes("floating-assistant") || !chat.includes("chat-launcher") || !chat.includes("AssistantOrb")) {
  console.error("Chat widget is not implemented as a floating assistant.");
  process.exit(1);
}

console.log("Static checks passed: layout files, assets, particle background, tooltip classes, and improved floating chatbot icon are present.");
