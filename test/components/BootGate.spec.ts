import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BootGate from '~/components/BootGate.vue'
import { MODE_LIST } from '~/composables/useMode'

beforeEach(async () => {
  window.localStorage.clear()
  vi.restoreAllMocks()
  await useRouter().push('/')
})

describe('BootGate', () => {
  it('opens on a first visit to the portfolio', async () => {
    const wrapper = await mountSuspended(BootGate)
    const gate = wrapper.find('.gate')
    expect(gate.exists()).toBe(true)
    expect(gate.attributes('role')).toBe('dialog')
    expect(gate.attributes('aria-modal')).toBe('true')
    expect(gate.attributes('aria-labelledby')).toBe('gate-title')
  })

  it('stays shut on a return visit', async () => {
    window.localStorage.setItem('mc:mode-chosen', '1')
    const wrapper = await mountSuspended(BootGate)
    expect(wrapper.find('.gate').exists()).toBe(false)
  })

  it('stays shut when the visitor asked for a specific interface, and records that as the choice', async () => {
    const wrapper = await mountSuspended(BootGate, { route: '/terminal' })
    expect(wrapper.find('.gate').exists()).toBe(false)
    expect(window.localStorage.getItem('mc:mode-chosen')).toBe('1')
  })

  it('offers one button per interface', async () => {
    const wrapper = await mountSuspended(BootGate)
    const choices = wrapper.findAll('.choice')
    expect(choices).toHaveLength(MODE_LIST.length)
    MODE_LIST.forEach((m, i) => {
      expect(choices[i].text()).toContain(m.label)
      expect(choices[i].text()).toContain(m.blurb)
    })
  })

  it('navigates to the chosen interface and records the choice', async () => {
    const wrapper = await mountSuspended(BootGate)
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    const consoleIndex = MODE_LIST.findIndex(m => m.key === 'console')
    await wrapper.findAll('.choice')[consoleIndex].trigger('click')
    expect(push).toHaveBeenCalledWith('/console')
    expect(window.localStorage.getItem('mc:mode-chosen')).toBe('1')
    expect(wrapper.find('.gate').exists()).toBe(false)
  })

  it('closes without navigating when the portfolio itself is chosen', async () => {
    const wrapper = await mountSuspended(BootGate)
    const push = vi.spyOn(useRouter(), 'push').mockResolvedValue(undefined)
    const portfolioIndex = MODE_LIST.findIndex(m => m.key === 'portfolio')
    await wrapper.findAll('.choice')[portfolioIndex].trigger('click')
    expect(push).not.toHaveBeenCalled()
    expect(wrapper.find('.gate').exists()).toBe(false)
  })

  it('dismisses via the skip button', async () => {
    const wrapper = await mountSuspended(BootGate)
    await wrapper.find('.skip').trigger('click')
    expect(wrapper.find('.gate').exists()).toBe(false)
    expect(window.localStorage.getItem('mc:mode-chosen')).toBe('1')
  })

  it('dismisses on Escape', async () => {
    const wrapper = await mountSuspended(BootGate)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.gate').exists()).toBe(false)
    expect(window.localStorage.getItem('mc:mode-chosen')).toBe('1')
  })

  it('ignores other keys while open', async () => {
    const wrapper = await mountSuspended(BootGate)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.gate').exists()).toBe(true)
  })

  it('ignores Escape once already closed', async () => {
    window.localStorage.setItem('mc:mode-chosen', '1')
    const wrapper = await mountSuspended(BootGate)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.gate').exists()).toBe(false)
  })

  it('stops listening once unmounted', async () => {
    const wrapper = await mountSuspended(BootGate)
    wrapper.unmount()
    expect(() =>
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    ).not.toThrow()
  })
})
