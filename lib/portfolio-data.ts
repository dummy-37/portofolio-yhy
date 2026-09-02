export type Skill = {
  name: string;
  tools: string[];
};

export type Project = {
  title: string;
  company?: string;
  period: string;
  role?: string;
  tech: string[];
  summary: string;
  category: "Backend" | "Chatbot" | "Data" | "Mobile" | "NLP" | "Personal" | "Microservice" | "AI";
};

export type Experience = {
  year: string;
  title: string;
  company: string;
  period: string;
  summary: string;
};

export const profile = {
  name: "Yahya Firdaus",
  role: "Software Engineer & Backend Developer",
  location: "Bandung, Indonesia",
  email: "yhy.frds@gmail.com",
  linkedin: "https://linkedin.com/in/yahyafirdaus",
  portfolio: "https://yahya-firdaus.github.io/portofolio/index.html",
  resumeUrl: "/resume/yahya-firdaus-resume.pdf",
  headline:
    "Backend-focused software engineer who builds reliable web systems, data pipelines, dashboards, chatbot products, NLP features, and AI-assisted analytics workflows.",
  about:
    "Bachelor of Computer Science from Universitas Pendidikan Indonesia with strong expertise in back-end development. Skilled in PHP, Python, Java, JavaScript, Go, and C#, with experience in Laravel, Echo, Next.js, ASP.NET, Django, and Flask. Interests include NLP, Data Engineering, and Machine Learning."
};

export const stats = [
  { label: "Years of Experience", value: "~5" },
  { label: "Main Track", value: "Backend" },
  { label: "Strong Stack", value: "Python/Django" },
  { label: "Interest", value: "NLP, Data & AI" }
];

export const skills: Skill[] = [
  { name: "Python", tools: ["Django", "Flask"] },
  { name: "C#", tools: ["ASP.NET"] },
  { name: "Golang", tools: ["Echo"] },
  { name: "PHP", tools: ["Laravel", "CodeIgniter"] },
  { name: "Java", tools: ["Android Studio", "Spring Boot"] },
  { name: "JavaScript", tools: ["Next.js", "React.js"] },
  { name: "Kotlin", tools: ["Android Studio"] },
  { name: "Chatbot", tools: ["platform.kata.ai", "Qiscus"] },
  { name: "NLP", tools: ["Speech Recognition", "NLU", "Text-to-Speech", "CMUSphinx"] },
  { name: "Database", tools: ["PostgreSQL", "SQL Server", "MySQL", "MongoDB", "Stored Procedures"] },
  { name: "Data Engineering", tools: ["Data Warehouse", "Tableau", "GCP"] },
  { name: "DevOps", tools: ["Docker", "Kubernetes", "GCP"] }
];

export const projects: Project[] = [
  {
    title: "Netflix Data Warehouse AI Workspace",
    period: "2026",
    role: "Personal Project",
    tech: [
      "Data Warehouse",
      "ETL Pipeline",
      "Dashboard Builder",
      "SQL Workspace",
      "AI Assistant",
      "Notebook",
      "XGBoost",
      "PDF Export",
      "Go",
      "Python",
      "Next.js",
      "PostgreSQL"
    ],
    category: "Data",
    summary:
      "Built a personal data warehouse analytics workspace for Netflix film and rating data. The system is built with Go for high-performance API endpoint processing, Python for its extensive data science and machine learning library ecosystem, Next.js as the modern frontend framework, and PostgreSQL as the underlying relational database. The system includes CSV source nodes, join pipelines, dashboard creation, AI-assisted widget generation, analytics dashboards, notebook-based XGBoost experimentation, and PDF export for reporting."
  },
  {
    title: "SAM LCM / PTEN",
    company: "Delman.io",
    period: "May 2025 – Sep 2025",
    role: "Backend Developer (Data) | Delman Data Lab",
    tech: ["Python", "Flask", "PostgreSQL", "Tableau", "GCP"],
    category: "Data",
    summary:
      "Developed documentation, learned database structures, processed data inside a data warehouse, prepared data for Tableau visualization, and created SIT documentation."
  },
  {
    title: "Binus Website",
    company: "Delman.io",
    period: "May 2025 – Sep 2025",
    role: "Backend Developer (Website)",
    tech: ["Python", "Flask", "Cursor"],
    category: "Backend",
    summary:
      "Maintained the website, managed database operations, identified and fixed existing errors, and produced technical documentation for development and operational work."
  },
  {
    title: "LMS Allianz",
    company: "PT Netpolitan",
    period: "May 2024 – May 2025",
    role: "Django Developer",
    tech: ["Python", "Django", "PostgreSQL", "Java", "Spring Boot", "Docker", "GCP"],
    category: "Backend",
    summary:
      "Developed and maintained a learning management system, built custom features, created integrations, managed deployment, and created reporting systems."
  },
  {
    title: "LMS Permata",
    company: "PT Netpolitan",
    period: "May 2024 – May 2025",
    role: "Django Developer",
    tech: ["Python", "Django", "PostgreSQL", "Docker"],
    category: "Backend",
    summary:
      "Led development and maintenance of an LMS, covering feature development, deployment management, documentation, and reliability improvements."
  },
  {
    title: "LMS CIMB",
    company: "PT Netpolitan",
    period: "May 2024 – May 2025",
    role: "Django Developer",
    tech: ["Python", "Django", "PostgreSQL", "Google Colab", "GCP", "Docker"],
    category: "Backend",
    summary:
      "Implemented LMS features, handled complex data migration, developed automated reporting, maintained documentation, and supported continuous improvement."
  },
  {
    title: "LMS Bina Pertiwi",
    company: "PT Netpolitan",
    period: "May 2024 – May 2025",
    role: "Django Developer",
    tech: ["Python", "Django", "PostgreSQL", "Docker"],
    category: "Backend",
    summary:
      "Maintained web-based learning solutions, developed new features, managed deployment, and created automated systems with technical documentation."
  },
  {
    title: "LMS Hana Bank",
    company: "PT Netpolitan",
    period: "May 2024 – May 2025",
    role: "Django Developer",
    tech: ["Python", "Django", "PostgreSQL", "Docker"],
    category: "Backend",
    summary:
      "Managed LMS development, implemented features, handled data migration, built automated reporting, and maintained documentation."
  },
  {
    title: "Ezmicbus / APL",
    company: "Radya Digital",
    period: "Jan 2022 – Sep 2022",
    role: "Web Developer",
    tech: ["C#", "ASP.NET", "SQL Server", "Ocelot", "Docker", "Kubernetes"],
    category: "Microservice",
    summary:
      "Transformed a monolithic website into a microservice architecture, created APIs, designed database structures, and managed deployments."
  },
  {
    title: "Chatbot Sales Frissian Flag",
    company: "Radya Digital",
    period: "Sep 2022 – Apr 2023",
    role: "Chatbot Developer",
    tech: ["XAML", "platform.kata.ai", "C#", "ASP.NET", "SQL Server", "Qiscus"],
    category: "Chatbot",
    summary:
      "Developed a sales chatbot, created the admin page, designed database structures, wrote documentation, and maintained deployment."
  },
  {
    title: "Chatbot Mitsubishi",
    company: "Radya Digital",
    period: "Apr 2023 – Oct 2023",
    role: "Chatbot Developer",
    tech: ["XAML", "platform.kata.ai", "C#", "ASP.NET", "SQL Server", "Qiscus"],
    category: "Chatbot",
    summary:
      "Maintained and enhanced chatbot systems, managed admin pages, created technical documentation, and handled deployment processes."
  },
  {
    title: "Website TNI",
    company: "PT Ciheul Technologies",
    period: "Feb 2021 – Jan 2022",
    role: "Software Engineer",
    tech: ["Python", "Django", "PostgreSQL"],
    category: "Backend",
    summary:
      "Contributed to website development and maintenance, initiated new projects using templates, created documentation, and handled deployment."
  },
  {
    title: "Speech Recognition and Text-to-Speech",
    company: "NLP LCI",
    period: "Jan 2021 – Feb 2021",
    role: "NLP Engineer",
    tech: ["Python", "Flask", "SQLite", "CMUSphinx"],
    category: "NLP",
    summary:
      "Researched speech recognition, developed CMUSphinx-based models, implemented text-to-speech, integrated models into a website, and deployed the system."
  },
  {
    title: "Konsultasi Dokter / Indihealth, LintasArta",
    company: "SCCIC ITB, Indihealth",
    period: "Sep 2020 – Nov 2020",
    role: "Mobile Developer",
    tech: ["Kotlin", "Android Studio"],
    category: "Mobile",
    summary:
      "Developed and maintained a doctor consultation mobile app and created API documentation for system integration."
  },
  {
    title: "Kartu Imunisasi Digital",
    company: "Bio Farma",
    period: "Sep 2019 – Feb 2020",
    role: "Web Developer",
    tech: ["C#", "ASP.NET", "Microsoft SQL Server", "Stored Procedures"],
    category: "Backend",
    summary:
      "Developed user and admin websites for a digital immunization card system, designed database structures, implemented stored procedures, and managed deployment."
  },
  {
    title: "Kreatif.ai",
    period: "2025",
    role: "Personal Project",
    tech: ["React.js", "AI Models"],
    category: "Personal",
    summary: "Added features and fixed bugs on an AI-based website built with React.js and multiple AI models."
  },
  {
    title: "Django Project - Report Page",
    period: "2025",
    role: "Personal Project",
    tech: ["Python", "Django", "PostgreSQL"],
    category: "Personal",
    summary: "Developed report pages and website maintenance menus for a Django and PostgreSQL-based web project."
  },
  {
    title: "Android Application",
    period: "2024",
    role: "Personal Project",
    tech: ["Java", "Android Studio"],
    category: "Personal",
    summary: "Developed an Android application using Java for a master's student project."
  }
];

export const experiences: Experience[] = [
  {
    year: "2025",
    title: "Backend Developer",
    company: "PT Netpolitan",
    period: "Nov 2025 – Present",
    summary:
      "Managed reporting and data processing for multiple LMS projects serving Allianz, Permata, CIMB, Bina Pertiwi, Superbank, and Hana Bank. Extracted, cleaned, validated, and processed LMS database data for operational and client reporting, supported data migration and reconciliation, and documented workflows to keep LMS operations stable."
  },
  {
    year: "2025",
    title: "Backend Developer | Data Engineer",
    company: "Delman.io",
    period: "May 2025 – Nov 2025",
    summary:
      "Worked on SAM LCM/PTEN data initiatives and Binus website maintenance using Python, Flask, PostgreSQL, Tableau, GCP, and Cursor. Processed data in the data warehouse, prepared Tableau visualization inputs, managed database operations, resolved website issues, and created technical and SIT documentation."
  },
  {
    year: "2024",
    title: "Django Developer",
    company: "PT Netpolitan",
    period: "May 2024 – May 2025",
    summary:
      "Developed and maintained LMS platforms for Allianz, Permata, CIMB, Bina Pertiwi, and Hana Bank using Django, PostgreSQL, Docker, and GCP."
  },
  {
    year: "2022",
    title: "Web Developer",
    company: "Radya Digital",
    period: "Jan 2022 – Oct 2023",
    summary:
      "Built microservice-based web systems and chatbot solutions using ASP.NET, SQL Server, Ocelot, Docker, Kubernetes, platform.kata.ai, and Qiscus."
  },
  {
    year: "2021",
    title: "Software Engineer",
    company: "PT Ciheul Technologies",
    period: "Feb 2021 – Jan 2022",
    summary: "Developed and maintained websites using Python, Django, and PostgreSQL."
  },
  {
    year: "2021",
    title: "NLP Engineer",
    company: "NLP LCI",
    period: "Jan 2021 – Feb 2021",
    summary: "Conducted speech recognition research and built speech-to-text and text-to-speech web integrations."
  },
  {
    year: "2020",
    title: "Mobile Developer",
    company: "SCCIC ITB, Indihealth",
    period: "Sep 2020 – Nov 2020",
    summary: "Built and maintained a doctor consultation Android application using Kotlin."
  },
  {
    year: "2019",
    title: "Web Developer",
    company: "Bio Farma",
    period: "Sep 2019 – Feb 2020",
    summary: "Developed a digital immunization card system using ASP.NET, SQL Server, and stored procedures."
  }
];

export const education = [
  {
    title: "Bachelor of Computer Science",
    institution: "Universitas Pendidikan Indonesia",
    period: "2016 – 2020",
    detail: "GPA: 3.70/4.00"
  },
  {
    title: "IPA",
    institution: "SMAN 13 Bandung",
    period: "2013 – 2016",
    detail: "Science track"
  }
];

export const organisations = [
  "DINAMIK UPI 12 — Logistics Staff",
  "DINAMIK UPI 13 — Logistics Staff",
  "P2M Kemakom UPI — Logistics Staff",
  "KSE UPI Try Out Event — Head of Publication, Documentation, and Decoration Division"
];
