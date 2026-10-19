const baseUrl = process.env.PORTFOLIO_BASE_URL || "http://localhost:3000";
const question = process.argv.slice(2).join(" ") || "Summarize Yahya's Django experience.";

const response = await fetch(`${baseUrl}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: question }]
  })
});

const data = await response.json();

if (!response.ok) {
  console.error(data);
  process.exit(1);
}

console.log(JSON.stringify(data, null, 2));
