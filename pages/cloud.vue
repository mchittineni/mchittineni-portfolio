<template>
  <div
    class="cloudview"
    :style="{
      '--vendor': active.accent,
      '--vendor-soft': active.soft,
      '--vendor-ink': resolved === 'light' ? active.ink : active.accent,
    }"
  >
    <header class="topbar">
      <span class="brand">mchittineni <span aria-hidden="true">▸</span> multi-cloud</span>
      <span class="spacer"></span>
      <span class="region">{{ active.region }}</span>
    </header>

    <nav class="tabs" aria-label="Cloud vendor">
      <button
        v-for="c in CLOUDS"
        :key="c.key"
        :class="['tab', { on: c.key === active.key }]"
        :aria-current="c.key === active.key ? 'page' : undefined"
        @click="select(c.key)"
      >
        {{ c.label }}
      </button>
    </nav>

    <main class="main">
      <header class="head">
        <h1>{{ active.label }}</h1>
        <p>{{ active.tagline }}</p>
      </header>

      <div class="tiles">
        <div class="tile">
          <span class="value">{{ view.deployments.length }}</span>
          <span class="tile-label">Roles shipped</span>
        </div>
        <div class="tile">
          <span class="value">{{ view.skills.length }}</span>
          <span class="tile-label">Services used</span>
        </div>
        <div class="tile">
          <span class="value">{{ view.certificates.length }}</span>
          <span class="tile-label">Credentials</span>
        </div>
        <div class="tile">
          <span class="value">{{ view.repositories.length }}</span>
          <span class="tile-label">Repositories</span>
        </div>
      </div>

      <section v-if="view.deployments.length" class="panel">
        <h2>Where I shipped on {{ active.label }}</h2>
        <article v-for="d in view.deployments" :key="d.id" class="role">
          <div class="role-head">
            <strong>{{ d.role }}</strong>
            <span class="muted">{{ d.company }} · {{ d.period }}</span>
          </div>
          <ul>
            <li v-for="point in highlightsFor(d)" :key="point">{{ point }}</li>
          </ul>
        </article>
      </section>

      <section v-if="view.skills.length" class="panel">
        <h2>Services &amp; tooling</h2>
        <div class="chips">
          <span v-for="s in view.skills" :key="s" class="chip">{{ s }}</span>
        </div>
      </section>

      <section v-if="view.certificates.length" class="panel">
        <h2>Credentials</h2>
        <ul class="certlist">
          <li v-for="c in view.certificates" :key="c.name">
            <a :href="c.url" target="_blank" rel="noopener noreferrer">{{ c.name }}</a>
          </li>
        </ul>
      </section>

      <section v-if="view.repositories.length" class="panel">
        <h2>Repositories</h2>
        <ul class="certlist">
          <li v-for="r in view.repositories" :key="r.name">
            <a :href="r.url" target="_blank" rel="noopener noreferrer">{{ r.name }}</a>
            <span class="muted"> — {{ r.category }}</span>
          </li>
        </ul>
      </section>

      <p v-if="!view.deployments.length && !view.skills.length" class="empty">
        Nothing tagged to {{ active.label }} yet.
      </p>
    </main>
  </div>
</template>

<script setup>
  import { deployments, nodePools, certificates, repositories } from '~/content'

  definePageMeta({ layout: 'bare' })
  useSeoMeta({
    title: 'Multi-Cloud — Manideep Chittineni',
    description:
      'The same platform career told per vendor: AWS, Microsoft Azure, Google Cloud and OCI.',
  })
  useHead({
    link: [{ rel: 'canonical', href: 'https://mchittineni.github.io/mchittineni-portfolio/' }],
  })

  // Each vendor gets its own chrome colour — the reskin is the point.
  const CLOUDS = [
    {
      key: 'aws',
      label: 'AWS',
      accent: '#FF9900',
      ink: '#8a5200',
      soft: 'rgba(255,153,0,.12)',
      region: 'eu-west-2',
      tagline: 'Six years of build, security and cost work across the AWS estate.',
      match:
        /\baws\b|amazon|\beks\b|\bs3\b|lambda|bedrock|redshift|cloudformation|codepipeline|cognito|\biam\b|guardduty|cloudwatch/i,
    },
    {
      key: 'azure',
      label: 'Microsoft Azure',
      accent: '#0078D4',
      ink: '#005a9e',
      soft: 'rgba(0,120,212,.14)',
      region: 'uksouth',
      tagline: 'Identity, governance and pipeline automation at subscription scale.',
      match: /azure|entra|\barm\b|az-900|ai-900|\baks\b|key vault/i,
    },
    {
      key: 'gcp',
      label: 'Google Cloud',
      accent: '#4285F4',
      ink: '#1a56c4',
      soft: 'rgba(66,133,244,.14)',
      region: 'europe-west2',
      tagline: 'GKE platforms, Workload Identity and data-platform delivery.',
      match: /\bgcp\b|google|\bgke\b|vertex|cloud build|workload identity/i,
    },
    {
      key: 'oci',
      label: 'Oracle Cloud',
      accent: '#C74634',
      ink: '#9c3527',
      soft: 'rgba(199,70,52,.14)',
      region: 'uk-london-1',
      tagline: 'Certified across OCI development and cloud operations.',
      match: /\boci\b|oracle/i,
    },
  ]

  const { resolved } = useTheme()
  const route = useRoute()
  const router = useRouter()
  const activeKey = ref('aws')
  const active = computed(() => CLOUDS.find(c => c.key === activeKey.value) ?? CLOUDS[0])

  const view = computed(() => {
    const re = active.value.match
    return {
      deployments: deployments.filter(d => re.test(d.cloud)),
      skills: nodePools.flatMap(p => p.nodes).filter(n => re.test(n)),
      certificates: certificates.filter(c => re.test(c.name) || re.test(c.issuer)),
      repositories: repositories.filter(r => re.test(r.description) || re.test(r.name)),
    }
  })

  /** Only the bullets that actually mention this vendor. */
  const highlightsFor = d =>
    d.groups
      .flatMap(g => g.points)
      .filter(p => active.value.match.test(p))
      .slice(0, 4)

  function select(key) {
    activeKey.value = key
    router.replace({ hash: `#${key}` })
  }

  onMounted(() => {
    const hash = route.hash.replace('#', '')
    if (CLOUDS.some(c => c.key === hash)) activeKey.value = hash
  })
</script>

<style scoped>
  .cloudview {
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
  .brand span {
    color: var(--vendor-ink);
  }
  .spacer {
    flex: 1;
  }
  .region {
    color: var(--text-dim);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0.12rem 0.45rem;
  }

  .tabs {
    display: flex;
    gap: 0.25rem;
    padding: 0 1rem;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
  }
  .tab {
    padding: 0.6rem 0.95rem;
    background: transparent;
    border: 0;
    border-bottom: 2px solid transparent;
    color: var(--text-dim);
    font-family: var(--mono);
    font-size: 0.82rem;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.15s ease;
  }
  .tab:hover {
    color: var(--text);
  }
  .tab.on {
    color: var(--vendor-ink);
    border-bottom-color: var(--vendor);
  }

  .main {
    max-width: 62rem;
    margin-inline: auto;
    padding: 1.75rem 1.25rem 0;
  }
  .head h1 {
    margin: 0;
    font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.1rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--vendor-ink);
  }
  .head p {
    margin: 0.3rem 0 0;
    color: var(--text-soft);
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 0.7rem;
    margin: 1.5rem 0;
  }
  .tile {
    border: 1px solid var(--border);
    border-left: 2px solid var(--vendor);
    border-radius: var(--radius-chrome);
    background: var(--vendor-soft);
    padding: 0.85rem 0.9rem;
  }
  .tile .value {
    display: block;
    font-family: var(--mono);
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.1;
  }
  .tile-label {
    font-family: var(--mono);
    font-size: 0.63rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-dim);
  }

  .panel {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    padding: 1.2rem 1.35rem;
    margin-bottom: 1rem;
  }
  .panel h2 {
    margin: 0 0 0.85rem;
    font-size: 0.98rem;
    font-weight: 700;
  }
  .role + .role {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }
  .role-head {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    margin-bottom: 0.4rem;
  }
  .muted {
    color: var(--text-dim);
    font-size: 0.85rem;
  }
  ul {
    margin: 0;
    padding-left: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  li {
    color: var(--text-soft);
    font-size: 0.88rem;
    line-height: 1.55;
  }
  .certlist {
    list-style: none;
    padding: 0;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .chip {
    font-family: var(--mono);
    font-size: 0.74rem;
    color: var(--text-soft);
    background: var(--vendor-soft);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0.18rem 0.5rem;
  }
  .empty {
    color: var(--text-dim);
  }
</style>
