import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { THEME_OPTIONS, useTheme, type ThemeChoice } from '~/composables/useTheme'

type Listener = (event: { matches: boolean }) => void

let systemPrefersDark = true
let listeners: Listener[] = []
const addEventListener = vi.fn((_: string, fn: Listener) => listeners.push(fn))
const removeEventListener = vi.fn()

/** Mounts a host component so `onMounted`/`onUnmounted` actually fire. */
function mountTheme() {
  let api!: ReturnType<typeof useTheme>
  const wrapper = mount(
    defineComponent({
      setup() {
        api = useTheme()
        return () => h('div')
      },
    })
  )
  return { wrapper, api }
}

beforeEach(() => {
  listeners = []
  systemPrefersDark = true
  addEventListener.mockClear()
  removeEventListener.mockClear()
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  // useState is app-scoped and outlives a single mount, so reset it explicitly.
  useState<ThemeChoice>('theme-choice').value = 'system'
  useState<boolean>('theme-system-dark').value = true

  vi.stubGlobal('matchMedia', (query: string) => ({
    media: query,
    get matches() {
      return systemPrefersDark
    },
    addEventListener,
    removeEventListener,
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('THEME_OPTIONS', () => {
  it('offers light, system and dark, each with a label and icon', () => {
    expect(THEME_OPTIONS.map(o => o.value)).toEqual(['light', 'system', 'dark'])
    THEME_OPTIONS.forEach(o => {
      expect(o.label.length).toBeGreaterThan(0)
      expect(o.icon.length).toBeGreaterThan(0)
    })
  })

  it('is what the composable hands back as its option list', () => {
    const { api } = mountTheme()
    expect(api.options).toBe(THEME_OPTIONS)
  })
})

describe('resolved', () => {
  it('resolves "system" against a dark system preference', () => {
    const { api } = mountTheme()
    api.set('system')
    expect(api.choice.value).toBe('system')
    expect(api.resolved.value).toBe('dark')
  })

  it('resolves "system" against a light system preference', () => {
    systemPrefersDark = false
    const { api } = mountTheme()
    api.set('system')
    expect(api.resolved.value).toBe('light')
  })

  it('lets an explicit choice win over the system preference', () => {
    systemPrefersDark = true
    const { api } = mountTheme()
    api.set('light')
    expect(api.resolved.value).toBe('light')
    api.set('dark')
    expect(api.resolved.value).toBe('dark')
  })
})

describe('paint', () => {
  it('stamps data-theme for an explicit choice', () => {
    const { api } = mountTheme()
    api.set('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    api.set('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('stamps nothing for "system", leaving prefers-color-scheme in charge', () => {
    const { api } = mountTheme()
    api.set('dark')
    api.set('system')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })
})

describe('persistence', () => {
  it('stores an explicit choice', () => {
    const { api } = mountTheme()
    api.set('dark')
    expect(window.localStorage.getItem('mc:theme')).toBe('dark')
  })

  it('removes the key when returning to "system" rather than storing it', () => {
    const { api } = mountTheme()
    api.set('light')
    api.set('system')
    expect(window.localStorage.getItem('mc:theme')).toBeNull()
  })

  it('swallows a storage failure rather than breaking the toggle', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    const { api } = mountTheme()
    expect(() => api.set('dark')).not.toThrow()
    expect(api.choice.value).toBe('dark')
    spy.mockRestore()
  })

  it.each(['light', 'dark'] as ThemeChoice[])('rehydrates a stored %s choice', stored => {
    window.localStorage.setItem('mc:theme', stored)
    const { api } = mountTheme()
    expect(api.choice.value).toBe(stored)
    expect(document.documentElement.getAttribute('data-theme')).toBe(stored)
  })

  it('ignores a junk stored value and stays on system', () => {
    window.localStorage.setItem('mc:theme', 'chartreuse')
    const { api } = mountTheme()
    expect(api.choice.value).toBe('system')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })

  it('falls back to system when storage cannot be read', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    const { api } = mountTheme()
    expect(api.choice.value).toBe('system')
    spy.mockRestore()
  })
})

describe('system preference subscription', () => {
  it('seeds the system flag from matchMedia on mount', () => {
    systemPrefersDark = false
    const { api } = mountTheme()
    api.set('system')
    expect(api.resolved.value).toBe('light')
  })

  it('follows a live change of the OS preference', async () => {
    const { api } = mountTheme()
    api.set('system')
    expect(api.resolved.value).toBe('dark')
    listeners.forEach(fn => fn({ matches: false }))
    expect(api.resolved.value).toBe('light')
  })

  it('unsubscribes on unmount', () => {
    const { wrapper } = mountTheme()
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    wrapper.unmount()
    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
