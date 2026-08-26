import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AgentPage from '~/pages/agent.vue'

afterEach(() => {
  vi.useRealTimers()
})

/**
 * Mounting has to happen on real timers — Nuxt's own suspense resolution is
 * timer-backed — so the trace clock is only frozen once the page is up.
 */
async function mountAgent() {
  const wrapper = await mountSuspended(AgentPage, { route: '/agent' })
  vi.useFakeTimers()
  return wrapper
}

/** Steps past both tool waits and the answer wait of one run. */
async function settle(wrapper: { vm: { $nextTick: () => Promise<unknown> } }) {
  for (let i = 0; i < 4; i++) {
    await vi.advanceTimersByTimeAsync(300)
    await wrapper.vm.$nextTick()
  }
}

describe('agent page', () => {
  it('offers the worked questions and an empty transcript', async () => {
    const wrapper = await mountAgent()
    expect(wrapper.findAll('.prompt').length).toBe(6)
    expect(wrapper.findAll('.entry')).toHaveLength(0)
    expect(wrapper.find('.hint').exists()).toBe(true)
  })

  it('traces each read before answering', async () => {
    const wrapper = await mountAgent()
    await wrapper.findAll('.prompt')[0].trigger('click')
    await wrapper.vm.$nextTick()

    const entry = wrapper.find('.entry')
    expect(entry.exists()).toBe(true)
    expect(entry.find('.answer').exists()).toBe(false)
    expect(entry.findAll('.tools > *').length).toBeGreaterThan(0)
    expect(entry.findAll('.done')).toHaveLength(0)

    await settle(wrapper)
    expect(wrapper.find('.entry .answer').exists()).toBe(true)
    expect(wrapper.findAll('.entry .done').length).toBeGreaterThan(0)
  })

  it.each([0, 1, 2, 3, 4, 5])('derives run %i from the content layer', async index => {
    const wrapper = await mountAgent()
    await wrapper.findAll('.prompt')[index].trigger('click')
    await settle(wrapper)
    const answer = wrapper.find('.entry .answer')
    expect(answer.exists()).toBe(true)
    expect(answer.text().length).toBeGreaterThan(0)
  })

  it('puts the newest run at the top of the transcript', async () => {
    const wrapper = await mountAgent()
    await wrapper.findAll('.prompt')[0].trigger('click')
    await settle(wrapper)
    await wrapper.findAll('.prompt')[1].trigger('click')
    await settle(wrapper)

    const entries = wrapper.findAll('.entry')
    expect(entries).toHaveLength(2)
    expect(entries[0].find('.question').text()).toContain('Which clouds')
  })
})
