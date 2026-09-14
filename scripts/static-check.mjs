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
  "public/projects/data-warehouse-01-login-20260908.png",
  "public/projects/data-warehouse-02-workspaces-20260908.png",
  "public/projects/data-warehouse-03-pipeline-20260908.png",
  "public/projects/data-warehouse-04-dictionary-20260908.png",
  "public/projects/data-warehouse-05-dashboard-20260908.png",
  "public/projects/data-warehouse-06-dashboard-editor-20260908.png",
  "public/projects/data-warehouse-07-consumer-20260908.png",
  "public/projects/data-warehouse-08-admin-20260908.png"
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
const featured = readFileSync("components/FeaturedDataWarehouse.tsx", "utf8");
const screenshotPaths = [...featured.matchAll(/src: "(\/projects\/[^\"]+)"/g)].map((match) => `public${match[1]}`);
const expectedScreenshots = requiredFiles.filter((file) => file.startsWith("public/projects/"));
if (JSON.stringify(screenshotPaths) !== JSON.stringify(expectedScreenshots)) {
  console.error("Featured Data Warehouse must display the eight current screenshots in order.");
  process.exit(1);
}

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
