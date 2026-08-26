import { beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ModeSwitcher from '~/components/ModeSwitcher.vue'
import { CHOOSER, MODE_LIST } from '~/composables/useMode'
import { THEME_OPTIONS, type ThemeChoice } from '~/composables/useTheme'

beforeEach(async () => {
  window.localStorage.clear()
  useState<ThemeChoice>('theme-choice').value = 'system'
  await useRouter().push('/')
})

describe('ModeSwitcher', () => {
  it('starts closed, showing only the trigger', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    expect(wrapper.find('.menu').exists()).toBe(false)
    expect(wrapper.find('.trigger').attributes('aria-expanded')).toBe('false')
  })

  it('labels the trigger with the current interface', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    expect(wrapper.find('.trigger').attributes('aria-label')).toBe(
      'Switch interface — currently Portfolio'
    )
    expect(wrapper.find('.trigger .current').text()).toBe('Portfolio')
  })

  it('opens the menu on click and flips the chevron', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    expect(wrapper.find('.chev').text()).toBe('▴')
    await wrapper.find('.trigger').trigger('click')
    expect(wrapper.find('.menu').exists()).toBe(true)
    expect(wrapper.find('.trigger').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('.chev').text()).toBe('▾')
  })

  it('closes again on a second click', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    await wrapper.find('.trigger').trigger('click')
    expect(wrapper.find('.menu').exists()).toBe(false)
  })

  it('lists every interface plus the chooser', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    const items = wrapper.findAll('.item')
    expect(items).toHaveLength(MODE_LIST.length + 1)
    MODE_LIST.forEach((m, i) => {
      expect(items[i].text()).toContain(m.label)
      expect(items[i].attributes('href')).toContain(m.path)
    })
    expect(items[items.length - 1].text()).toContain(CHOOSER.label)
  })

  it('marks the current interface as the current page', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    const active = wrapper.findAll('.item').filter(i => i.classes().includes('on'))
    expect(active).toHaveLength(1)
    expect(active[0].attributes('aria-current')).toBe('page')
  })

  it('closes the menu on Escape', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.menu').exists()).toBe(false)
  })

  it('ignores other keys', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.menu').exists()).toBe(true)
  })

  it('stops listening for Escape once unmounted', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    wrapper.unmount()
    expect(() =>
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    ).not.toThrow()
  })

  it('closes the menu when the route changes', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    expect(wrapper.find('.menu').exists()).toBe(true)
    await useRouter().push('/modes')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.menu').exists()).toBe(false)
  })

  it('offers every theme option and presses the active one', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    const segments = wrapper.findAll('.seg')
    expect(segments).toHaveLength(THEME_OPTIONS.length)
    const pressed = segments.filter(s => s.attributes('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(pressed[0].text()).toContain('System')
  })

  it('switches the theme from the menu', async () => {
    const wrapper = await mountSuspended(ModeSwitcher)
    await wrapper.find('.trigger').trigger('click')
    const dark = wrapper.findAll('.seg')[THEME_OPTIONS.findIndex(o => o.value === 'dark')]
    await dark.trigger('click')
    expect(dark.attributes('aria-pressed')).toBe('true')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
