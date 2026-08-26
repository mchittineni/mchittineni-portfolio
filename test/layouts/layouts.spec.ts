import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BareLayout from '~/layouts/bare.vue'
import DefaultLayout from '~/layouts/default.vue'
import { socials } from '~/content'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('bare layout', () => {
  it('renders its page slot and the interface switcher, and nothing else', async () => {
    const wrapper = await mountSuspended(BareLayout, {
      slots: { default: '<p class="page">console</p>' },
    })
    expect(wrapper.find('.bare-root').exists()).toBe(true)
    expect(wrapper.find('p.page').text()).toBe('console')
    expect(wrapper.find('.switcher').exists()).toBe(true)
    expect(wrapper.find('.nav').exists()).toBe(false)
    expect(wrapper.find('.footer').exists()).toBe(false)
  })
})

describe('default layout', () => {
  it('renders the page slot inside a main landmark', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: '<p class="page">portfolio</p>' },
    })
    expect(wrapper.find('main p.page').text()).toBe('portfolio')
  })

  it('offers a skip link as the first focusable element', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const skip = wrapper.find('.skip-link')
    expect(skip.text()).toBe('Skip to content')
    expect(skip.attributes('href')).toBe('#about')
  })

  it('renders every primary nav item', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const labels = wrapper.findAll('.nav__link').map(a => a.text())
    expect(labels).toEqual(['About', 'Skills', 'Experience', 'Projects', 'Contact'])
  })

  it('prefixes the resume download with the runtime base URL', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const base = useRuntimeConfig().app.baseURL
    wrapper.findAll('a[download]').forEach(a => {
      expect(a.attributes('href')).toBe(`${base}Manideep_Chittineni_Resume.pdf`)
    })
  })

  it('starts with the mobile menu closed', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    expect(wrapper.find('.nav__toggle').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('#mobile-menu').attributes('style')).toContain('display: none')
  })

  it('toggles the mobile menu open and shut', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const toggle = wrapper.find('.nav__toggle')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#mobile-menu').attributes('style') ?? '').not.toContain('display: none')
    expect(wrapper.findAll('.nav__toggle-bar.open')).toHaveLength(3)
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
  })

  it('closes the mobile menu when a link inside it is followed', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    await wrapper.find('.nav__toggle').trigger('click')
    await wrapper.find('.nav__mobile-link').trigger('click')
    expect(wrapper.find('.nav__toggle').attributes('aria-expanded')).toBe('false')
  })

  it('closes the mobile menu when the brand is clicked', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    await wrapper.find('.nav__toggle').trigger('click')
    await wrapper.find('.nav__brand').trigger('click')
    expect(wrapper.find('.nav__toggle').attributes('aria-expanded')).toBe('false')
  })

  it('closes the mobile menu when the download CTA inside it is clicked', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    await wrapper.find('.nav__toggle').trigger('click')
    await wrapper.find('.nav__mobile-cta').trigger('click')
    expect(wrapper.find('.nav__toggle').attributes('aria-expanded')).toBe('false')
  })

  it('condenses the header once the page is scrolled past the threshold', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    expect(wrapper.find('header').classes()).not.toContain('nav--scrolled')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 40 })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('header').classes()).toContain('nav--scrolled')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('header').classes()).not.toContain('nav--scrolled')
  })

  it('reads the scroll position once on mount so a deep link starts condensed', async () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 400 })
    const wrapper = await mountSuspended(DefaultLayout)
    expect(wrapper.find('header').classes()).toContain('nav--scrolled')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
  })

  it('stops listening for scroll once unmounted', async () => {
    const remove = vi.spyOn(window, 'removeEventListener')
    const wrapper = await mountSuspended(DefaultLayout)
    wrapper.unmount()
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('footers the current year and every social link', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    const footer = wrapper.find('.footer')
    expect(footer.text()).toContain(String(new Date().getFullYear()))
    socials.forEach(s => expect(footer.find(`a[href="${s.href}"]`).exists()).toBe(true))
  })
})
