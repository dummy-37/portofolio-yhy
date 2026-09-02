import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const [phaseTitle, phaseDescription] = process.argv.slice(2);

if (!phaseTitle || !phaseDescription) {
  console.error('Usage: npm run phase:log -- "Phase title" "What was completed"');
  process.exit(1);
}

const logDir = path.join(process.cwd(), "logs");
const logPath = path.join(logDir, "phase-log.md");
const entry = `\n## ${phaseTitle}\n\nStatus: Done\nDate: ${new Date().toISOString().slice(0, 10)}\n\n${phaseDescription}\n`;

await mkdir(logDir, { recursive: true });
await appendFile(logPath, entry, "utf8");
console.log(`Phase log updated: ${logPath}`);
