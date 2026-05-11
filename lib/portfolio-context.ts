import { education, experiences, organisations, profile, projects, skills, stats } from "./portfolio-data";

export function getPortfolioContext() {
  const skillText = skills.map((skill) => `${skill.name}: ${skill.tools.join(", ")}`).join("\n");
  const projectText = projects
    .map(
      (project) =>
        `- ${project.title}${project.company ? ` at ${project.company}` : ""} (${project.period}). Role: ${project.role ?? "-"}. Tech: ${project.tech.join(", ")}. Summary: ${project.summary}`
    )
    .join("\n");
  const experienceText = experiences
    .map((item) => `- ${item.year}: ${item.title} at ${item.company} (${item.period}). ${item.summary}`)
    .join("\n");
  const educationText = education
    .map((item) => `- ${item.title}, ${item.institution}, ${item.period}. ${item.detail}`)
    .join("\n");

  return `
PROFILE
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
Resume: ${profile.resumeUrl}
Headline: ${profile.headline}
About: ${profile.about}

STATS
${stats.map((item) => `- ${item.label}: ${item.value}`).join("\n")}

SKILLS
${skillText}

PROJECTS
${projectText}

EXPERIENCE
${experienceText}

EDUCATION
${educationText}

ORGANISATIONS
${organisations.map((item) => `- ${item}`).join("\n")}
`.trim();
}

export function fallbackPortfolioAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("email") || q.includes("contact") || q.includes("kontak") || q.includes("hubungi")) {
    return `Yahya Firdaus can be contacted through ${profile.email}. LinkedIn: ${profile.linkedin}.`;
  }

  if (q.includes("skill") || q.includes("keahlian") || q.includes("tech") || q.includes("stack")) {
    return `Yahya's strongest areas are backend development, Python/Django, Flask, PostgreSQL, Docker, data engineering, chatbot development, and NLP. He also has experience with C#, ASP.NET, PHP, Laravel, Java, JavaScript, Next.js, React.js, Go, Kotlin, SQL Server, MySQL, MongoDB, Tableau, and GCP.`;
  }

  if (q.includes("netflix") || q.includes("dashboard") || q.includes("warehouse") || q.includes("xgboost")) {
    return `Yahya has a personal project called Netflix Data Warehouse AI Workspace. It combines Netflix film and rating datasets through pipeline nodes, supports joined data exploration, dashboard creation, AI-assisted widget generation, notebook-based XGBoost experimentation for IMDb score prediction, and PDF export for reporting.`;
  }

  if (q.includes("project") || q.includes("proyek") || q.includes("portfolio")) {
    const highlighted = projects.slice(0, 6).map((item) => item.title).join(", ");
    return `Some highlighted projects are ${highlighted}. His portfolio covers data warehouse analytics, LMS development, chatbot systems, microservice migration, NLP speech systems, and mobile applications.`;
  }

  if (q.includes("experience") || q.includes("pengalaman") || q.includes("kerja")) {
    return `Yahya has around five years of experience. Recent roles include Backend Developer at PT Netpolitan from Nov 2025 to Present, Backend Developer/Data Engineer at Delman.io from May 2025 to Nov 2025, Django Developer at PT Netpolitan from May 2024 to May 2025, Web Developer at Radya Digital, Software Engineer at PT Ciheul Technologies, NLP Engineer at NLP LCI, Mobile Developer at SCCIC ITB/Indihealth, and Web Developer at Bio Farma.`;
  }

  if (q.includes("education") || q.includes("pendidikan") || q.includes("kuliah") || q.includes("gpa")) {
    return `Yahya holds a Bachelor of Computer Science from Universitas Pendidikan Indonesia with a GPA of 3.70/4.00.`;
  }

  if (q.includes("qwen") || q.includes("lora") || q.includes("model")) {
    return `This chatbot is prepared for a Qwen model that has been adapted with LoRA. Add the deployed model endpoint to QWEN_API_URL and the model name to QWEN_MODEL in the .env file.`;
  }

  return `I can answer questions about Yahya Firdaus' profile, skills, projects, experience, education, and contact information. Ask about his backend experience, Django projects, chatbot projects, NLP work, data engineering, or resume details.`;
}
