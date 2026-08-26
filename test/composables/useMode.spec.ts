import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { CHOOSER, MODE_LIST, useMode } from '~/composables/useMode'

const route = { path: '/', hash: '', query: {} as Record<string, string> }

mockNuxtImport('useRoute', () => () => route)

/** Fresh instance per assertion — `current` is a computed over a static route. */
const at = (path: string) => {
  route.path = path
  return useMode()
}

beforeEach(() => {
  localStorage.clear()
  route.path = '/'
})

describe('MODE_LIST', () => {
  it('registers every interface with a unique key and path', () => {
    expect(MODE_LIST.length).toBeGreaterThan(1)
    expect(new Set(MODE_LIST.map(m => m.key)).size).toBe(MODE_LIST.length)
    expect(new Set(MODE_LIST.map(m => m.path)).size).toBe(MODE_LIST.length)
  })

  it('gives every entry a label, icon and blurb', () => {
    MODE_LIST.forEach(m => {
      expect(m.label.length).toBeGreaterThan(0)
      expect(m.icon.length).toBeGreaterThan(0)
      expect(m.blurb.length).toBeGreaterThan(0)
    })
  })

  it('keeps the portfolio canonical at the root', () => {
    expect(MODE_LIST[0]).toMatchObject({ key: 'portfolio', path: '/' })
  })

  it('leaves the chooser out of the registry so it cannot link to itself', () => {
    expect(MODE_LIST.map(m => m.key)).not.toContain('modes')
    expect(CHOOSER).toMatchObject({ key: 'modes', path: '/modes' })
  })
})

describe('current', () => {
  it.each([
    ['/console', 'console'],
    ['/cloud', 'cloud'],
    ['/agent', 'agent'],
    ['/ide', 'ide'],
    ['/terminal', 'terminal'],
    ['/modes', 'modes'],
  ])('resolves %s to %s', (path, expected) => {
    expect(at(path).current.value).toBe(expected)
  })

  it('falls back to the portfolio for the root', () => {
    expect(at('/').current.value).toBe('portfolio')
  })

  it('falls back to the portfolio for an unknown path', () => {
    expect(at('/nope').current.value).toBe('portfolio')
  })

  it('matches a base-path prefixed route, as GitHub Pages serves', () => {
    expect(at('/mchittineni-portfolio/terminal').current.value).toBe('terminal')
  })
})

describe('meta', () => {
  it('returns the registry entry for a real interface', () => {
    expect(at('/console').meta.value).toBe(MODE_LIST.find(m => m.key === 'console'))
  })

  it('falls back to the chooser, which is not in the registry', () => {
    expect(at('/modes').meta.value).toBe(CHOOSER)
  })
})

describe('next', () => {
  it('advances one step through the registry', () => {
    expect(at('/').next.value.key).toBe(MODE_LIST[1].key)
  })

  it('wraps from the last interface back to the first', () => {
    expect(at(MODE_LIST[MODE_LIST.length - 1].path).next.value.key).toBe(MODE_LIST[0].key)
  })

  it('treats the chooser as before the first interface', () => {
    // findIndex returns -1 for the chooser, so (-1 + 1) lands on index 0.
    expect(at('/modes').next.value.key).toBe(MODE_LIST[0].key)
  })
})

describe('hasChosen / markChosen', () => {
  it('reports false before a choice is recorded', () => {
    expect(at('/').hasChosen()).toBe(false)
  })

  it('reports true once a choice is recorded', () => {
    const mode = at('/')
    mode.markChosen()
    expect(localStorage.getItem('mc:mode-chosen')).toBe('1')
    expect(mode.hasChosen()).toBe(true)
  })

  it('assumes a choice was made when storage is unreadable, so the gate stays shut', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    expect(at('/').hasChosen()).toBe(true)
    spy.mockRestore()
  })

  it('swallows a write failure rather than breaking the click', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    expect(() => at('/').markChosen()).not.toThrow()
    spy.mockRestore()
  })
})

describe('lastVisited', () => {
  it('records the interface as it is entered', () => {
    at('/terminal')
    expect(localStorage.getItem('mc:mode')).toBe('terminal')
  })

  it('reads the recorded interface back', () => {
    at('/console')
    expect(at('/console').lastVisited()).toBe('console')
  })

  it('never records the chooser, which is a waypoint rather than a destination', () => {
    at('/cloud')
    at('/modes')
    expect(localStorage.getItem('mc:mode')).toBe('cloud')
  })

  it('returns null when nothing has been recorded', () => {
    expect(at('/modes').lastVisited()).toBeNull()
  })

  it('returns null when storage is unreadable', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    expect(at('/modes').lastVisited()).toBeNull()
    spy.mockRestore()
  })
})
