// The shell engine: tokenizer, pipes, history ring, completion index and the
// inline suggestion. Built before the commands so the terminal has real
// ergonomics rather than a switch statement wearing a prompt.
import { runCommand, COMPLETIONS, type CommandResult } from '~/utils/commands'
import { profile } from '~/content'

export type Tone = 'out' | 'dim' | 'error' | 'warn' | 'accent' | 'prompt' | 'title'

export interface Line {
  id: number
  text: string
  tone: Tone
  /** Pre-formatted rows keep their column alignment. */
  fixed?: boolean
}

export function useShell() {
  const router = useRouter()

  const lines = ref<Line[]>([])
  const history = ref<string[]>([])
  const input = ref('')
  const cursor = ref(-1)
  let seq = 0

  const push = (text: string, tone: Tone = 'out', fixed = false) => {
    lines.value.push({ id: seq++, text, tone, fixed })
  }

  /** The dim completion shown ahead of the cursor; → or Tab accepts it. */
  const ghost = computed(() => {
    const value = input.value
    if (!value) return ''
    const pool = [...history.value].reverse().concat(COMPLETIONS)
    return pool.find(c => c.startsWith(value) && c !== value) ?? ''
  })

  /**
   * Only the part still to be typed. The overlay must not repaint the
   * characters already in the input — two glyph sets on the same pixels render
   * as smudged, doubled text.
   */
  const ghostRest = computed(() => (ghost.value ? ghost.value.slice(input.value.length) : ''))

  function banner() {
    push('mc — portfolio control plane, v1.0.0', 'title')
    push('')
    push(`${profile.name} · ${profile.title}`, 'accent')
    push('Type "mc help" to begin. Tab completes, ↑ walks history, | grep filters.', 'dim')
    push('')
  }

  function apply(result: CommandResult): string[] | null {
    if (result.clear) {
      lines.value = []
      return null
    }
    if (result.error) {
      push(result.error, 'error')
      return null
    }
    if (result.open && import.meta.client) window.open(result.open, '_blank', 'noopener')
    if (result.navigate) setTimeout(() => router.push(result.navigate!), 350)
    return result.lines ?? []
  }

  function run(raw: string) {
    const text = raw.trim()
    push(`manideep@control-plane:~$ ${text}`, 'prompt')
    if (!text) return

    history.value.push(text)
    cursor.value = history.value.length

    const [head, ...pipes] = text.split('|').map(s => s.trim())
    const tokens = head.split(/\s+/)

    if (tokens[0] !== 'mc') {
      push(`command not found: ${tokens[0]} — every command starts with "mc".`, 'error')
      return
    }

    const out = apply(runCommand((tokens[1] ?? '').toLowerCase(), tokens.slice(2), history.value))
    if (out === null) return

    let rows = out
    for (const stage of pipes) {
      const match = stage.match(/^grep\s+(.+)$/i)
      if (!match) {
        push(`error: unsupported pipe "${stage}" — only grep is available`, 'error')
        return
      }
      const needle = match[1].replace(/^["']|["']$/g, '').toLowerCase()
      rows = rows.filter(l => l.toLowerCase().includes(needle))
      if (!rows.length) {
        push(`grep: no matches for "${match[1]}"`, 'warn')
        return
      }
    }
    rows.forEach(row => push(row, 'out', true))
  }

  function submit() {
    run(input.value)
    input.value = ''
  }

  /** Tab: complete to the longest shared prefix, or list the candidates. */
  function complete() {
    const hits = COMPLETIONS.filter(c => c.startsWith(input.value))
    if (!hits.length) return
    if (hits.length === 1) {
      input.value = hits[0] + ' '
      return
    }
    let prefix = hits[0]
    hits.forEach(h => {
      while (!h.startsWith(prefix)) prefix = prefix.slice(0, -1)
    })
    if (prefix.length > input.value.length) input.value = prefix
    else push(hits.join('   '), 'dim')
  }

  function previous() {
    if (cursor.value > 0) input.value = history.value[--cursor.value]
  }

  function next() {
    if (cursor.value < history.value.length - 1) input.value = history.value[++cursor.value]
    else {
      cursor.value = history.value.length
      input.value = ''
    }
  }

  const acceptGhost = () => {
    if (ghost.value) input.value = ghost.value
  }

  return {
    lines,
    input,
    ghost,
    ghostRest,
    history,
    banner,
    run,
    submit,
    complete,
    previous,
    next,
    acceptGhost,
  }
}
