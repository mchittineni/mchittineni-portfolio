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
              :style="{
                width: lang.percentage + '%',
                backgroundColor: langColors[lang.name] || '#818cf8',
              }"
              :title="`${lang.name}: ${lang.percentage}%`"
            ></span>
          </div>

          <!-- Language Tags & Percentages -->
          <div class="project-card__languages">
            <span v-for="lang in project.languages" :key="lang.name" class="chip lang-chip">
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
  import { langColors, projectCategories as categories, highlights, projects } from '~/content'
  import { ref, computed } from 'vue'

  const activeCategory = ref('All')
  // GitHub language color palette mapping
  const filteredProjects = computed(() => {
    if (activeCategory.value === 'All') return projects
    return projects.filter(p => p.category === activeCategory.value)
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
    background: var(--surface);
    border-color: var(--border);
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
    color: var(--on-accent);
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
    background: var(--border);
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
    background: var(--surface);
    border-color: var(--border);
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
