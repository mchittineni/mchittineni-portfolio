import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useShell } from '~/composables/useShell'
import { COMPLETIONS } from '~/utils/commands'
import { deployments, profile, repositories } from '~/content'

// The real Nuxt router is left in place — mocking `useRouter` globally breaks
// Nuxt's own client plugins — and only its `push` is observed.
let push: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

const texts = (shell: ReturnType<typeof useShell>) => shell.lines.value.map(l => l.text)

describe('banner', () => {
  it('prints the masthead, identity and a hint', () => {
    const shell = useShell()
    shell.banner()
    const lines = texts(shell)
    expect(lines[0]).toContain('portfolio control plane')
    expect(lines).toContain(`${profile.name} · ${profile.title}`)
    expect(lines.some(l => l.includes('mc help'))).toBe(true)
  })

  it('tags the masthead as a title and the hint as dim', () => {
    const shell = useShell()
    shell.banner()
    expect(shell.lines.value[0].tone).toBe('title')
    expect(shell.lines.value[2].tone).toBe('accent')
    expect(shell.lines.value[3].tone).toBe('dim')
  })

  it('gives every line a unique, monotonic id', () => {
    const shell = useShell()
    shell.banner()
    const ids = shell.lines.value.map(l => l.id)
    expect(ids).toEqual([...ids].sort((a, b) => a - b))
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('run — echo and rejection', () => {
  it('echoes the command at a prompt', () => {
    const shell = useShell()
    shell.run('mc top')
    expect(shell.lines.value[0].tone).toBe('prompt')
    expect(shell.lines.value[0].text).toBe('manideep@control-plane:~$ mc top')
  })

  it('echoes an empty prompt and stops, recording no history', () => {
    const shell = useShell()
    shell.run('   ')
    expect(shell.lines.value).toHaveLength(1)
    expect(shell.history.value).toEqual([])
  })

  it('rejects anything that does not start with mc', () => {
    const shell = useShell()
    shell.run('ls -la')
    expect(shell.lines.value[1].tone).toBe('error')
    expect(shell.lines.value[1].text).toContain('command not found: ls')
  })

  it('trims surrounding whitespace before dispatching', () => {
    const shell = useShell()
    shell.run('   mc top   ')
    expect(shell.lines.value[1].tone).toBe('out')
  })

  it('records each command in history and parks the cursor past the end', () => {
    const shell = useShell()
    shell.run('mc top')
    shell.run('mc help')
    expect(shell.history.value).toEqual(['mc top', 'mc help'])
  })
})

describe('run — command results', () => {
  it('prints result rows as fixed-width output', () => {
    const shell = useShell()
    shell.run('mc get deploy')
    const rows = shell.lines.value.slice(1)
    expect(rows).toHaveLength(deployments.length)
    rows.forEach(row => {
      expect(row.tone).toBe('out')
      expect(row.fixed).toBe(true)
    })
  })

  it('prints a command error in the error tone', () => {
    const shell = useShell()
    shell.run('mc get pods')
    expect(shell.lines.value[1].tone).toBe('error')
    expect(shell.lines.value[1].text).toContain('unknown resource')
  })

  it('empties the buffer on clear, keeping the echoed prompt out too', () => {
    const shell = useShell()
    shell.banner()
    shell.run('mc clear')
    expect(shell.lines.value).toEqual([])
  })

  it('opens a repository URL in a new tab', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const shell = useShell()
    shell.run(`mc open ${repositories[0].slug}`)
    expect(open).toHaveBeenCalledWith(repositories[0].url, '_blank', 'noopener')
  })

  it('defers navigation so the confirmation line is readable first', () => {
    vi.useFakeTimers()
    const shell = useShell()
    shell.run('mc console')
    expect(push).not.toHaveBeenCalled()
    vi.advanceTimersByTime(350)
    expect(push).toHaveBeenCalledWith('/console')
  })

  it('navigates back to the portfolio too', () => {
    vi.useFakeTimers()
    useShell().run('mc portfolio')
    vi.advanceTimersByTime(350)
    expect(push).toHaveBeenCalledWith('/')
  })

  it('replays its own history', () => {
    const shell = useShell()
    shell.run('mc top')
    shell.run('mc history')
    const last = shell.lines.value[shell.lines.value.length - 1].text
    expect(last).toContain('mc history')
  })
})

describe('run — pipes', () => {
  it('filters output through grep', () => {
    const shell = useShell()
    shell.run(`mc get deploy | grep ${deployments[0].name}`)
    const rows = shell.lines.value.slice(1)
    expect(rows.length).toBeGreaterThan(0)
    rows.forEach(row => expect(row.text).toContain(deployments[0].name))
  })

  it('matches case-insensitively', () => {
    const shell = useShell()
    shell.run(`mc get deploy | grep ${deployments[0].name.toUpperCase()}`)
    expect(shell.lines.value.slice(1).length).toBeGreaterThan(0)
  })

  it('strips surrounding quotes from the needle', () => {
    const shell = useShell()
    shell.run(`mc get deploy | grep "${deployments[0].name}"`)
    expect(shell.lines.value[1].tone).toBe('out')
  })

  it('chains multiple greps', () => {
    const shell = useShell()
    shell.run('mc help | grep mc | grep clear')
    const rows = shell.lines.value.slice(1)
    expect(rows).toHaveLength(1)
    expect(rows[0].text).toContain('mc clear')
  })

  it('warns when a grep matches nothing', () => {
    const shell = useShell()
    shell.run('mc get deploy | grep zzzznope')
    expect(shell.lines.value[1].tone).toBe('warn')
    expect(shell.lines.value[1].text).toContain('no matches')
  })

  it('rejects any pipe stage that is not grep', () => {
    const shell = useShell()
    shell.run('mc get deploy | wc -l')
    expect(shell.lines.value[1].tone).toBe('error')
    expect(shell.lines.value[1].text).toContain('unsupported pipe')
  })

  it('does not pipe past a clear, which produces no rows', () => {
    const shell = useShell()
    shell.run('mc clear | grep anything')
    expect(shell.lines.value).toEqual([])
  })
})

describe('submit', () => {
  it('runs the current input and empties it', () => {
    const shell = useShell()
    shell.input.value = 'mc top'
    shell.submit()
    expect(shell.input.value).toBe('')
    expect(shell.history.value).toEqual(['mc top'])
  })
})

describe('ghost suggestion', () => {
  it('is empty for empty input', () => {
    const shell = useShell()
    expect(shell.ghost.value).toBe('')
    expect(shell.ghostRest.value).toBe('')
  })

  it('suggests a completion candidate for a prefix', () => {
    const shell = useShell()
    shell.input.value = 'mc des'
    expect(shell.ghost.value.startsWith('mc des')).toBe(true)
  })

  it('prefers the most recent matching history entry over the static list', () => {
    const shell = useShell()
    shell.run('mc get endpoints')
    shell.input.value = 'mc get e'
    expect(shell.ghost.value).toBe('mc get endpoints')
  })

  it('exposes only the characters still to be typed', () => {
    const shell = useShell()
    shell.input.value = 'mc hel'
    expect(shell.ghostRest.value).toBe(shell.ghost.value.slice('mc hel'.length))
    expect('mc hel' + shell.ghostRest.value).toBe(shell.ghost.value)
  })

  it('never suggests the input back to itself', () => {
    const shell = useShell()
    shell.input.value = 'mc help'
    expect(shell.ghost.value).not.toBe('mc help')
  })

  it('is empty when nothing matches', () => {
    const shell = useShell()
    shell.input.value = 'zzz'
    expect(shell.ghost.value).toBe('')
    expect(shell.ghostRest.value).toBe('')
  })

  it('accepts the suggestion into the input', () => {
    const shell = useShell()
    shell.input.value = 'mc who'
    shell.acceptGhost()
    expect(shell.input.value).toBe('mc whoami')
  })

  it('leaves the input alone when there is nothing to accept', () => {
    const shell = useShell()
    shell.input.value = 'zzz'
    shell.acceptGhost()
    expect(shell.input.value).toBe('zzz')
  })
})

describe('complete', () => {
  it('completes a unique match and appends a space', () => {
    const shell = useShell()
    shell.input.value = 'mc whoa'
    shell.complete()
    expect(shell.input.value).toBe('mc whoami ')
  })

  it('completes to the longest shared prefix when several match', () => {
    const shell = useShell()
    shell.input.value = 'mc g'
    shell.complete()
    // "mc get" is itself a candidate, so the shared prefix stops before the space.
    expect(shell.input.value).toBe('mc get')
    expect(COMPLETIONS.filter(c => c.startsWith('mc get')).length).toBeGreaterThan(1)
  })

  it('lists the candidates once the prefix can grow no further', () => {
    const shell = useShell()
    shell.input.value = 'mc get '
    shell.complete()
    const listed = shell.lines.value[0]
    expect(listed.tone).toBe('dim')
    expect(listed.text).toContain('mc get deploy')
    expect(listed.text).toContain('mc get repos')
  })

  it('does nothing when nothing matches', () => {
    const shell = useShell()
    shell.input.value = 'zzz'
    shell.complete()
    expect(shell.input.value).toBe('zzz')
    expect(shell.lines.value).toEqual([])
  })
})

describe('history navigation', () => {
  it('walks backwards through history', () => {
    const shell = useShell()
    shell.run('mc top')
    shell.run('mc help')
    shell.previous()
    expect(shell.input.value).toBe('mc help')
    shell.previous()
    expect(shell.input.value).toBe('mc top')
  })

  it('stops at the oldest entry', () => {
    const shell = useShell()
    shell.run('mc top')
    shell.previous()
    shell.previous()
    expect(shell.input.value).toBe('mc top')
  })

  it('does nothing when there is no history', () => {
    const shell = useShell()
    shell.previous()
    expect(shell.input.value).toBe('')
  })

  it('walks forwards again', () => {
    const shell = useShell()
    shell.run('mc top')
    shell.run('mc help')
    shell.previous()
    shell.previous()
    shell.next()
    expect(shell.input.value).toBe('mc help')
  })

  it('clears the input when walking forwards past the newest entry', () => {
    const shell = useShell()
    shell.run('mc top')
    shell.previous()
    shell.next()
    expect(shell.input.value).toBe('')
  })
})
