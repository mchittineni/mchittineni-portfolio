<template>
  <div class="console">
    <!-- Top bar -->
    <header class="topbar">
      <span class="brand">mchittineni <span aria-hidden="true">▸</span> control-plane</span>
      <span class="ctx">ctx: portfolio/prod</span>
      <span class="spacer"></span>
      <button class="kbd" @click="paletteOpen = true">⌘K</button>
      <ConsoleStatusPill label="healthy" tone="ok" />
      <time class="clock">{{ clock }}</time>
    </header>

    <div class="body">
      <!-- Sidebar -->
      <nav class="sidebar" aria-label="Console resources">
        <template v-for="group in groups" :key="group.name">
          <p class="group">{{ group.name }}</p>
          <button
            v-for="item in group.items"
            :key="item.key"
            :class="['link', { on: view === item.key }]"
            :aria-current="view === item.key ? 'page' : undefined"
            @click="select(item.key)"
          >
            <span class="ico" aria-hidden="true">{{ item.icon }}</span>
            {{ item.label }}
            <span v-if="item.count" class="count">{{ item.count }}</span>
          </button>
        </template>

        <!-- Sits under the Access heading the loop above already rendered. -->
        <a class="link" :href="`${base}Manideep_Chittineni_Resume.pdf`" download>
          <span class="ico" aria-hidden="true">⇩</span> Resume
        </a>
      </nav>

      <!-- Main -->
      <main class="main">
        <!-- Overview -->
        <section v-if="view === 'overview'">
          <header class="head">
            <h1>Overview</h1>
            <p>profile/manideep-chittineni · {{ profile.title }}</p>
          </header>

          <div class="tiles">
            <div v-for="stat in stats" :key="stat.label" class="tile">
              <span class="value">{{ stat.value }}</span>
              <span class="tile-label">{{ stat.label }}</span>
            </div>
          </div>

          <p class="subhead">Recent events</p>
          <ConsoleResourceTable :columns="eventColumns" :rows="events" row-key="message">
            <template #type="{ row }">
              <ConsoleStatusPill :label="row.type" :tone="row.type === 'Warning' ? 'warn' : 'ok'" />
            </template>
          </ConsoleResourceTable>
        </section>

        <!-- Deployments -->
        <section v-else-if="view === 'deployments'">
          <header class="head">
            <h1>Deployments</h1>
            <p>ns/experience · {{ deployments.length }} items · ready = workstreams delivered</p>
          </header>

          <ConsoleResourceTable
            :columns="deploymentColumns"
            :rows="deployments"
            row-key="id"
            selectable
            :selected="selected"
            @select="toggle"
          >
            <template #name="{ row }">{{ row.name }}</template>
            <template #status="{ row }">
              <ConsoleStatusPill
                :label="row.status"
                :tone="row.status === 'Running' ? 'ok' : 'muted'"
              />
            </template>
          </ConsoleResourceTable>

          <ConsoleDescribePane
            v-if="activeDeployment"
            :title="activeDeployment.role"
            :meta="`${activeDeployment.company} · ${activeDeployment.period} · ${activeDeployment.cloud}`"
          >
            <div v-for="group in activeDeployment.groups" :key="group.title" class="grp">
              <p class="grp-title">{{ group.title }}</p>
              <ul>
                <li v-for="point in group.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </ConsoleDescribePane>
          <p v-else class="hint">Select a row to describe it</p>
        </section>

        <!-- Repositories -->
        <section v-else-if="view === 'repositories'">
          <header class="head">
            <h1>Repositories</h1>
            <p>
              repositories.portfolio · {{ repositories.length }} items · {{ privateCount }} private
            </p>
          </header>

          <ConsoleResourceTable
            :columns="repoColumns"
            :rows="repositories"
            row-key="name"
            selectable
            :selected="selected"
            @select="toggle"
          >
            <template #name="{ row }">{{ row.name }}</template>
            <template #visibility="{ row }">
              <ConsoleStatusPill
                :label="row.private ? 'Private' : 'Public'"
                :tone="row.private ? 'warn' : 'ok'"
              />
            </template>
            <template #languages="{ row }">
              <ConsoleLangBar :languages="row.languages" />
            </template>
          </ConsoleResourceTable>

          <ConsoleDescribePane
            v-if="activeRepo"
            :title="activeRepo.name"
            :meta="activeRepo.category"
          >
            <ul>
              <li>{{ activeRepo.description }}</li>
            </ul>
            <div class="langkey">
              <span v-for="lang in activeRepo.languages" :key="lang.name">
                <i :style="{ background: langColors[lang.name] || '#818cf8' }"></i>
                {{ lang.name }} {{ lang.percentage }}%
              </span>
            </div>
            <a class="repo-link" :href="activeRepo.url" target="_blank" rel="noopener noreferrer">
              {{ activeRepo.url }} ↗
            </a>
            <p v-if="activeRepo.private" class="private-note">
              Private — this link resolves for you only.
            </p>
          </ConsoleDescribePane>
          <p v-else class="hint">Select a row to describe it</p>
        </section>

        <!-- Node pools -->
        <section v-else-if="view === 'nodepools'">
          <header class="head">
            <h1>Node Pools</h1>
            <p>ns/skills · {{ nodePools.length }} pools · {{ nodeCount }} nodes</p>
          </header>

          <ConsoleResourceTable
            :columns="poolColumns"
            :rows="poolRows"
            row-key="name"
            selectable
            :selected="selected"
            @select="toggle"
          >
            <template #name="{ row }">{{ row.name }}</template>
            <template #status><ConsoleStatusPill label="Ready" tone="ok" /></template>
          </ConsoleResourceTable>

          <ConsoleDescribePane
            v-if="activePool"
            :title="activePool.title"
            :meta="`${activePool.nodes.length} nodes · all Ready`"
          >
            <div class="chips">
              <span v-for="node in activePool.nodes" :key="node" class="chip">{{ node }}</span>
            </div>
          </ConsoleDescribePane>
          <p v-else class="hint">Select a pool to list its nodes</p>
        </section>

        <!-- Certificates -->
        <section v-else-if="view === 'certificates'">
          <header class="head">
            <h1>Certificates</h1>
            <p>cert-manager.io · {{ certificates.length }} issued · 0 expired</p>
          </header>

          <ConsoleResourceTable :columns="certColumns" :rows="certificates">
            <template #name="{ row }">
              <a :href="row.url" target="_blank" rel="noopener noreferrer">{{ row.name }}</a>
            </template>
            <template #status><ConsoleStatusPill label="Valid" tone="ok" /></template>
          </ConsoleResourceTable>
        </section>

        <!-- Endpoints -->
        <section v-else>
          <header class="head">
            <h1>Endpoints</h1>
            <p>ns/contact · {{ endpoints.length }} services</p>
          </header>

          <ConsoleResourceTable :columns="endpointColumns" :rows="endpoints">
            <template #address="{ row }">
              <a :href="row.url" target="_blank" rel="noopener noreferrer">{{ row.address }} ↗</a>
            </template>
            <template #status><ConsoleStatusPill label="Active" tone="ok" /></template>
          </ConsoleResourceTable>
        </section>
      </main>
    </div>

    <!-- Command palette -->
    <div
      v-if="paletteOpen"
      class="palette"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      @click.self="paletteOpen = false"
    >
      <div class="palette-box">
        <input
          ref="paletteInput"
          v-model="query"
          class="palette-input"
          placeholder="Jump to a resource…"
          aria-label="Search resources"
          @keydown.esc="paletteOpen = false"
          @keydown.enter="jump(matches[0])"
        />
        <ul class="palette-list">
          <li v-for="match in matches" :key="match.key">
            <button @click="jump(match)">
              <span class="ico" aria-hidden="true">{{ match.icon }}</span
              >{{ match.label }}
            </button>
          </li>
          <li v-if="!matches.length" class="palette-empty">No matching resource</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    profile,
    stats,
    deployments,
    repositories,
    nodePools,
    certificates,
    endpoints,
    events,
    langColors,
  } from '~/content'

  definePageMeta({ layout: 'bare' })

  useSeoMeta({
    title: 'Console — Manideep Chittineni',
    description:
      'My career as a platform control plane: roles as Deployments, repositories, node pools and certificates.',
    robots: 'index, follow',
  })
  useHead({
    link: [{ rel: 'canonical', href: 'https://mchittineni.github.io/mchittineni-portfolio/' }],
  })

  const base = useRuntimeConfig().app.baseURL
  const route = useRoute()
  const router = useRouter()

  const view = ref('overview')
  const selected = ref(null)
  const paletteOpen = ref(false)
  const query = ref('')
  const paletteInput = ref(null)
  const clock = ref('')

  const groups = [
    {
      name: 'Workloads',
      items: [
        { key: 'overview', icon: '▦', label: 'Overview' },
        { key: 'deployments', icon: '◈', label: 'Deployments', count: deployments.length },
        { key: 'repositories', icon: '▤', label: 'Repositories', count: repositories.length },
      ],
    },
    {
      name: 'Platform',
      items: [
        { key: 'nodepools', icon: '▩', label: 'Node Pools', count: nodePools.length },
        { key: 'certificates', icon: '✓', label: 'Certificates', count: certificates.length },
      ],
    },
    {
      name: 'Access',
      items: [{ key: 'endpoints', icon: '⇄', label: 'Endpoints', count: endpoints.length }],
    },
  ]

  const allItems = groups.flatMap(g => g.items)

  const eventColumns = [
    { key: 'age', label: 'Last seen' },
    { key: 'type', label: 'Type' },
    { key: 'reason', label: 'Reason' },
    { key: 'object', label: 'Object' },
    { key: 'message', label: 'Message' },
  ]
  const deploymentColumns = [
    { key: 'name', label: 'Name' },
    { key: 'ready', label: 'Ready' },
    { key: 'status', label: 'Status' },
    { key: 'age', label: 'Age' },
    { key: 'cloud', label: 'Cloud' },
  ]
  const repoColumns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'visibility', label: 'Visibility' },
    { key: 'languages', label: 'Language mix' },
  ]
  const poolColumns = [
    { key: 'name', label: 'Name' },
    { key: 'nodeCount', label: 'Nodes' },
    { key: 'status', label: 'Status' },
  ]
  const certColumns = [
    { key: 'name', label: 'Name' },
    { key: 'issuer', label: 'Issuer' },
    { key: 'status', label: 'Status' },
  ]
  const endpointColumns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'address', label: 'Address' },
    { key: 'status', label: 'Status' },
  ]

  const poolRows = nodePools.map(p => ({ ...p, nodeCount: p.nodes.length }))
  const nodeCount = nodePools.reduce((total, p) => total + p.nodes.length, 0)
  const privateCount = repositories.filter(r => r.private).length

  const activeDeployment = computed(() => deployments.find(d => d.id === selected.value))
  const activeRepo = computed(() => repositories.find(r => r.name === selected.value))
  const activePool = computed(() => nodePools.find(p => p.name === selected.value))

  const matches = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return allItems
    return allItems.filter(i => i.label.toLowerCase().includes(q))
  })

  function select(key) {
    view.value = key
    selected.value = null
    router.replace({ hash: `#${key}` })
  }

  const toggle = key => {
    selected.value = selected.value === key ? null : key
  }

  function jump(item) {
    if (!item) return
    select(item.key)
    paletteOpen.value = false
    query.value = ''
  }

  function onKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      paletteOpen.value = !paletteOpen.value
      return
    }
    if (event.key === 'Escape') paletteOpen.value = false
  }

  watch(paletteOpen, open => {
    if (open) nextTick(() => paletteInput.value?.focus())
  })

  let timer
  onMounted(() => {
    // /console#deployments is a real, linkable view.
    const hash = route.hash.replace('#', '')
    if (allItems.some(i => i.key === hash)) view.value = hash

    window.addEventListener('keydown', onKeydown)
    const tick = () => (clock.value = new Date().toLocaleTimeString('en-GB'))
    tick()
    timer = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    clearInterval(timer)
  })
</script>

<style scoped>
  .console {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Top bar */
  .topbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 0.5rem 0.9rem;
    min-height: 3rem;
    background: var(--chrome);
    border-bottom: 1px solid var(--border);
    font-family: var(--mono);
    font-size: 0.78rem;
    flex-shrink: 0;
  }
  .brand {
    color: var(--text);
    font-weight: 600;
  }
  .brand span {
    color: var(--accent);
  }
  .ctx,
  .kbd {
    color: var(--text-dim);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0.12rem 0.45rem;
    background: transparent;
    font-family: var(--mono);
    font-size: 0.72rem;
  }
  .kbd {
    cursor: pointer;
  }
  .kbd:hover {
    color: var(--text);
    border-color: var(--border-strong);
  }
  .spacer {
    flex: 1;
  }
  .clock {
    color: var(--accent-2);
    font-size: 0.74rem;
    font-variant-numeric: tabular-nums;
  }

  .body {
    display: flex;
    flex: 1;
    min-height: 0;
  }

  /* Sidebar */
  .sidebar {
    width: 12rem;
    flex-shrink: 0;
    background: var(--sunken);
    border-right: 1px solid var(--border);
    padding: 0.75rem 0.5rem;
    overflow-y: auto;
  }
  .group {
    margin: 0.6rem 0.5rem 0.3rem;
    font-family: var(--mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--text-dim);
  }
  .link {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: 100%;
    padding: 0.45rem 0.55rem;
    border: 0;
    border-left: 2px solid transparent;
    background: transparent;
    color: var(--text-soft);
    font-family: var(--mono);
    font-size: 0.8rem;
    text-align: left;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background 0.14s ease,
      color 0.14s ease;
  }
  .link:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .link.on {
    background: rgba(129, 140, 248, 0.13);
    color: var(--accent);
    border-left-color: var(--accent);
  }
  .ico {
    width: 1.1rem;
    text-align: center;
  }
  .count {
    margin-left: auto;
    font-size: 0.68rem;
    color: var(--text-dim);
  }
  .link.on .count {
    color: var(--accent);
  }

  /* Main */
  .main {
    flex: 1;
    overflow-y: auto;
    padding: 1.4rem;
    min-width: 0;
  }
  .head {
    margin-bottom: 1.1rem;
  }
  .head h1 {
    font-family: var(--mono);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: var(--text);
  }
  .head p {
    font-family: var(--mono);
    font-size: 0.74rem;
    color: var(--text-dim);
    margin: 0.15rem 0 0;
  }
  .subhead {
    font-family: var(--mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--text-dim);
    margin: 0 0 0.5rem;
  }
  .hint {
    font-family: var(--mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--text-dim);
    margin-top: 0.8rem;
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 0.6rem;
    margin-bottom: 1.4rem;
  }
  .tile {
    border: 1px solid var(--border);
    border-radius: var(--radius-chrome);
    background: var(--surface);
    padding: 0.8rem 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .tile .value {
    font-family: var(--mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.1;
  }
  .tile-label {
    font-family: var(--mono);
    font-size: 0.63rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-dim);
  }

  .grp {
    margin-top: 0.8rem;
  }
  .grp-title {
    font-family: var(--mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.11em;
    color: var(--accent-2);
    margin: 0 0 0.35rem;
  }
  ul {
    margin: 0;
    padding-left: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  li {
    font-size: 0.85rem;
    color: var(--text-soft);
    line-height: 1.55;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .chip {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--text-soft);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0.12rem 0.45rem;
    background: var(--surface);
  }

  .langkey {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.6rem;
  }
  .langkey span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--mono);
    font-size: 0.67rem;
    color: var(--text-dim);
  }
  .langkey i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
  }
  .repo-link {
    display: inline-block;
    margin-top: 0.7rem;
    font-family: var(--mono);
    font-size: 0.76rem;
  }
  .private-note {
    margin: 0.5rem 0 0;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--warn);
  }

  /* Palette */
  .palette {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: var(--overlay);
    backdrop-filter: blur(4px);
    padding: 12vh 1rem 1rem;
    display: flex;
    justify-content: center;
  }
  .palette-box {
    width: 100%;
    max-width: 30rem;
    height: fit-content;
    background: var(--bg-soft);
    border: 1px solid var(--border-strong);
    border-radius: 0.55rem;
    overflow: hidden;
    box-shadow: var(--shadow-card);
  }
  .palette-input {
    width: 100%;
    padding: 0.85rem 1rem;
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--border);
    outline: none;
    color: var(--text);
    font-family: var(--mono);
    font-size: 0.9rem;
  }
  .palette-list {
    list-style: none;
    margin: 0;
    padding: 0.35rem;
    max-height: 18rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .palette-list button {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: 100%;
    padding: 0.5rem 0.6rem;
    border: 0;
    background: transparent;
    color: var(--text-soft);
    font-family: var(--mono);
    font-size: 0.82rem;
    text-align: left;
    border-radius: 4px;
    cursor: pointer;
  }
  .palette-list button:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .palette-empty {
    padding: 0.6rem;
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--text-dim);
  }

  @media (max-width: 760px) {
    .console {
      height: auto;
      min-height: 100vh;
    }
    .body {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
      display: flex;
      gap: 0.25rem;
      overflow-x: auto;
      border-right: 0;
      border-bottom: 1px solid var(--border);
    }
    .group {
      display: none;
    }
    .link {
      width: auto;
      white-space: nowrap;
      border-left: 0;
      border-bottom: 2px solid transparent;
    }
    .link.on {
      border-left: 0;
      border-bottom-color: var(--accent);
    }
    .count {
      display: none;
    }
    .main {
      padding: 1rem;
    }
  }
</style>
