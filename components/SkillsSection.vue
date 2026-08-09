<template>
  <section id="skills" class="section">
    <div class="wrap">
      <header class="section-head center" data-reveal>
        <p class="eyebrow">What I work with</p>
        <h2 class="section-title">Technical <span class="text-gradient">Skills</span></h2>
        <p class="section-sub">
          A toolbox spanning multi-cloud platforms, infrastructure-as-code, the full DevOps
          lifecycle, and production GenAI engineering.
        </p>
      </header>

      <!-- Skill categories -->
      <div class="skills__grid">
        <article
          v-for="(cat, i) in categories"
          :key="cat.title"
          class="card card-hover skill-card"
          data-reveal
          :style="{ transitionDelay: i * 70 + 'ms' }"
        >
          <div class="skill-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="cat.icon" />
            </svg>
          </div>
          <h3 class="skill-card__title">{{ cat.title }}</h3>
          <div class="skill-card__items">
            <a
              v-for="item in cat.items"
              :key="item.name"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="tech"
            >
              <span class="icon-tile tech__tile">
                <img :src="item.img" :alt="item.name" loading="lazy" width="28" height="28" />
              </span>
              <span class="tech__name">{{ item.name }}</span>
            </a>
          </div>
        </article>

        <!-- Proficiency card -->
        <article
          class="card card-hover skill-card"
          data-reveal
          :style="{ transitionDelay: '350ms' }"
        >
          <div class="skill-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h3 class="skill-card__title">Proficiency</h3>
          <div class="bars">
            <div v-for="bar in proficiency" :key="bar.name" class="bar">
              <div class="bar__head">
                <span>{{ bar.name }}</span>
                <span class="bar__pct">{{ bar.level }}%</span>
              </div>
              <div class="bar__track">
                <div class="bar__fill" :style="{ width: bar.level + '%' }"></div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Certifications -->
      <header class="section-head center certs-head" data-reveal>
        <p class="eyebrow">Verified</p>
        <h2 class="section-title">Certifications</h2>
      </header>
      <div class="certs">
        <a
          v-for="(cert, i) in certifications"
          :key="cert.title"
          :href="cert.href"
          target="_blank"
          rel="noopener noreferrer"
          class="card card-hover cert"
          data-reveal
          :style="{ transitionDelay: i * 60 + 'ms' }"
        >
          <span class="icon-tile cert__tile">
            <img :src="cert.img" :alt="cert.alt" loading="lazy" width="34" height="34" />
          </span>
          <h4 class="cert__title">{{ cert.title }}</h4>
        </a>
      </div>

      <p class="certs-note" data-reveal>
        <strong>Anthropic Programmes:</strong>
        Claude &amp; Claude Code Fundamentals ·
        <a
          href="https://verify.skilljar.com/c/r4k36wahspip"
          target="_blank"
          rel="noopener noreferrer"
          >Building Applications with the Claude API</a
        >
        ·
        <a
          href="https://verify.skilljar.com/c/wcqfxigi33xe"
          target="_blank"
          rel="noopener noreferrer"
          >Claude on Amazon Bedrock</a
        >
        ·
        <a
          href="https://verify.skilljar.com/c/set5z48k4io8"
          target="_blank"
          rel="noopener noreferrer"
          >Google Cloud Vertex AI</a
        >
        ·
        <a
          href="https://verify.skilljar.com/c/9oduoi3nigma"
          target="_blank"
          rel="noopener noreferrer"
          >Model Context Protocol (MCP)</a
        >
        · AI Agents, Subagents &amp; Agent Skills · AI Capabilities &amp; Limitations · AI Fluency
        Frameworks
      </p>

      <p class="certs-note" data-reveal>
        <strong>OpenAI Programmes:</strong>
        Agents and Workflows · AI Foundations · Applied AI Foundations
      </p>
    </div>
  </section>
</template>

<script setup>
  import { skillCategories as categories, proficiency, certifications } from '~/content'
</script>

<style scoped>
  .skills__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: 1.5rem;
  }

  .skill-card {
    padding: 1.75rem;
  }
  .skill-card__icon {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.8rem;
    background: rgba(129, 140, 248, 0.12);
    border: 1px solid rgba(129, 140, 248, 0.25);
    color: var(--accent);
    margin-bottom: 1.25rem;
  }
  .skill-card__icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  .skill-card__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 1.25rem;
  }
  .skill-card__items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.9rem;
  }

  .tech {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
    color: var(--text-soft);
    transition: color 0.2s ease;
  }
  .tech__tile {
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }
  .tech__tile img {
    width: 1.6rem;
    height: 1.6rem;
    object-fit: contain;
  }
  .tech:hover {
    color: var(--text);
  }
  .tech:hover .tech__tile {
    transform: scale(1.12);
  }
  .tech__name {
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* Proficiency bars */
  .bars {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .bar__head {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--text-soft);
    margin-bottom: 0.45rem;
  }
  .bar__pct {
    color: var(--text-dim);
  }
  .bar__track {
    height: 0.5rem;
    background: var(--border);
    border-radius: 999px;
    overflow: hidden;
  }
  .bar__fill {
    height: 100%;
    border-radius: 999px;
    background: var(--accent-grad);
  }

  /* Certifications */
  .certs-head {
    margin-top: 4.5rem;
  }
  .certs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
    gap: 1.25rem;
  }
  .cert {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    text-decoration: none;
    color: var(--text);
  }
  .cert__tile {
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
  }
  .cert__tile img {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
  }
  .cert__title {
    font-size: 0.98rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.35;
    transition: color 0.2s ease;
  }
  .cert:hover .cert__title {
    color: var(--accent);
  }

  .certs-note {
    margin: 1.5rem auto 0;
    max-width: 56rem;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-dim);
  }
  .certs-note strong {
    color: var(--text-soft);
  }
  .certs-note a {
    color: var(--text-soft);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .certs-note a:hover {
    color: var(--accent);
  }
</style>
