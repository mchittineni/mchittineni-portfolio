// Repositories and the language palette used to render their composition.
export const langColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HCL: '#844FBA',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Makefile: '#427819',
  Dockerfile: '#384d54',
  Batchfile: '#C1F12E',
  TeX: '#3D6117',
  'Open Policy Agent': '#7d9199',
  'Jupyter Notebook': '#DA5B0B',
  Mermaid: '#ff3670',
  Vue: '#41b883',
}

export const projectCategories = [
  'All',
  'Cloud & IaC',
  'AI & Automation',
  'Web & Geospatial',
  'Research & Open Source',
]

export const highlights = [
  {
    title: 'Multi-Cloud Terraform IaC',
    badge: 'Kubernetes & IaC',
    description: '25+ reusable modules · AWS & GCP · remote state · Checkov & tfsec validation',
  },
  {
    title: 'Managed GKE Platform',
    badge: 'Platform Engineering',
    description: 'Snowflake & Databricks · 99.9% uptime · −25% compute waste',
  },
  {
    title: 'Databricks Data Platform',
    badge: 'Data Governance',
    description: 'Unity Catalog · workspace policies · automated job orchestration',
  },
  {
    title: 'Agentic AI & MCP Tooling',
    badge: 'GenAI Engineering',
    description: 'Claude API · OpenAI · Model Context Protocol (MCP) · Bedrock + Vertex AI',
  },
]

export const projects = [
  {
    name: 'Crown Corridor',
    category: 'Web & Geospatial',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-4m0 4h4m-4-4l-4 4m4-4l4 4',
    description:
      'A next-generation real estate and property discovery portal for Andhra Pradesh and Telangana. Verified listings, interactive geospatial maps, state-modular SRO property sale histories, guidance value estimation and CAGR market analytics, deployed on an AWS Terraform reference architecture.',
    // Repository is not published yet — confirm the slug when it goes live.
    githubUrl: 'https://github.com/mchittineni/crown-corridor',
    // Placeholder composition; refresh from the GitHub languages API after the first push.
    languages: [
      { name: 'Python', percentage: 46.3 },
      { name: 'HCL', percentage: 20.4 },
      { name: 'JavaScript', percentage: 11.6 },
      { name: 'TeX', percentage: 11.1 },
      { name: 'HTML', percentage: 4.3 },
      { name: 'CSS', percentage: 2.7 },
      { name: 'Open Policy Agent', percentage: 1.8 },
    ],
  },
  {
    name: 'Repo Radar',
    category: 'AI & Automation',
    icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
    description:
      'A self-updating GitHub dashboard. Discovers every repository you own, then renders stars, CI status, commit cadence, activity and language mix straight into README.md on a schedule — no server, just a GitHub Actions job and the GitHub API.',
    githubUrl: 'https://github.com/mchittineni/repo-radar',
    languages: [
      { name: 'Python', percentage: 93.5 },
      { name: 'Shell', percentage: 6.5 },
    ],
  },
  {
    name: 'Indian Village Finder',
    category: 'Web & Geospatial',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    description:
      'Interactive maps & search for Indian villages. Administrative hierarchies (LGD data) integrated with live market prices, farm schemes & soil profiles, covering Hindi, Telugu, Tamil, Kannada and Urdu.',
    githubUrl: 'https://github.com/mchittineni/india-village-finder',
    liveUrl: 'https://mchittineni.github.io/india-village-finder/',
    languages: [
      { name: 'JavaScript', percentage: 60.3 },
      { name: 'Python', percentage: 31.8 },
      { name: 'HTML', percentage: 4.1 },
      { name: 'CSS', percentage: 3.7 },
    ],
  },
  {
    name: 'tf-arch Diagram Generator',
    category: 'Cloud & IaC',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    description:
      'Turn any Terraform plan into an interactive cloud architecture diagram for AWS, Google Cloud and Azure. Ships as a CLI, a browser viewer and an npm library, with a Homebrew tap for one-command install.',
    githubUrl: 'https://github.com/mchittineni/tf-arch-diagram-generator',
    liveUrl: 'https://mchittineni.github.io/tf-arch-diagram-generator/',
    languages: [
      { name: 'JavaScript', percentage: 89.8 },
      { name: 'Python', percentage: 5.0 },
      { name: 'CSS', percentage: 4.9 },
    ],
  },
  {
    name: 'IaCSecBench',
    category: 'Research & Open Source',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    description:
      'An open framework and empirical benchmark for evaluating Infrastructure-as-Code security gates. 48 admissible cases across 26 vulnerable and 22 compliant configurations, exercising 22 of 26 canonical controls against static analysis tools, policy engines and secret detection suites. Every published figure is regenerated from recorded scanner output, and the work is archived with a Zenodo DOI.',
    githubUrl: 'https://github.com/mchittineni/iacsecbench',
    liveUrl: 'https://mchittineni.github.io/iacsecbench/',
    languages: [
      { name: 'Python', percentage: 50.9 },
      { name: 'HCL', percentage: 28.1 },
      { name: 'TeX', percentage: 16.1 },
      { name: 'Open Policy Agent', percentage: 2.4 },
      { name: 'Makefile', percentage: 1.2 },
      { name: 'Shell', percentage: 0.7 },
    ],
  },
  {
    name: 'UK River Flow',
    category: 'Web & Geospatial',
    icon: 'M3 15c2.5 0 3.5-2 6-2s3.5 2 6 2 3.5-2 6-2M3 9c2.5 0 3.5-2 6-2s3.5 2 6 2 3.5-2 6-2M3 21c2.5 0 3.5-2 6-2s3.5 2 6 2 3.5-2 6-2',
    description:
      'Interactive map of river discharge across the UK, built entirely from Environment Agency open data. No API keys, no accounts, no server and no runtime API calls — a scheduled job is the backend, and MapLibre GL renders the result as a fully static site.',
    githubUrl: 'https://github.com/mchittineni/uk-river-flow',
    liveUrl: 'https://mchittineni.github.io/uk-river-flow/',
    languages: [
      { name: 'JavaScript', percentage: 46.8 },
      { name: 'Python', percentage: 42.2 },
      { name: 'CSS', percentage: 7.4 },
      { name: 'HTML', percentage: 3.6 },
    ],
  },
  {
    name: 'AWS Platform Engineering Lab',
    category: 'Cloud & IaC',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    description:
      'A production-shaped AWS platform built entirely as code: EKS across three availability zones, GitOps delivery, an enforced account security baseline, and three environments that differ only in variables.',
    githubUrl: 'https://github.com/mchittineni/aws-platform-engineering-lab',
    languages: [
      { name: 'HCL', percentage: 98.0 },
      { name: 'Makefile', percentage: 2.0 },
    ],
  },
  {
    name: 'Mutual Fund Analysis Tracker',
    category: 'AI & Automation',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    description:
      'A scheduled analysis pipeline for Indian mutual funds: pulls NAV history, computes rolling returns, risk and drawdown metrics, and publishes the tracker as a static dashboard.',
    githubUrl: 'https://github.com/mchittineni/mutual-fund-analysis-tracker',
    liveUrl: 'https://mchittineni.github.io/mutual-fund-analysis-tracker/',
    languages: [
      { name: 'Python', percentage: 98.3 },
      { name: 'Jupyter Notebook', percentage: 1.7 },
    ],
  },
  {
    name: 'Cloud & Platform Skills',
    category: 'AI & Automation',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    description:
      '40+ eval-gated agent skills for Cloud, Platform, SRE, Security and FinOps work. Every skill is gated by its own eval suite and stays portable across Claude Code, Antigravity/Gemini, Codex, Cursor and Copilot.',
    githubUrl: 'https://github.com/mchittineni/cloud-platform-skills',
    liveUrl: 'https://mchittineni.github.io/cloud-platform-skills/',
    languages: [
      { name: 'Python', percentage: 92.2 },
      { name: 'Makefile', percentage: 4.4 },
      { name: 'Shell', percentage: 3.4 },
    ],
  },
  {
    name: 'Ultimate Platform Engineering Guide',
    category: 'Research & Open Source',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    description:
      '136 platform engineering interview questions across 20 topics — Kubernetes, GitOps, Backstage, Crossplane, multi-tenancy, policy-as-code, FinOps and the three major clouds. Each question pairs a short spoken answer with the underlying detail, a worked example and interview tips, plus a derived knowledge graph of the concepts they share.',
    githubUrl: 'https://github.com/mchittineni/ultimate-platform-engineering-guide',
    liveUrl: 'https://mchittineni.github.io/ultimate-platform-engineering-guide/',
    languages: [{ name: 'Python', percentage: 100.0 }],
  },
  {
    name: 'Blast Radius Check',
    category: 'Cloud & IaC',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    description:
      'A GitHub Action that analyses a pull request against a cross-repo dependency graph and comments which downstream repositories it affects, so reviewers see the real blast radius of a change before merge.',
    githubUrl: 'https://github.com/mchittineni/blast-radius-check',
    languages: [
      { name: 'TypeScript', percentage: 91.0 },
      { name: 'JavaScript', percentage: 9.0 },
    ],
  },
  {
    name: 'Blast Radius Indexer',
    category: 'Cloud & IaC',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    description:
      'Scans an organisation’s repositories and builds the cross-repo dependency graph for npm, Docker and Terraform artifacts that Blast Radius Check consumes.',
    githubUrl: 'https://github.com/mchittineni/blast-radius-indexer',
    languages: [
      { name: 'TypeScript', percentage: 94.2 },
      { name: 'JavaScript', percentage: 5.8 },
    ],
  },
  {
    name: 'Ultimate AI Engineering Guide',
    category: 'Research & Open Source',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    description:
      '100+ AI, GenAI, LLM, Agentic AI, Forward Deployed Engineer, AI Systems Architect, Applied AI, LLMOps and AI platform interview questions across 10 topics — short answer, detail, worked example and interview tips for each.',
    githubUrl: 'https://github.com/mchittineni/ultimate-ai-engineering-guide',
    liveUrl: 'https://mchittineni.github.io/ultimate-ai-engineering-guide/',
    languages: [{ name: 'Python', percentage: 100.0 }],
  },
  {
    name: 'Ultimate DevOps Guide',
    category: 'Research & Open Source',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    description:
      '500+ DevOps, SRE, security, cloud and platform engineering interview questions across 40 topics, organised into role tracks from junior DevOps through DevSecOps, SecOps, SRE and the three major clouds. Every answer pairs a short spoken response with the underlying detail and trade-offs, a runnable example, and the follow-up questions to expect.',
    githubUrl: 'https://github.com/mchittineni/ultimate-devops-guide',
    liveUrl: 'https://mchittineni.github.io/ultimate-devops-guide/',
    languages: [{ name: 'Python', percentage: 100.0 }],
  },
  {
    name: 'AI Job Agent',
    category: 'AI & Automation',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    description:
      'Autonomous job-application agent for remote DevOps/Platform contracts. Each run it scrapes the configured boards, has Gemini score every new listing against your profile, and for strong matches generates a tailored resume (PDF) and cover letter grounded in your Obsidian vault, then either emails the application or leaves a ready-to-send draft. Every application is logged back into the vault as a note.',
    githubUrl: 'https://github.com/mchittineni/ai-job-serve',
    languages: [
      { name: 'Python', percentage: 97.7 },
      { name: 'Shell', percentage: 2.3 },
    ],
  },
  {
    name: 'Sports Monitor',
    category: 'Web & Geospatial',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    description:
      'An AI-powered, cloud-native web application that visualizes live sports activity across the world in real time through an interactive map interface.',
    githubUrl: 'https://github.com/mchittineni/sports-monitor',
    languages: [
      { name: 'HTML', percentage: 43.2 },
      { name: 'TypeScript', percentage: 41.6 },
      { name: 'HCL', percentage: 12.1 },
      { name: 'Shell', percentage: 1.5 },
      { name: 'Batchfile', percentage: 1.0 },
      { name: 'JavaScript', percentage: 0.5 },
    ],
  },
  {
    name: 'EKS Terraform',
    category: 'Cloud & IaC',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    description:
      'Complete Infrastructure as Code (IaC) solution for deploying a production-ready Amazon EKS cluster with Terraform. Demonstrates DevOps best practices for managing AWS Kubernetes infrastructure including networking, compute, database, and monitoring in a unified, modular manner.',
    githubUrl: 'https://github.com/mchittineni/eks-terraform',
    languages: [
      { name: 'HCL', percentage: 90.2 },
      { name: 'Shell', percentage: 9.8 },
    ],
  },
  {
    name: 'Terraform-Scripts',
    category: 'Cloud & IaC',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    description:
      'Reusable and modular Terraform scripts for validating Terraform IaC configurations, security policies, compliance enforcement, and automated drift detection.',
    githubUrl: 'https://github.com/mchittineni/Terraform-Scripts',
    languages: [{ name: 'HCL', percentage: 100.0 }],
  },
]
