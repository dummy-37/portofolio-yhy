import fs from "node:fs/promises";

const apiUrl = process.env.CHAT_API_URL || "http://localhost:3000/api/chat";
const casesPath = process.argv[2] || "tests/chat-eval-cases.json";

function includesKeyword(answer, keyword) {
  return answer.toLowerCase().includes(String(keyword).toLowerCase());
}

async function ask(question) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: question }] })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }

  return data;
}

async function main() {
  const rawCases = await fs.readFile(casesPath, "utf8");
  const testCases = JSON.parse(rawCases);
  const results = [];

  for (const testCase of testCases) {
    const data = await ask(testCase.question);
    const answer = String(data.answer || "");
    const sources = Array.isArray(data.sources) ? data.sources : [];

    const missingKeywords = (testCase.expectedKeywords || []).filter(
      (keyword) => !includesKeyword(answer, keyword)
    );
    const missingSources = (testCase.expectedSources || []).filter(
      (source) => !sources.includes(source) && !answer.toLowerCase().includes(source.toLowerCase())
    );
    const blockFailed = testCase.mustBlock && data.guardrail !== "blocked-out-of-scope";

    results.push({
      id: testCase.id,
      passed: missingKeywords.length === 0 && missingSources.length === 0 && !blockFailed,
      guardrail: data.guardrail,
      provider: data.provider,
      sources,
      missingKeywords,
      missingSources,
      blockFailed,
      answerPreview: answer.slice(0, 220)
    });
  }

  const passed = results.filter((item) => item.passed).length;
  const failed = results.length - passed;

  console.table(
    results.map((item) => ({
      id: item.id,
      passed: item.passed,
      guardrail: item.guardrail,
      provider: item.provider,
      sources: item.sources.join("|")
    }))
  );

  if (failed > 0) {
    console.log(JSON.stringify(results.filter((item) => !item.passed), null, 2));
    process.exitCode = 1;
  }

  console.log(`Evaluation completed. Passed: ${passed}. Failed: ${failed}.`);
}

main().catch((error) => {
  console.error(`Evaluation failed: ${error.message}`);
  process.exit(1);
});
