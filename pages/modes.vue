<template>
  <div class="chooser">
    <header class="topbar">
      <span class="brand"
        >mc<span class="brand-dim">/</span><span class="brand-lit">interfaces</span></span
      >
      <span class="spacer"></span>
      <span class="badge">{{ modes.length }} ways in · one dataset</span>
    </header>

    <main class="main">
      <header class="head">
        <p class="eyebrow">Choose an interface</p>
        <h1>Manideep<span class="text-gradient"> Chittineni</span></h1>
        <p class="lede">
          The same career rendered six ways. Every one of them reads from the same
          <code>content/</code> layer, so nothing here is a mock-up and nothing drifts out of sync.
          They differ only in how the data is presented.
        </p>
      </header>

      <ul class="grid">
        <li v-for="(m, i) in modes" :key="m.key">
          <NuxtLink :to="m.path" class="card">
            <span class="row">
              <span class="icon" aria-hidden="true">{{ m.icon }}</span>
              <span class="key" aria-hidden="true">{{ i + 1 }}</span>
            </span>

            <h2 class="label">
              {{ m.label }}
              <span v-if="last === m.key" class="last">last opened</span>
            </h2>
            <code class="path">{{ m.path }}</code>
            <p class="blurb">{{ m.blurb }}</p>

            <ul class="facts">
              <li v-for="fact in EXTRAS[m.key]" :key="fact">{{ fact }}</li>
            </ul>

            <span class="go">Open<span aria-hidden="true"> →</span></span>
          </NuxtLink>
        </li>
      </ul>

      <p class="hint">
        Press <kbd>1</kbd>–<kbd>{{ modes.length }}</kbd> to jump straight in, or switch at any time
        from the button in the corner.
      </p>
    </main>
  </div>
</template>

<script setup>
  import { deployments, repositories, nodePools, certificates } from '~/content'
  definePageMeta({ layout: 'bare' })
  useSeoMeta({
    title: 'Interfaces — Manideep Chittineni',
    description:
      'Six ways to read the same career: portfolio, control plane, multi-cloud console, agent trace, editor and terminal.',
  })

  const { modes, lastVisited } = useMode()
  const router = useRouter()

  const skillCount = nodePools.reduce((n, pool) => n + pool.nodes.length, 0)

  // Counts come from content/ rather than being written out here, so a new role
  // or repo updates this page without anyone remembering to.
  const EXTRAS = {
    portfolio: [
      `${deployments.length} roles`,
      `${repositories.length} projects`,
      `${skillCount} skills`,
    ],
    console: [
      'Deployments, repos, node pools',
      `${certificates.length} certificates`,
      'Command palette on ⌘K',
    ],
    cloud: ['AWS · Azure · Google Cloud · OCI', 'Roles, skills and certs per vendor'],
    agent: ['Six worked questions', 'Real reads, no model call'],
    ide: ['Explorer, tabs, editor', 'Terminal in the lower pane'],
    terminal: ['mc get · describe · open', `Tab-complete, history, | grep`],
  }

  // localStorage is client-only, so this stays null through SSR and the badge
  // simply appears after hydration rather than mismatching.
  const last = ref(null)

  function onKeydown(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return
    const i = Number(e.key)
    if (!Number.isInteger(i) || i < 1 || i > modes.length) return
    router.push(modes[i - 1].path)
  }

  onMounted(() => {
    last.value = lastVisited()
    window.addEventListener('keydown', onKeydown)
  })
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
  .chooser {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(60rem 40rem at 12% -10%, var(--glow-1), transparent 60%),
      radial-gradient(50rem 34rem at 92% 8%, var(--glow-2), transparent 62%), var(--bg);
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    height: 2.6rem;
    flex-shrink: 0;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.75rem;
  }
  .spacer {
    flex: 1;
  }
  .brand {
    font-weight: 600;
    color: var(--text);
  }
  .brand-dim {
    color: var(--text-dim);
  }
  .brand-lit {
    color: var(--accent-2);
  }
  .badge {
    color: var(--text-dim);
  }

  .main {
    flex: 1;
    width: 100%;
    max-width: 74rem;
    margin-inline: auto;
    /* Bottom padding clears the fixed switcher, which would otherwise sit on
       top of the hint line at the end of the scroll. */
    padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem 6.5rem;
  }

  .head {
    max-width: 44rem;
  }
  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--accent-2);
    margin: 0 0 0.6rem;
  }
  h1 {
    font-size: clamp(1.9rem, 1.3rem + 2.6vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    margin: 0;
  }
  .lede {
    color: var(--text-soft);
    margin: 0.9rem 0 0;
    font-size: 1rem;
    line-height: 1.65;
  }
  .lede code {
    font-family: var(--mono);
    font-size: 0.9em;
    padding: 0.1em 0.35em;
    border-radius: 4px;
    background: var(--surface-2);
  }

  .grid {
    list-style: none;
    margin: 2.5rem 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
    gap: 1rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.35rem;
    text-decoration: none;
    color: var(--text);
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-tile);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;
  }
  .card:hover,
  .card:focus-visible {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: var(--shadow-card);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon {
    font-family: var(--mono);
    font-size: 1.25rem;
    color: var(--accent-2);
  }
  /* The shortcut digit, shown the way the key itself is labelled. */
  .key {
    display: grid;
    place-items: center;
    width: 1.4rem;
    height: 1.4rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--text-dim);
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0.85rem 0 0.3rem;
  }
  .last {
    font-family: var(--mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 0.15rem 0.4rem;
    border-radius: 999px;
    color: var(--accent-2);
    border: 1px solid var(--accent-2);
  }
  .path {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
  }
  .blurb {
    color: var(--text-soft);
    font-size: 0.87rem;
    line-height: 1.55;
    margin: 0.7rem 0 0;
  }

  .facts {
    list-style: none;
    margin: 0.9rem 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .facts li {
    position: relative;
    padding-left: 0.95rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
  }
  .facts li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.45em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.7;
  }

  .go {
    margin-top: auto;
    padding-top: 1.1rem;
    font-size: 0.82rem;
    font-weight: 650;
    color: var(--accent);
  }

  .hint {
    margin: 2.25rem 0 0;
    font-size: 0.85rem;
    color: var(--text-dim);
  }
  kbd {
    font-family: var(--mono);
    font-size: 0.75rem;
    padding: 0.1rem 0.35rem;
    border: 1px solid var(--border);
    border-bottom-width: 2px;
    border-radius: 4px;
    background: var(--surface);
    color: var(--text-soft);
  }

  @media (prefers-reduced-motion: reduce) {
    .card:hover,
    .card:focus-visible {
      transform: none;
    }
  }
</style>
