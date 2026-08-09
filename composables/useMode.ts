// The interface registry. Every mode reads the same content/ layer; they differ
// only in how they present it. "/" stays canonical — the boot gate is a
// client-only overlay, so crawlers and no-JS visitors always get the portfolio.
export type Mode = 'portfolio' | 'console' | 'cloud' | 'agent' | 'ide' | 'terminal' | 'modes'

const CHOSEN_KEY = 'mc:mode-chosen'
const LAST_KEY = 'mc:mode'

export interface ModeMeta {
  key: Mode
  path: string
  label: string
  icon: string
  blurb: string
}

export const MODE_LIST: ModeMeta[] = [
  {
    key: 'portfolio',
    path: '/',
    label: 'Portfolio',
    icon: '▤',
    blurb: 'The standard read: background, skills, experience and projects in one scroll.',
  },
  {
    key: 'console',
    path: '/console',
    label: 'Control Plane',
    icon: '▦',
    blurb:
      'Browse my career as infrastructure: roles as deployments, plus repos, skill pools and certificates.',
  },
  {
    key: 'cloud',
    path: '/cloud',
    label: 'Multi-Cloud',
    icon: '☁',
    blurb: 'Pick a vendor and see only that work: AWS, Azure, Google Cloud or OCI.',
  },
  {
    key: 'agent',
    path: '/agent',
    label: 'Agent',
    icon: '✦',
    blurb: 'Ask a question and watch it resolve step by step against my data.',
  },
  {
    key: 'ide',
    path: '/ide',
    label: 'Editor',
    icon: '⌗',
    blurb: 'Read my background as source files, with a working terminal underneath.',
  },
  {
    key: 'terminal',
    path: '/terminal',
    label: 'Terminal',
    icon: '❯_',
    blurb: 'Type commands to explore. Tab completes, arrows recall, pipes filter.',
  },
]

/**
 * The chooser is not itself an interface, so it stays out of MODE_LIST — the
 * switcher and the boot gate both render that list and would otherwise offer a
 * way into the page you are already on. It still needs an entry so `current`
 * resolves to something other than 'portfolio' while you are on it: the boot
 * gate keys off that to stay closed, and the switcher off it to highlight
 * nothing.
 */
export const CHOOSER: ModeMeta = {
  key: 'modes',
  path: '/modes',
  label: 'All interfaces',
  icon: '◈',
  blurb: 'Every way in, side by side.',
}

const BY_PATH: Record<string, Mode> = {
  '/console': 'console',
  '/cloud': 'cloud',
  '/agent': 'agent',
  '/ide': 'ide',
  '/terminal': 'terminal',
  '/modes': 'modes',
}

export function useMode() {
  const route = useRoute()

  const current = computed<Mode>(() => {
    const hit = Object.keys(BY_PATH).find(p => route.path.includes(p))
    return hit ? BY_PATH[hit] : 'portfolio'
  })

  const meta = computed(() => MODE_LIST.find(m => m.key === current.value) ?? CHOOSER)

  /** Cycles through every interface in registry order. */
  const next = computed<ModeMeta>(() => {
    const i = MODE_LIST.findIndex(m => m.key === current.value)
    return MODE_LIST[(i + 1) % MODE_LIST.length]
  })

  function store(key: string, value: string) {
    if (!import.meta.client) return
    try {
      localStorage.setItem(key, value)
    } catch {
      // Private browsing or a full quota — the preference is optional.
    }
  }

  const hasChosen = () => {
    if (!import.meta.client) return true
    try {
      return localStorage.getItem(CHOSEN_KEY) === '1'
    } catch {
      return true
    }
  }

  const markChosen = () => store(CHOSEN_KEY, '1')

  // The chooser is a waypoint, not a destination — recording it would make
  // "last interface" mean "the page you pick interfaces from".
  watch(current, m => m !== 'modes' && store(LAST_KEY, m), { immediate: true })

  const lastVisited = () => {
    if (!import.meta.client) return null
    try {
      return localStorage.getItem(LAST_KEY) as Mode | null
    } catch {
      return null
    }
  }

  return {
    current,
    meta,
    next,
    modes: MODE_LIST,
    chooser: CHOOSER,
    hasChosen,
    markChosen,
    lastVisited,
  }
}
