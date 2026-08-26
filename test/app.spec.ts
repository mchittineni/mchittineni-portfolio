import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('app shell', () => {
  it('renders the routed page inside its layout, with the boot gate alongside', async () => {
    window.localStorage.clear()
    const wrapper = await mountSuspended(App, { route: '/' })
    expect(wrapper.find('.app-root').exists()).toBe(true)
    expect(wrapper.find('main #about').exists()).toBe(true)
    expect(wrapper.find('.gate').exists()).toBe(true)
  })

  it('uses the bare layout for the interface pages', async () => {
    const wrapper = await mountSuspended(App, { route: '/terminal' })
    expect(wrapper.find('.bare-root').exists()).toBe(true)
    expect(wrapper.find('.nav').exists()).toBe(false)
  })
})
