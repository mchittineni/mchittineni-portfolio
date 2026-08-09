// Light / dark / system, persisted per visitor.
//
// "System" is the default and stamps nothing on <html>, so the bare :root
// tokens plus prefers-color-scheme decide. An explicit choice stamps
// data-theme, which beats the media query in both directions.
export type ThemeChoice = 'light' | 'dark' | 'system'

const KEY = 'mc:theme'

export const THEME_OPTIONS: { value: ThemeChoice; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀' },
  { value: 'system', label: 'System', icon: '◐' },
  { value: 'dark', label: 'Dark', icon: '☾' },
]

export function useTheme() {
  const choice = useState<ThemeChoice>('theme-choice', () => 'system')
  const systemDark = useState<boolean>('theme-system-dark', () => true)

  /** What is actually on screen, once "system" is resolved. */
  const resolved = computed<'light' | 'dark'>(() =>
    choice.value === 'system' ? (systemDark.value ? 'dark' : 'light') : choice.value
  )

  function paint() {
    if (!import.meta.client) return
    const root = document.documentElement
    if (choice.value === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', choice.value)
  }

  function set(next: ThemeChoice) {
    choice.value = next
    paint()
    try {
      if (next === 'system') localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, next)
    } catch {
      // Private browsing or a full quota — the preference is optional.
    }
  }

  onMounted(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored === 'light' || stored === 'dark') choice.value = stored
    } catch {
      // Ignore — fall back to system.
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = query.matches
    const onChange = (e: MediaQueryListEvent) => (systemDark.value = e.matches)
    query.addEventListener('change', onChange)
    onUnmounted(() => query.removeEventListener('change', onChange))

    paint()
  })

  return { choice, resolved, set, options: THEME_OPTIONS }
}
