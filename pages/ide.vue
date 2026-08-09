<template>
  <div class="ide">
    <header class="titlebar">
      <span class="dot red"></span>
      <span class="dot amber"></span>
      <span class="dot green"></span>
      <span class="path">{{ open.name }} — mchittineni</span>
    </header>

    <div class="frame">
      <nav class="explorer" aria-label="Explorer">
        <p class="section-label">Explorer</p>
        <p class="folder"><span aria-hidden="true">▾</span> mchittineni</p>
        <button
          v-for="f in FILES"
          :key="f.name"
          :class="['file', { on: f.name === open.name }]"
          :aria-current="f.name === open.name ? 'true' : undefined"
          @click="openFile(f.name)"
        >
          <span class="ext" :style="{ color: f.colour }" aria-hidden="true">{{ f.glyph }}</span>
          {{ f.name }}
        </button>
      </nav>

      <section class="editor">
        <div class="tabs" role="tablist">
          <button
            v-for="name in tabs"
            :key="name"
            role="tab"
            :aria-selected="name === open.name"
            :class="['tab', { on: name === open.name }]"
            @click="openFile(name)"
          >
            {{ name }}
            <span class="close" role="none" @click.stop="closeTab(name)">×</span>
          </button>
        </div>

        <div class="code" tabindex="0">
          <ol>
            <li v-for="(line, i) in lines" :key="i">
              <span class="ln" aria-hidden="true">{{ i + 1 }}</span>
              <span class="src">{{ line }}</span>
            </li>
          </ol>
        </div>

        <div class="panel">
          <p class="section-label">Terminal</p>
          <div ref="buffer" class="buffer" role="log" aria-live="polite">
            <div
              v-for="l in shell.lines.value"
              :key="l.id"
              :class="['line', l.tone, { 'line--pre': l.fixed }]"
            >
              {{ l.text }}
            </div>
          </div>
          <form class="entry" @submit.prevent="submit">
            <span class="prompt">$</span>
            <input
              v-model="shell.input.value"
              aria-label="Terminal input"
              autocomplete="off"
              spellcheck="false"
              @keydown.tab.prevent="shell.complete"
              @keydown.up.prevent="shell.previous"
              @keydown.down.prevent="shell.next"
            />
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { profile, stats, deployments, repositories, nodePools, certificates } from '~/content'

  definePageMeta({ layout: 'bare' })
  useSeoMeta({
    title: 'Editor — Manideep Chittineni',
    description:
      'My background as a source tree: about.md, experience.yaml, skills.tf, projects.json.',
  })
  useHead({
    link: [{ rel: 'canonical', href: 'https://mchittineni.github.io/mchittineni-portfolio/' }],
  })

  // Each file renders the same content/ data in the format its extension implies.
  const FILES = [
    {
      name: 'about.md',
      glyph: 'M',
      colour: '#22d3ee',
      body: () => [
        `# ${profile.name}`,
        '',
        `> ${profile.title}`,
        '',
        profile.summary,
        '',
        `**Location:** ${profile.location}`,
        '',
        '## By the numbers',
        '',
        ...stats.map(s => `- **${s.value}** — ${s.label}`),
      ],
    },
    {
      name: 'experience.yaml',
      glyph: 'Y',
      colour: '#fbbf24',
      body: () =>
        deployments.flatMap(d => [
          `- role: ${d.role}`,
          `  company: ${d.company}`,
          `  period: ${d.period}`,
          `  cloud: [${d.cloud.split('·').join(', ')}]`,
          `  status: ${d.status}`,
          '  workstreams:',
          ...d.groups.flatMap(g => [
            `    - name: ${g.title}`,
            ...g.points.map(p => `      - ${p}`),
          ]),
          '',
        ]),
    },
    {
      name: 'skills.tf',
      glyph: 'T',
      colour: '#844FBA',
      body: () =>
        nodePools.flatMap(p => [
          `resource "skill_pool" "${p.name.replace(/-/g, '_')}" {`,
          `  display_name = "${p.title}"`,
          `  node_count   = ${p.nodes.length}`,
          '  nodes = [',
          ...p.nodes.map(n => `    "${n}",`),
          '  ]',
          '}',
          '',
        ]),
    },
    {
      name: 'projects.json',
      glyph: 'J',
      colour: '#f1e05a',
      body: () => {
        const shaped = repositories.map(r => ({
          name: r.slug,
          category: r.category,
          visibility: r.private ? 'private' : 'public',
          primary_language: r.languages[0]?.name,
          url: r.url,
        }))
        return JSON.stringify(shaped, null, 2).split('\n')
      },
    },
    {
      name: 'certifications.md',
      glyph: 'M',
      colour: '#34d399',
      body: () => [
        '# Certifications',
        '',
        ...certificates.map(c => `- [${c.name}](${c.url}) — _${c.issuer}_`),
      ],
    },
  ]

  const open = ref(FILES[0])
  const tabs = ref([FILES[0].name])
  const lines = computed(() => open.value.body())

  function openFile(name) {
    const file = FILES.find(f => f.name === name)
    if (!file) return
    open.value = file
    if (!tabs.value.includes(name)) tabs.value.push(name)
  }

  function closeTab(name) {
    if (tabs.value.length === 1) return
    tabs.value = tabs.value.filter(t => t !== name)
    if (open.value.name === name) openFile(tabs.value[tabs.value.length - 1])
  }

  // The integrated terminal is the same engine /terminal runs on.
  const shell = useShell()
  const buffer = ref(null)

  const submit = () => {
    shell.submit()
    nextTick(() => {
      if (buffer.value) buffer.value.scrollTop = buffer.value.scrollHeight
    })
  }

  onMounted(() => {
    shell.banner()
  })
</script>

<style scoped>
  .ide {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.9rem;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .red {
    background: var(--err);
  }
  .amber {
    background: var(--warn);
  }
  .green {
    background: var(--ok);
  }
  .path {
    margin-left: 0.6rem;
    font-family: var(--mono);
    font-size: 0.74rem;
    color: var(--text-dim);
  }

  .frame {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .explorer {
    width: 13rem;
    flex-shrink: 0;
    background: var(--sunken);
    border-right: 1px solid var(--border);
    padding: 0.6rem 0.45rem;
    overflow-y: auto;
  }
  .section-label {
    margin: 0.35rem 0.5rem 0.4rem;
    font-family: var(--mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--text-dim);
  }
  .folder {
    margin: 0 0.5rem 0.25rem;
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--text-soft);
  }
  .file {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    padding: 0.32rem 0.5rem 0.32rem 1.1rem;
    border: 0;
    background: transparent;
    color: var(--text-soft);
    font-family: var(--mono);
    font-size: 0.78rem;
    text-align: left;
    border-radius: 4px;
    cursor: pointer;
  }
  .file:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .file.on {
    background: rgba(129, 140, 248, 0.13);
    color: var(--accent);
  }
  .ext {
    font-weight: 700;
    font-size: 0.7rem;
  }

  .editor {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .tabs {
    display: flex;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    flex-shrink: 0;
  }
  .tab {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.8rem;
    background: transparent;
    border: 0;
    border-right: 1px solid var(--border);
    border-bottom: 2px solid transparent;
    color: var(--text-dim);
    font-family: var(--mono);
    font-size: 0.76rem;
    white-space: nowrap;
    cursor: pointer;
  }
  .tab.on {
    color: var(--text);
    border-bottom-color: var(--accent);
    background: var(--surface);
  }
  .close {
    opacity: 0.5;
  }
  .close:hover {
    opacity: 1;
  }

  .code {
    flex: 1;
    overflow: auto;
    padding: 0.75rem 0;
    min-height: 0;
  }
  .code ol {
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--mono);
    font-size: 0.8rem;
    line-height: 1.6;
  }
  .code li {
    display: flex;
    gap: 1rem;
    padding-inline: 0.9rem;
    white-space: pre;
  }
  .code li:hover {
    background: var(--surface);
  }
  .ln {
    width: 2.2rem;
    text-align: right;
    color: var(--text-dim);
    flex-shrink: 0;
    user-select: none;
    font-variant-numeric: tabular-nums;
  }
  .src {
    color: var(--text-soft);
  }

  .panel {
    height: 12rem;
    border-top: 1px solid var(--border);
    background: var(--sunken);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  .buffer {
    flex: 1;
    overflow-y: auto;
    padding: 0 0.9rem;
    font-family: var(--mono);
    font-size: 0.76rem;
    line-height: 1.55;
  }
  .line {
    white-space: pre-wrap;
    color: var(--text-soft);
  }
  .line--pre {
    white-space: pre;
    overflow-x: auto;
  }
  .line.dim {
    color: var(--text-dim);
  }
  .line.error {
    color: var(--err);
  }
  .line.warn {
    color: var(--warn);
  }
  .line.accent {
    color: var(--accent-2);
  }
  .line.prompt {
    color: var(--ok);
  }
  .line.title {
    color: var(--text);
  }
  .entry {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.9rem;
    border-top: 1px solid var(--border);
  }
  .entry .prompt {
    font-family: var(--mono);
    color: var(--ok);
  }
  .entry input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: none;
    color: var(--text);
    font-family: var(--mono);
    font-size: 0.78rem;
    caret-color: var(--ok);
  }

  @media (max-width: 760px) {
    .explorer {
      display: none;
    }
    .panel {
      height: 9rem;
    }
  }
</style>
