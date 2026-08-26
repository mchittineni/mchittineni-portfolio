import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import revealPlugin from '~/plugins/reveal.client'

type Hook = () => unknown | Promise<unknown>

/** Stands in for the Nuxt app, capturing hooks so they can be fired by name. */
function fakeNuxtApp() {
  const hooks = new Map<string, Hook[]>()
  return {
    hook(name: string, fn: Hook) {
      hooks.set(name, [...(hooks.get(name) ?? []), fn])
    },
    async fire(name: string) {
      for (const fn of hooks.get(name) ?? []) await fn()
    },
    names: () => [...hooks.keys()],
  }
}

const run = (app = fakeNuxtApp()) => {
  ;(revealPlugin as unknown as (nuxtApp: unknown) => void)(app)
  return app
}

const seed = (count: number) => {
  document.body.innerHTML = Array.from(
    { length: count },
    (_, i) => `<div data-reveal id="r${i}"></div>`
  ).join('')
}

const revealed = () => document.querySelectorAll('[data-reveal].reveal-in').length

const OriginalIO = window.IntersectionObserver
const OriginalMO = window.MutationObserver

let observed: Element[] = []
let unobserved: Element[] = []
let ioCallback: IntersectionObserverCallback | undefined

class StubIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    ioCallback = callback
  }
  observe(el: Element) {
    observed.push(el)
  }
  unobserve(el: Element) {
    unobserved.push(el)
  }
  disconnect() {}
}

beforeEach(() => {
  document.documentElement.className = ''
  document.body.innerHTML = ''
  observed = []
  unobserved = []
  ioCallback = undefined
  vi.stubGlobal('IntersectionObserver', StubIntersectionObserver)
  window.IntersectionObserver = StubIntersectionObserver as unknown as typeof IntersectionObserver
  // happy-dom reports a zero-height viewport, so nothing is "already on screen"
  // unless a test says otherwise.
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
  vi.stubGlobal(
    'requestAnimationFrame',
    (cb: FrameRequestCallback) => setTimeout(() => cb(0), 0) as unknown as number
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  window.IntersectionObserver = OriginalIO
  window.MutationObserver = OriginalMO
  vi.restoreAllMocks()
})

describe('reveal plugin', () => {
  it('marks the document as JavaScript-capable', () => {
    run()
    expect(document.documentElement.classList.contains('js')).toBe(true)
  })

  it('registers the mount, route and hydration hooks', () => {
    const app = run()
    expect(app.names()).toEqual(
      expect.arrayContaining(['app:mounted', 'page:finish', 'app:suspense:resolve'])
    )
  })

  it('reveals above-the-fold elements synchronously, with no flash', () => {
    seed(2)
    document.querySelectorAll('[data-reveal]').forEach(el => {
      ;(el as HTMLElement).getBoundingClientRect = () => ({ top: 10, bottom: 200 }) as DOMRect
    })
    run()
    expect(revealed()).toBe(2)
    expect(observed).toHaveLength(0)
  })

  it('observes below-the-fold elements instead of revealing them', () => {
    seed(2)
    document.querySelectorAll('[data-reveal]').forEach(el => {
      ;(el as HTMLElement).getBoundingClientRect = () => ({ top: 2000, bottom: 2400 }) as DOMRect
    })
    run()
    expect(revealed()).toBe(0)
    expect(observed).toHaveLength(2)
  })

  it('reveals an observed element once it intersects, then stops observing it', () => {
    seed(1)
    const el = document.querySelector('[data-reveal]') as HTMLElement
    el.getBoundingClientRect = () => ({ top: 2000, bottom: 2400 }) as DOMRect
    run()

    const obs = { unobserve: (target: Element) => unobserved.push(target) }
    ioCallback!(
      [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
      obs as unknown as IntersectionObserver
    )
    expect(el.classList.contains('reveal-in')).toBe(true)
    expect(unobserved).toContain(el)
  })

  it('leaves a non-intersecting element hidden and observed', () => {
    seed(1)
    const el = document.querySelector('[data-reveal]') as HTMLElement
    el.getBoundingClientRect = () => ({ top: 2000, bottom: 2400 }) as DOMRect
    run()

    ioCallback!([{ isIntersecting: false, target: el } as unknown as IntersectionObserverEntry], {
      unobserve: () => {},
    } as unknown as IntersectionObserver)
    expect(el.classList.contains('reveal-in')).toBe(false)
    expect(unobserved).toHaveLength(0)
  })

  it('reveals everything when IntersectionObserver is unavailable', () => {
    seed(3)
    // @ts-expect-error — simulating an old browser.
    delete window.IntersectionObserver
    run()
    expect(revealed()).toBe(3)
  })

  it('reveals everything if the scan itself throws', () => {
    seed(2)
    const el = document.querySelector('[data-reveal]') as HTMLElement
    el.getBoundingClientRect = () => {
      throw new Error('layout unavailable')
    }
    run()
    expect(revealed()).toBe(2)
  })

  it('does nothing when there is nothing to reveal', () => {
    run()
    expect(revealed()).toBe(0)
    expect(observed).toHaveLength(0)
  })

  it('re-scans on mount, after a route change and after hydration', async () => {
    const app = run()
    seed(1)
    const el = document.querySelector('[data-reveal]') as HTMLElement
    el.getBoundingClientRect = () => ({ top: 10, bottom: 200 }) as DOMRect

    await app.fire('app:mounted')
    expect(revealed()).toBe(1)

    seed(1)
    ;(document.querySelector('[data-reveal]') as HTMLElement).getBoundingClientRect = () =>
      ({ top: 10, bottom: 200 }) as DOMRect
    await app.fire('page:finish')
    expect(revealed()).toBe(1)

    seed(1)
    ;(document.querySelector('[data-reveal]') as HTMLElement).getBoundingClientRect = () =>
      ({ top: 10, bottom: 200 }) as DOMRect
    await app.fire('app:suspense:resolve')
    expect(revealed()).toBe(1)
  })

  it('watches the tree so content that appears without a navigation still reveals', async () => {
    const app = run()
    await app.fire('app:mounted')

    seed(1)
    const el = document.querySelector('[data-reveal]') as HTMLElement
    el.getBoundingClientRect = () => ({ top: 10, bottom: 200 }) as DOMRect

    await vi.waitFor(() => expect(el.classList.contains('reveal-in')).toBe(true))
  })

  it('skips the tree watcher when MutationObserver is unavailable', async () => {
    // @ts-expect-error — simulating an old browser.
    delete window.MutationObserver
    const app = run()
    await expect(app.fire('app:mounted')).resolves.toBeUndefined()
  })
})
