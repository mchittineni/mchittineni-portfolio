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
    name: 'IaCSecBench',
    category: 'Research & Open Source',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    description:
      'An open framework and empirical benchmark for evaluating Infrastructure-as-Code security gates. 48 admissible cases across 26 vulnerable and 22 compliant configurations, exercising 22 of 26 canonical controls against static analysis tools, policy engines and secret detection suites. Every published figure is regenerated from recorded scanner output, and the work is archived with a Zenodo DOI.',
    githubUrl: 'https://github.com/mchittineni/iacsecbench',
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
    name: 'Crown Corridor',
    category: 'Web & Geospatial',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-4m0 4h4m-4-4l-4 4m4-4l4 4',
    description:
      'A next-generation real estate and property discovery portal for Andhra Pradesh and Telangana. Verified listings, interactive geospatial maps, state-modular SRO property sale histories, guidance value estimation and CAGR market analytics, deployed on an AWS Terraform reference architecture.',
    githubUrl: 'https://github.com/mchittineni/iacsecbench',
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
    name: "MultiCloud K8's Platform",
    category: 'Cloud & IaC',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    description:
      "A MultiCloud K8's Platform across AWS, Azure & GCP using Terraform IaC. Orchestrates enterprise-grade Kubernetes clusters across EKS, AKS, and GKE with unified security, networking, remote state, and deployment automation.",
    githubUrl: 'https://github.com/mchittineni/K8-s-MultiCloud-Setup',
    languages: [
      { name: 'HCL', percentage: 91.2 },
      { name: 'Shell', percentage: 8.8 },
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
    name: 'Ultimate DevOps Guide',
    category: 'Research & Open Source',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    description:
      '305 Cloud, DevOps, Platform and SRE interview questions across 40 topics, organised into 13 role tracks from junior DevOps through DevSecOps, SecOps, SRE, SLO/SLA and the three major clouds. Every answer pairs a short spoken response with the underlying detail and trade-offs, a runnable example, and the follow-up questions to expect.',
    githubUrl: 'https://github.com/mchittineni/ultimate-devops-guide',
    languages: [{ name: 'Python', percentage: 100.0 }],
  },
  {
    name: 'AI Job Agent',
    category: 'AI & Automation',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    description:
      'Autonomous job-application agent for remote DevOps/Platform contracts. Each run it scrapes the configured boards, has Gemini score every new listing against your profile, and for strong matches generates a tailored resume (PDF) and cover letter grounded in your Obsidian vault, then either emails the application or leaves a ready-to-send draft. Every application is logged back into the vault as a note.',
    githubUrl: 'https://github.com/mchittineni/ai-job-serve',
    languages: [
      { name: 'Python', percentage: 97.7 },
      { name: 'Shell', percentage: 2.3 },
    ],
  },
  {
    name: 'algo-trader',
    category: 'AI & Automation',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    description:
      'An honest, end-to-end stock/ETF trend-strategy lab: backtest → scan → paper-trade → deploy. One tested strategy definition drives a Python package, a TradingView port, and serverless infrastructure on AWS, GCP, and Azure with security gates, CI/CD, and an optional LLM risk-advisor.',
    githubUrl: 'https://github.com/mchittineni/claude-algo-trader',
    languages: [
      { name: 'Python', percentage: 76.6 },
      { name: 'HCL', percentage: 20.3 },
      { name: 'Shell', percentage: 1.3 },
      { name: 'Makefile', percentage: 1.2 },
      { name: 'Dockerfile', percentage: 0.6 },
    ],
  },
  {
    name: 'Indian Village Finder',
    category: 'Web & Geospatial',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    description:
      'Interactive maps & search for Indian villages. Administrative hierarchies (LGD data) integrated with live market prices, farm schemes & soil profiles, covering Hindi, Telugu, Tamil, Kannada and Urdu.',
    githubUrl: 'https://github.com/mchittineni/india-village-finder',
    languages: [
      { name: 'JavaScript', percentage: 60.3 },
      { name: 'Python', percentage: 31.8 },
      { name: 'HTML', percentage: 4.1 },
      { name: 'CSS', percentage: 3.7 },
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
    name: 'Terraform-Scripts',
    category: 'Cloud & IaC',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    description:
      'Reusable and modular Terraform scripts for validating Terraform IaC configurations, security policies, compliance enforcement, and automated drift detection.',
    githubUrl: 'https://github.com/mchittineni/Terraform-Scripts',
    languages: [{ name: 'HCL', percentage: 100.0 }],
  },
]
