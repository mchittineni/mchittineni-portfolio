import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConsolePage from '~/pages/console.vue'
import { certificates, deployments, endpoints, events, nodePools, repositories } from '~/content'

const mountConsole = (route = '/console') => mountSuspended(ConsolePage, { route })

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

const linkFor = (wrapper: Awaited<ReturnType<typeof mountConsole>>, label: string) =>
  wrapper.findAll('.link').find(l => l.text().includes(label))!

describe('console page', () => {
  it('opens on the overview', async () => {
    const wrapper = await mountConsole()
    expect(linkFor(wrapper, 'Overview').classes()).toContain('on')
    expect(wrapper.findAll('.tile').length).toBeGreaterThan(0)
  })

  it('counts each resource kind in the sidebar', async () => {
    const wrapper = await mountConsole()
    expect(linkFor(wrapper, 'Deployments').text()).toContain(String(deployments.length))
    expect(linkFor(wrapper, 'Repositories').text()).toContain(String(repositories.length))
    expect(linkFor(wrapper, 'Node Pools').text()).toContain(String(nodePools.length))
    expect(linkFor(wrapper, 'Certificates').text()).toContain(String(certificates.length))
    expect(linkFor(wrapper, 'Endpoints').text()).toContain(String(endpoints.length))
  })

  it('streams career events on the overview', async () => {
    const wrapper = await mountConsole()
    expect(wrapper.findAll('tbody tr').length).toBe(events.length)
  })

  it('switches view on a sidebar click and records it in the hash', async () => {
    const wrapper = await mountConsole()
    const replace = vi.spyOn(useRouter(), 'replace').mockResolvedValue(undefined)
    await linkFor(wrapper, 'Deployments').trigger('click')

    expect(replace).toHaveBeenCalledWith({ hash: '#deployments' })
    expect(linkFor(wrapper, 'Deployments').classes()).toContain('on')
    expect(wrapper.findAll('tbody tr')).toHaveLength(deployments.length)
  })

  it.each([
    ['#deployments', () => deployments.length],
    ['#repositories', () => repositories.length],
    ['#nodepools', () => nodePools.length],
    ['#certificates', () => certificates.length],
    ['#endpoints', () => endpoints.length],
  ])('opens directly on %s from the URL hash', async (hash, count) => {
    const wrapper = await mountConsole(`/console${hash}`)
    expect(wrapper.findAll('tbody tr')).toHaveLength(count())
  })

  it('ignores an unknown hash and stays on the overview', async () => {
    const wrapper = await mountConsole('/console#nope')
    expect(linkFor(wrapper, 'Overview').classes()).toContain('on')
  })

  it('expands and collapses a deployment row', async () => {
    const wrapper = await mountConsole('/console#deployments')
    const row = wrapper.find('tbody tr')
    await row.trigger('click')
    expect(wrapper.find('.describe').exists()).toBe(true)
    expect(wrapper.find('.describe h3').text()).toBe(deployments[0].role)
    expect(wrapper.findAll('.grp-title').length).toBe(deployments[0].groups.length)

    await wrapper.find('tbody tr').trigger('click')
    expect(wrapper.find('.describe').exists()).toBe(false)
  })

  it('expands a repository row and links to its source', async () => {
    const wrapper = await mountConsole('/console#repositories')
    await wrapper.find('tbody tr').trigger('click')
    expect(wrapper.find('.repo-link').attributes('href')).toBe(repositories[0].url)
    expect(wrapper.find('.private-note').exists()).toBe(repositories[0].private)
  })

  it('expands a node pool row into its skill chips', async () => {
    const wrapper = await mountConsole('/console#nodepools')
    await wrapper.find('tbody tr').trigger('click')
    expect(wrapper.findAll('.chip')).toHaveLength(nodePools[0].nodes.length)
  })

  it('clears the expanded row when the view changes', async () => {
    const wrapper = await mountConsole('/console#deployments')
    vi.spyOn(useRouter(), 'replace').mockResolvedValue(undefined)
    await wrapper.find('tbody tr').trigger('click')
    expect(wrapper.find('.describe').exists()).toBe(true)
    await linkFor(wrapper, 'Certificates').trigger('click')
    expect(wrapper.find('.describe').exists()).toBe(false)
  })

  it('opens the palette from the keyboard hint', async () => {
    const wrapper = await mountConsole()
    await wrapper.find('.kbd').trigger('click')
    expect(wrapper.find('.palette').exists()).toBe(true)
    expect(wrapper.find('.palette').attributes('aria-modal')).toBe('true')
  })

  it.each([{ metaKey: true }, { ctrlKey: true }])(
    'toggles the palette on ⌘K / Ctrl-K',
    async modifier => {
      const wrapper = await mountConsole()
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ...modifier }))
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.palette').exists()).toBe(true)

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'K', ...modifier }))
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.palette').exists()).toBe(false)
    }
  )

  it('closes the palette on Escape', async () => {
    const wrapper = await mountConsole()
    await wrapper.find('.kbd').trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.palette').exists()).toBe(false)
  })

  it('ignores an unmodified k', async () => {
    const wrapper = await mountConsole()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.palette').exists()).toBe(false)
  })

  it('lists every resource in the palette and filters as you type', async () => {
    const wrapper = await mountConsole()
    await wrapper.find('.kbd').trigger('click')
    expect(wrapper.findAll('.palette-list button')).toHaveLength(6)

    await wrapper.find('.palette-input').setValue('  REPO  ')
    const filtered = wrapper.findAll('.palette-list button')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].text()).toContain('Repositories')
  })

  it('reports when nothing matches', async () => {
    const wrapper = await mountConsole()
    await wrapper.find('.kbd').trigger('click')
    await wrapper.find('.palette-input').setValue('zzz')
    expect(wrapper.find('.palette-empty').text()).toBe('No matching resource')
    expect(wrapper.findAll('.palette-list button')).toHaveLength(0)
  })

  it('jumps to a resource from the palette and resets the query', async () => {
    const wrapper = await mountConsole()
    vi.spyOn(useRouter(), 'replace').mockResolvedValue(undefined)
    await wrapper.find('.kbd').trigger('click')
    await wrapper.find('.palette-input').setValue('endpoints')
    await wrapper.find('.palette-list button').trigger('click')

    expect(wrapper.find('.palette').exists()).toBe(false)
    expect(wrapper.findAll('tbody tr')).toHaveLength(endpoints.length)

    await wrapper.find('.kbd').trigger('click')
    expect((wrapper.find('.palette-input').element as HTMLInputElement).value).toBe('')
  })

  it('jumps to the first match on Enter', async () => {
    const wrapper = await mountConsole()
    vi.spyOn(useRouter(), 'replace').mockResolvedValue(undefined)
    await wrapper.find('.kbd').trigger('click')
    await wrapper.find('.palette-input').setValue('certificates')
    await wrapper.find('.palette-input').trigger('keydown.esc')
    await wrapper.find('.kbd').trigger('click')
    await wrapper.find('.palette-input').setValue('certificates')
    await wrapper.find('.palette-input').trigger('keydown.enter')
    expect(wrapper.findAll('tbody tr')).toHaveLength(certificates.length)
  })

  it('does nothing on Enter when nothing matches', async () => {
    const wrapper = await mountConsole()
    await wrapper.find('.kbd').trigger('click')
    await wrapper.find('.palette-input').setValue('zzz')
    await wrapper.find('.palette-input').trigger('keydown.enter')
    expect(wrapper.find('.palette').exists()).toBe(true)
  })

  it('closes the palette when the backdrop is clicked', async () => {
    const wrapper = await mountConsole()
    await wrapper.find('.kbd').trigger('click')
    await wrapper.find('.palette').trigger('click')
    expect(wrapper.find('.palette').exists()).toBe(false)
  })

  it('runs a clock in the topbar', async () => {
    const wrapper = await mountConsole()
    expect(wrapper.find('.clock').text()).toMatch(/\d{2}:\d{2}:\d{2}/)
  })

  it('stops listening once unmounted', async () => {
    const wrapper = await mountConsole()
    wrapper.unmount()
    expect(() =>
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    ).not.toThrow()
  })
})
