import { afterEach } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

// Mounted components keep their window listeners alive, so one spec's page
// would still be handling keydowns during the next. Tear every mount down.
enableAutoUnmount(afterEach)

// The Nuxt/happy-dom test window ships a `Storage` class but never wires up
// `window.localStorage`, and Node's own experimental localStorage is disabled
// without --localstorage-file. Both composables persist a preference there, so
// back the class with an in-memory map and expose a real instance. Patching the
// prototype (rather than assigning a plain object) keeps
// `vi.spyOn(Storage.prototype, ...)` able to simulate a private-browsing throw.
const backing = new Map<string, string>()

Object.assign(Storage.prototype, {
  getItem(key: string) {
    const value = backing.get(String(key))
    return value === undefined ? null : value
  },
  setItem(key: string, value: string) {
    backing.set(String(key), String(value))
  },
  removeItem(key: string) {
    backing.delete(String(key))
  },
  clear() {
    backing.clear()
  },
  key(index: number) {
    return [...backing.keys()][index] ?? null
  },
})

Object.defineProperty(Storage.prototype, 'length', {
  configurable: true,
  get: () => backing.size,
})

const storage = Object.create(Storage.prototype) as Storage

for (const target of [window, globalThis] as unknown as Record<string, unknown>[]) {
  Object.defineProperty(target, 'localStorage', {
    configurable: true,
    writable: true,
    value: storage,
  })
}

// matchMedia backs the "system" theme. happy-dom's implementation is enough
// where present; where it is not, a permanently-dark stub keeps the default.
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }),
  })
}
