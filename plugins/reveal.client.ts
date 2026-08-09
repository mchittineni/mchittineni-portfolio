// Lightweight scroll-reveal via IntersectionObserver.
//
// Adds `js` to <html> (so CSS only hides elements when JS is present), then:
//  - reveals any element already in the viewport SYNCHRONOUSLY so above-the-fold
//    content never flashes/blinks on load, and
//  - observes the rest, revealing them as they scroll into view.
//
// The scan re-runs after mount and after every route change. A single scan at
// plugin time is not enough once the app has routed pages: the page subtree
// renders after plugins run, and any class added beforehand is discarded with
// the nodes it was on — leaving `js` set, every [data-reveal] at opacity 0, and
// the page blank. Anything that goes wrong here reveals everything instead.
export default defineNuxtPlugin(nuxtApp => {
  const root = document.documentElement
  const REVEALED = 'reveal-in'

  const vh = () => window.innerHeight || root.clientHeight
  const inViewport = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    return r.top < vh() && r.bottom > 0
  }

  const pending = () =>
    Array.from(document.querySelectorAll<HTMLElement>(`[data-reveal]:not(.${REVEALED})`))

  /** Last resort: never leave content hidden behind a broken reveal. */
  const revealAll = () => pending().forEach(el => el.classList.add(REVEALED))

  const supported = 'IntersectionObserver' in window
  const observer = supported
    ? new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(REVEALED)
              obs.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
      )
    : null

  function scan() {
    try {
      const els = pending()
      if (!els.length) return
      if (!observer) {
        revealAll()
        return
      }
      for (const el of els) {
        // Reveal what is already on screen before the next paint -> no FOUC.
        if (inViewport(el)) el.classList.add(REVEALED)
        else observer.observe(el)
      }
    } catch {
      revealAll()
    }
  }

  root.classList.add('js')

  scan()
  nuxtApp.hook('app:mounted', scan)
  nuxtApp.hook('page:finish', () => nextTick(scan))
  // Guards against a hydration path that outruns both hooks.
  nuxtApp.hook('app:suspense:resolve', () => nextTick(scan))

  // Content that appears without a navigation — filtering the project grid,
  // for instance — mounts hidden and would otherwise never be scanned. Watch
  // the tree and re-scan on the next frame so those elements reveal too.
  if ('MutationObserver' in window) {
    let queued = false
    const mutations = new MutationObserver(() => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        scan()
      })
    })
    nuxtApp.hook('app:mounted', () => {
      mutations.observe(document.body, { childList: true, subtree: true })
    })
  }
})
