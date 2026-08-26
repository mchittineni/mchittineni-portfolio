import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ModesPage from '~/pages/modes.vue'
import { MODE_LIST } from '~/composables/useMode'

beforeEach(() => {
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('interface chooser page', () => {
  it('renders a card per interface, numbered for the keyboard shortcut', async () => {
    const wrapper = await mountSuspended(ModesPage, { route: '/modes' })
    const cards = wrapper.findAll('.card')
    expect(cards).toHaveLength(MODE_LIST.length)
    MODE_LIST.forEach((m, i) => {
      expect(cards[i].text()).toContain(m.label)
      expect(cards[i].text()).toContain(m.blurb)
      expect(cards[i].find('.key').text()).toBe(String(i + 1))
    })
  })

  it('derives the fact list from the content layer rather than hard-coded copy', async () => {
    const wrapper = await mountSuspended(ModesPage, { route: '/modes' })
    const { deployments, repositories, nodePools, certificates } = await import('~/content')
    const skillCount = nodePools.reduce((n, p) => n + p.nodes.length, 0)
    const portfolioFacts = wrapper.findAll('.card')[0].find('.facts').text()
    expect(portfolioFacts).toContain(`${deployments.length} roles`)
    expect(portfolioFacts).toContain(`${repositories.length} projects`)
    expect(portfolioFacts).toContain(`${skillCount} skills`)
    expect(wrapper.text()).toContain(`${certificates.length} certificates`)
  })

  it('shows no "last visited" badge on a first visit', async () => {
    const wrapper = await mountSuspended(ModesPage, { route: '/modes' })
    expect(wrapper.find('.last').exists()).toBe(false)
  })

  it('badges the interface last visited', async () => {
    window.localStorage.setItem('mc:mode', 'terminal')
    const wrapper = await mountSuspended(ModesPage, { route: '/modes' })
    const badges = wrapper.findAll('.last')
    expect(badges).toHaveLength(1)
    const terminalIndex = MODE_LIST.findIndex(m => m.key === 'terminal')
    expect(wrapper.findAll('.card')[terminalIndex].find('.last').exists()).toBe(true)
  })

  it('jumps to an interface by its number key', async () => {
    await mountSuspended(ModesPage, { route: '/modes' })
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }))
    expect(push).toHaveBeenCalledWith(MODE_LIST[1].path)
  })

  it('ignores a number outside the range', async () => {
    await mountSuspended(ModesPage, { route: '/modes' })
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '9' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }))
    expect(push).not.toHaveBeenCalled()
  })

  it('ignores non-numeric keys', async () => {
    await mountSuspended(ModesPage, { route: '/modes' })
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }))
    expect(push).not.toHaveBeenCalled()
  })

  it('leaves browser and OS chords alone', async () => {
    await mountSuspended(ModesPage, { route: '/modes' })
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    ;[{ metaKey: true }, { ctrlKey: true }, { altKey: true }].forEach(modifier => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '1', ...modifier }))
    })
    expect(push).not.toHaveBeenCalled()
  })

  it('stops listening once unmounted', async () => {
    const wrapper = await mountSuspended(ModesPage, { route: '/modes' })
    wrapper.unmount()
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }))
    expect(push).not.toHaveBeenCalled()
  })
})
