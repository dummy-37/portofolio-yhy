export type SourceLabel =
  | "Profile"
  | "Skills"
  | "Projects"
  | "Experience"
  | "Education"
  | "Contact"
  | "Organisations"
  | "Model Setup";

export type ScopeCheck = {
  allowed: boolean;
  reason?: string;
  sources: SourceLabel[];
};

const sensitiveOrUnsupportedPatterns = [
  /\b(salary|compensation|gaji|upah|bayaran|rate card|fee)\b/i,
  /\b(date of birth|birthdate|birthday|tanggal lahir|umur|age)\b/i,
  /\b(married|wife|husband|girlfriend|boyfriend|pacar|istri|suami|menikah)\b/i,
  /\b(religion|agama|political|politics|partai|pilihan politik)\b/i,
  /\b(nik|ktp|passport|paspor|id card|nomor hp|phone number|alamat rumah|home address)\b/i,
  /\b(password|credential|secret|token|api key|private key)\b/i,
  /\b(weather|cuaca|stock price|harga saham|crypto price|harga crypto|recipe|resep)\b/i
];

const sourceKeywordMap: Array<{ label: SourceLabel; patterns: RegExp[] }> = [
  {
    label: "Profile",
    patterns: [/\b(profile|profil|about|tentang|headline|location|lokasi|summary|ringkasan)\b/i]
  },
  {
    label: "Skills",
    patterns: [
      /\b(skill|skills|keahlian|tech stack|stack|tools|python|django|flask|postgresql|docker|kubernetes|gcp|javascript|react|next\.js|php|laravel|golang|java|kotlin|database)\b/i
    ]
  },
  {
    label: "Projects",
    patterns: [
      /\b(project|projects|proyek|portfolio|portofolio|lms|allianz|permata|cimb|hana|bio farma|kreatif|ezmicbus|apl|delman|binus|django|flask|chatbot|nlp|nlu|speech|tableau|data warehouse|dashboard|netflix|xgboost|notebook|etl|analytics workspace|pdf export)\b/i
    ]
  },
  {
    label: "Experience",
    patterns: [/\b(experience|experiences|pengalaman|work|kerja|role|job|company|perusahaan|career|karier|developer|engineer)\b/i]
  },
  {
    label: "Education",
    patterns: [/\b(education|pendidikan|kuliah|university|universitas|upi|gpa|ipk|degree|sarjana|bachelor)\b/i]
  },
  {
    label: "Contact",
    patterns: [/\b(contact|kontak|email|linkedin|github|hubungi|resume|cv)\b/i]
  },
  {
    label: "Organisations",
    patterns: [/\b(organisation|organization|organisasi|bem|hima|volunteer)\b/i]
  },
  {
    label: "Model Setup",
    patterns: [/\b(qwen|lora|model|chatbot|inference|endpoint|ollama|vllm|tgi|fastapi)\b/i]
  }
];

export function getRelevantSourceLabels(question: string): SourceLabel[] {
  const labels = sourceKeywordMap
    .filter((item) => item.patterns.some((pattern) => pattern.test(question)))
    .map((item) => item.label);

  return Array.from(new Set(labels));
}

export function checkPortfolioScope(question: string): ScopeCheck {
  const trimmed = question.trim();
  const sources = getRelevantSourceLabels(trimmed);

  const unsupported = sensitiveOrUnsupportedPatterns.find((pattern) => pattern.test(trimmed));
  if (unsupported) {
    return {
      allowed: false,
      reason:
        "The question asks for private, sensitive, or non-portfolio information that is not available in the resume/portfolio context.",
      sources: sources.length > 0 ? sources : ["Profile"]
    };
  }

  return {
    allowed: true,
    sources: sources.length > 0 ? sources : ["Profile", "Projects", "Experience"]
  };
}

export function sourceFooter(labels: SourceLabel[]) {
  const uniqueLabels = Array.from(new Set(labels));
  return `\n\nSources: ${uniqueLabels.join(", ")}.`;
}

export function outOfScopeAnswer(reason?: string) {
  return [
    "I do not have that information in Yahya Firdaus' portfolio/resume data.",
    reason ? `Reason: ${reason}` : "Please ask about his profile, skills, projects, experience, education, or contact information."
  ].join(" ");
}

export function enforceSourceFooter(answer: string, labels: SourceLabel[]) {
  if (/\n\nSources:\s*/i.test(answer)) return answer.trim();
  return `${answer.trim()}${sourceFooter(labels)}`;
}

export function hasUnavailableInformationAnswer(answer: string) {
  return /not available|do not have|don't have|not provided|not included|tidak tersedia|tidak ada/i.test(answer);
}
