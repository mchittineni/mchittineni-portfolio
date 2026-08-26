import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IdePage from '~/pages/ide.vue'
import { certificates, nodePools, profile, repositories } from '~/content'

const FILE_NAMES = [
  'about.md',
  'experience.yaml',
  'skills.tf',
  'projects.json',
  'certifications.md',
]

const mountIde = () => mountSuspended(IdePage, { route: '/ide' })

describe('editor page', () => {
  it('lists the whole source tree in the explorer', async () => {
    const wrapper = await mountIde()
    expect(wrapper.findAll('.explorer .file').map(f => f.text())).toEqual(
      FILE_NAMES.map(n => expect.stringContaining(n))
    )
  })

  it('opens about.md with a single tab', async () => {
    const wrapper = await mountIde()
    expect(wrapper.findAll('.tab')).toHaveLength(1)
    expect(wrapper.find('.tab').text()).toContain('about.md')
    expect(wrapper.find('.explorer .file').classes()).toContain('on')
    expect(wrapper.find('.code').text()).toContain(profile.name)
  })

  it('numbers every rendered line', async () => {
    const wrapper = await mountIde()
    expect(wrapper.findAll('.ln').length).toBe(wrapper.findAll('.src').length)
  })

  it('renders experience.yaml as YAML derived from the roles', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    const code = wrapper.find('.code').text()
    expect(code).toContain('- role:')
    expect(code).toContain('workstreams:')
  })

  it('renders skills.tf as HCL derived from the node pools', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[2].trigger('click')
    const code = wrapper.find('.code').text()
    expect(code).toContain('resource "skill_pool"')
    expect(code).toContain(`node_count   = ${nodePools[0].nodes.length}`)
    expect(code).not.toContain('skill_pool" "'.concat('-'))
  })

  it('renders projects.json as valid JSON derived from the repositories', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[3].trigger('click')
    const source = wrapper
      .findAll('.src')
      .map(l => l.text())
      .join('\n')
    const parsed = JSON.parse(source)
    expect(parsed).toHaveLength(repositories.length)
    expect(parsed[0]).toMatchObject({
      name: repositories[0].slug,
      visibility: repositories[0].private ? 'private' : 'public',
    })
  })

  it('renders certifications.md as a linked list', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[4].trigger('click')
    expect(wrapper.find('.code').text()).toContain(certificates[0].name)
  })

  it('adds a tab per opened file and switches the active one', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    const tabs = wrapper.findAll('.tab')
    expect(tabs).toHaveLength(2)
    expect(tabs[1].classes()).toContain('on')
    expect(tabs[0].classes()).not.toContain('on')
  })

  it('reuses an existing tab rather than duplicating it', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    await wrapper.findAll('.explorer .file')[0].trigger('click')
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    expect(wrapper.findAll('.tab')).toHaveLength(2)
  })

  it('switches back via a tab click', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    await wrapper.findAll('.tab')[0].trigger('click')
    expect(wrapper.findAll('.tab')[0].classes()).toContain('on')
  })

  it('closes a background tab without changing the open file', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    await wrapper.findAll('.tab')[0].find('.close').trigger('click')
    const tabs = wrapper.findAll('.tab')
    expect(tabs).toHaveLength(1)
    expect(tabs[0].text()).toContain('experience.yaml')
  })

  it('falls back to the last remaining tab when the open one is closed', async () => {
    const wrapper = await mountIde()
    await wrapper.findAll('.explorer .file')[1].trigger('click')
    await wrapper.findAll('.tab')[1].find('.close').trigger('click')
    const tabs = wrapper.findAll('.tab')
    expect(tabs).toHaveLength(1)
    expect(tabs[0].text()).toContain('about.md')
    expect(wrapper.find('.code').text()).toContain(profile.name)
  })

  it('refuses to close the last tab, so the editor is never empty', async () => {
    const wrapper = await mountIde()
    await wrapper.find('.tab .close').trigger('click')
    expect(wrapper.findAll('.tab')).toHaveLength(1)
  })

  it('boots the integrated terminal with the shell banner', async () => {
    const wrapper = await mountIde()
    expect(wrapper.find('.buffer').text()).toContain('portfolio control plane')
  })

  it('runs a command in the integrated terminal and clears the input', async () => {
    const wrapper = await mountIde()
    const input = wrapper.find('.panel .entry input')
    await input.setValue('mc top')
    await wrapper.find('.panel .entry').trigger('submit')
    expect(wrapper.find('.buffer').text()).toContain('Years Experience')
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('tab-completes in the integrated terminal', async () => {
    const wrapper = await mountIde()
    const input = wrapper.find('.panel .entry input')
    await input.setValue('mc whoa')
    await input.trigger('keydown.tab')
    expect((input.element as HTMLInputElement).value).toBe('mc whoami ')
  })

  it('recalls history with the arrow keys in the integrated terminal', async () => {
    const wrapper = await mountIde()
    const input = wrapper.find('.panel .entry input')
    await input.setValue('mc top')
    await wrapper.find('.panel .entry').trigger('submit')

    await input.trigger('keydown.up')
    expect((input.element as HTMLInputElement).value).toBe('mc top')
    await input.trigger('keydown.down')
    expect((input.element as HTMLInputElement).value).toBe('')
  })
})
