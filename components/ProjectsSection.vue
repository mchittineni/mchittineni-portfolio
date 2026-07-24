<template>
  <section id="projects" class="section projects">
    <div class="wrap">
      <!-- Section Header -->
      <header class="section-head center" data-reveal>
        <p class="eyebrow">Featured Work &amp; Repositories</p>
        <h2 class="section-title">Featured <span class="text-gradient">Projects</span></h2>
        <p class="section-sub">
          End-to-end cloud platforms, multi-cloud IaC frameworks, autonomous AI agents, and
          high-performance geospatial web applications.
        </p>
      </header>

      <!-- Platform Capabilities Banner -->
      <div class="highlights-grid" data-reveal>
        <div v-for="h in highlights" :key="h.title" class="card highlight-card">
          <div class="highlight-card__badge">{{ h.badge }}</div>
          <h3 class="highlight-card__title">{{ h.title }}</h3>
          <p class="highlight-card__desc">{{ h.description }}</p>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-bar" data-reveal>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['filter-btn', { active: activeCategory === cat }]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <article
          v-for="(project, i) in filteredProjects"
          :key="project.name"
          class="card card-hover project-card"
          data-reveal
          :style="{ transitionDelay: i * 80 + 'ms' }"
        >
          <div class="project-card__header">
            <div class="project-card__title-group">
              <span class="project-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="project.icon"
                  />
                </svg>
              </span>
              <h3 class="project-card__title">{{ project.name }}</h3>
            </div>
            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
              aria-label="View source code on GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </div>

          <p class="project-card__desc">{{ project.description }}</p>

          <!-- Language Breakdown Segment Bar -->
          <div class="lang-bar" aria-label="Language composition">
            <span
              v-for="lang in project.languages"
              :key="lang.name"
              class="lang-bar__segment"
              :style="{ width: lang.percentage + '%', backgroundColor: langColors[lang.name] || '#818cf8' }"
              :title="`${lang.name}: ${lang.percentage}%`"
            ></span>
          </div>

          <!-- Language Tags & Percentages -->
          <div class="project-card__languages">
            <span
              v-for="lang in project.languages"
              :key="lang.name"
              class="chip lang-chip"
            >
              <span
                class="lang-dot"
                :style="{ backgroundColor: langColors[lang.name] || '#818cf8' }"
              ></span>
              <span class="lang-name">{{ lang.name }}</span>
              <span class="lang-pct">{{ lang.percentage }}%</span>
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('All')
const categories = ['All', 'Cloud & IaC', 'AI & Automation', 'Web & Geospatial']

// GitHub language color palette mapping
const langColors = {
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
}

const highlights = [
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

const projects = [
  {
    name: 'Indian Village Finder',
    category: 'Web & Geospatial',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    description:
      'Interactive maps & search for Indian villages. Administrative hierarchies (LGD data) integrated with live market prices, farm schemes & soil profiles.',
    githubUrl: 'https://github.com/mchittineni/indian-village-finder',
    languages: [
      { name: 'JavaScript', percentage: 60.4 },
      { name: 'Python', percentage: 31.8 },
      { name: 'HTML', percentage: 4.1 },
      { name: 'CSS', percentage: 3.7 },
    ],
  },
  {
    name: 'Crown Corridor',
    category: 'Web & Geospatial',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-4m0 4h4m-4-4l-4 4m4-4l4 4',
    description:
      'A next-generation real estate and property discovery portal for States in India. Features verified listings, interactive geospatial maps, local guidance value estimation, and historical market transaction analytics.',
    githubUrl: 'https://github.com/mchittineni/crown-corridor',
    languages: [
      { name: 'JavaScript', percentage: 43.0 },
      { name: 'Python', percentage: 30.6 },
      { name: 'HTML', percentage: 16.2 },
      { name: 'CSS', percentage: 10.2 },
    ],
  },
  {
    name: 'AI Job Agent',
    category: 'AI & Automation',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    description:
      'Autonomous job-application agent for remote, outside-IR35 DevOps/Platform contracts. Each run it scrapes the configured boards, has Gemini score every new listing against your profile, and for strong matches generates a tailored resume (PDF) and cover letter grounded in your Obsidian vault, then either emails the application or leaves a ready-to-send draft. Every application is logged back into the vault as a note.',
    githubUrl: 'https://github.com/mchittineni/ai-job-agent',
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
    githubUrl: 'https://github.com/mchittineni/algo-trader',
    languages: [
      { name: 'Python', percentage: 76.6 },
      { name: 'HCL', percentage: 20.3 },
      { name: 'Shell', percentage: 1.3 },
      { name: 'Makefile', percentage: 1.2 },
      { name: 'Dockerfile', percentage: 0.6 },
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
      { name: 'CSS', percentage: 0.1 },
    ],
  },
  {
    name: 'EKS Terraform',
    category: 'Cloud & IaC',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    description:
      'Complete Infrastructure as Code (IaC) solution for deploying a production-ready Amazon EKS (Elastic Kubernetes Service) cluster with Terraform. This project demonstrates DevOps best practices for managing AWS Kubernetes infrastructure including networking, compute, database, and monitoring in a unified, modular manner.',
    githubUrl: 'https://github.com/mchittineni/eks-terraform',
    languages: [
      { name: 'HCL', percentage: 90.2 },
      { name: 'Shell', percentage: 9.8 },
    ],
  },
  {
    name: "MultiCloud K8's Platform",
    category: 'Cloud & IaC',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    description:
      'A MultiCloud K8\'s Platform across AWS, Azure & GCP using Terraform IAC. Orchestrates enterprise-grade Kubernetes clusters across EKS, AKS, and GKE with unified security, networking, remote state, and deployment automation.',
    githubUrl: 'https://github.com/mchittineni/multicloud-k8s-platform',
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
    githubUrl: 'https://github.com/mchittineni/terraform-scripts',
    languages: [{ name: 'HCL', percentage: 100.0 }],
  },
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects
  return projects.filter((p) => p.category === activeCategory.value)
})
</script>

<style scoped>
/* Platform Highlights Banner */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.highlight-card {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.025);
  border-color: rgba(255, 255, 255, 0.07);
}

.highlight-card__badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-2);
  background: rgba(34, 211, 238, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(34, 211, 238, 0.2);
}

.highlight-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.highlight-card__desc {
  font-size: 0.85rem;
  color: var(--text-soft);
  margin: 0;
  line-height: 1.45;
}

/* Category Filter Buttons */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.filter-btn {
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-soft);
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--surface-2);
}

.filter-btn.active {
  color: #0a0b12;
  background: var(--accent-grad);
  border-color: transparent;
  box-shadow: 0 4px 20px -4px rgba(129, 140, 248, 0.5);
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 23rem), 1fr));
  gap: 1.75rem;
}

.project-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-card__title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.project-card__icon {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.7rem;
  background: rgba(129, 140, 248, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.25);
  color: var(--accent);
  flex-shrink: 0;
}

.project-card__icon svg {
  width: 1.35rem;
  height: 1.35rem;
}

.project-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: var(--text);
  line-height: 1.3;
}

.project-card__link {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.6rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-soft);
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.project-card__link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.project-card__link:hover {
  color: #fff;
  border-color: var(--accent);
  transform: translateY(-2px);
  background: var(--surface-2);
}

.project-card__desc {
  font-size: 0.9rem;
  color: var(--text-soft);
  line-height: 1.6;
  margin: 0 0 1.5rem;
  flex-grow: 1;
}

/* Language Segment Bar */
.lang-bar {
  display: flex;
  height: 0.45rem;
  width: 100%;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 1rem;
}

.lang-bar__segment {
  height: 100%;
  transition: width 0.4s ease;
}

/* Language Breakdown Chips */
.project-card__languages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.lang-chip {
  padding: 0.25rem 0.6rem;
  font-size: 0.76rem;
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

.lang-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.lang-name {
  color: var(--text-soft);
  font-weight: 500;
}

.lang-pct {
  color: var(--text-dim);
  margin-left: 0.25rem;
}
</style>
