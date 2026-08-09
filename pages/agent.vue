<template>
  <div class="agentview">
    <header class="topbar">
      <span class="brand">ask.manideep</span>
      <span class="spacer"></span>
      <span class="badge">scripted trace · no model call</span>
    </header>

    <main class="main">
      <header class="head">
        <h1>Ask my portfolio</h1>
        <p>
          Every answer below is assembled from <code>content/</code> by a fixed script, the tool
          calls are real reads against that data, but there is no language model behind this and
          nothing is generated at request time. It is a visualisation of how the data connects, not
          an AI.
        </p>
      </header>

      <div class="prompts">
        <button
          v-for="(run, i) in RUNS"
          :key="run.q"
          class="prompt"
          :disabled="busy"
          @click="execute(i)"
        >
          {{ run.q }}
        </button>
      </div>

      <section class="transcript" aria-live="polite">
        <article v-for="entry in transcript" :key="entry.id" class="entry">
          <p class="question"><span aria-hidden="true">❯</span> {{ entry.q }}</p>

          <ul class="tools">
            <li v-for="t in entry.tools" :key="t.label" :class="{ done: t.done }">
              <span class="dot" aria-hidden="true"></span>
              <code>{{ t.label }}</code>
              <span class="ms">{{ t.done ? t.ms + 'ms' : '…' }}</span>
            </li>
          </ul>

          <div v-if="entry.answered" class="answer">
            <p v-for="line in entry.answer" :key="line">{{ line }}</p>
          </div>
        </article>

        <p v-if="!transcript.length" class="hint">Pick a question to see the trace.</p>
      </section>
    </main>
  </div>
</template>

<script setup>
  import { profile, stats, deployments, repositories, certificates, nodePools } from '~/content'

  definePageMeta({ layout: 'bare' })
  useSeoMeta({
    title: 'Agent — Manideep Chittineni',
    description:
      'Questions about my platform experience, answered as visible tool-call traces over my own portfolio data.',
  })
  useHead({
    link: [{ rel: 'canonical', href: 'https://mchittineni.github.io/mchittineni-portfolio/' }],
  })

  const clouds = [...new Set(deployments.flatMap(d => d.cloud.split('·')))]

  // Each run names the reads it performs, then derives its answer from them.
  const RUNS = [
    {
      q: 'Summarise your platform experience',
      tools: [
        { label: "read('content/experience.ts')", ms: 12 },
        { label: 'rank(roles, by=impact)', ms: 4 },
      ],
      answer: () => [
        `${deployments.length} roles over ${stats[0].value} years, currently ${deployments[0].role} at ${deployments[0].company}.`,
        deployments[0].groups[0].points[0],
        deployments[1].groups[0].points[0],
      ],
    },
    {
      q: 'Which clouds have you shipped to?',
      tools: [
        { label: "read('content/experience.ts')", ms: 9 },
        { label: 'aggregate(roles, key=cloud)', ms: 3 },
      ],
      answer: () => [
        `${clouds.length} clouds in production: ${clouds.join(', ')}.`,
        ...deployments.map(d => `${d.cloud} — ${d.company} (${d.age})`),
      ],
    },
    {
      q: 'What have you built with Terraform?',
      tools: [
        { label: "search('content/projects.ts', 'terraform|HCL')", ms: 16 },
        { label: "read('content/skills.ts', pool='infrastructure-as-code')", ms: 6 },
      ],
      answer: () => {
        const hits = repositories.filter(
          r =>
            /terraform|iac/i.test(r.description + r.name) || r.languages.some(l => l.name === 'HCL')
        )
        return [
          `${hits.length} repositories involve Terraform:`,
          ...hits.map(r => `${r.slug} — ${r.languages[0].name} ${r.languages[0].percentage}%`),
        ]
      },
    },
    {
      q: 'Show your strongest credentials',
      tools: [
        { label: "read('content/skills.ts', key='certifications')", ms: 8 },
        { label: 'filter(certs, issuer)', ms: 2 },
      ],
      answer: () => [
        `${certificates.length} credentials on file.`,
        ...certificates.slice(0, 6).map(c => `${c.issuer} — ${c.name}`),
        `…and ${certificates.length - 6} more.`,
      ],
    },
    {
      q: 'What are you working on right now?',
      tools: [
        { label: "read('content/experience.ts', index=0)", ms: 7 },
        { label: 'expand(workstreams)', ms: 5 },
      ],
      answer: () => {
        const d = deployments[0]
        return [
          `${d.role} at ${d.company} — ${d.period}, ${d.cloud}.`,
          ...d.groups.map(g => `${g.title}: ${g.points[0]}`),
        ]
      },
    },
    {
      q: 'How deep is the Kubernetes work?',
      tools: [
        { label: "search('content/', 'kubernetes|EKS|AKS|GKE')", ms: 21 },
        { label: 'join(roles, skills, repos)', ms: 6 },
      ],
      answer: () => {
        const re = /kubernetes|\beks\b|\baks\b|\bgke\b|fargate/i
        const points = deployments
          .flatMap(d => d.groups.flatMap(g => g.points))
          .filter(p => re.test(p))
        const skills = nodePools.flatMap(p => p.nodes).filter(n => re.test(n))
        return [
          `${points.length} achievements and ${skills.length} tools reference Kubernetes.`,
          ...points.slice(0, 3),
        ]
      },
    },
  ]

  const transcript = ref([])
  const busy = ref(false)
  let seq = 0

  const wait = ms => new Promise(r => setTimeout(r, ms))

  async function execute(index) {
    const run = RUNS[index]
    busy.value = true

    const entry = reactive({
      id: seq++,
      q: run.q,
      tools: run.tools.map(t => ({ ...t, done: false })),
      answered: false,
      answer: [],
    })
    transcript.value.unshift(entry)

    // Step through the reads so the trace is legible rather than instant.
    for (const tool of entry.tools) {
      await wait(260)
      tool.done = true
    }
    await wait(200)
    entry.answer = run.answer()
    entry.answered = true
    busy.value = false
  }
</script>

<style scoped>
  .agentview {
    min-height: 100vh;
    padding-bottom: 6rem;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 1rem;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.78rem;
  }
  .brand {
    color: var(--text);
    font-weight: 600;
  }
  .spacer {
    flex: 1;
  }
  .badge {
    color: var(--warn);
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: 3px;
    padding: 0.12rem 0.45rem;
    font-size: 0.7rem;
  }

  .main {
    max-width: 52rem;
    margin-inline: auto;
    padding: 1.75rem 1.25rem 0;
  }
  .head h1 {
    margin: 0;
    font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.1rem);
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .head p {
    margin: 0.5rem 0 0;
    color: var(--text-soft);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .prompts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.5rem 0;
  }
  .prompt {
    padding: 0.5rem 0.85rem;
    font-size: 0.83rem;
    color: var(--text-soft);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
    transition:
      border-color 0.15s ease,
      color 0.15s ease;
  }
  .prompt:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--text);
  }
  .prompt:disabled {
    opacity: 0.45;
    cursor: progress;
  }

  .entry {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    padding: 1.1rem 1.25rem;
    margin-bottom: 0.85rem;
  }
  .question {
    margin: 0 0 0.75rem;
    font-family: var(--mono);
    font-size: 0.88rem;
    color: var(--text);
  }
  .question span {
    color: var(--ok);
    margin-right: 0.4rem;
  }

  .tools {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    border-left: 2px solid var(--border);
    padding-left: 0.85rem;
  }
  .tools li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--mono);
    font-size: 0.76rem;
    color: var(--text-dim);
  }
  .tools li.done {
    color: var(--text-soft);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-dim);
    flex-shrink: 0;
  }
  .tools li.done .dot {
    background: var(--ok);
  }
  .ms {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
  }

  .answer {
    margin-top: 0.9rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--border);
  }
  .answer p {
    margin: 0 0 0.4rem;
    color: var(--text-soft);
    font-size: 0.9rem;
    line-height: 1.6;
  }
  .answer p:first-child {
    color: var(--text);
    font-weight: 600;
  }
  .hint {
    font-family: var(--mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--text-dim);
  }
</style>
