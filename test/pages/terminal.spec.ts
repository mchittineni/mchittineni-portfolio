import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TerminalPage from '~/pages/terminal.vue'
import { deployments } from '~/content'

const mountTerminal = (route = '/terminal') => mountSuspended(TerminalPage, { route })

describe('terminal page', () => {
  it('greets with the shell banner', async () => {
    const wrapper = await mountTerminal()
    const buffer = wrapper.find('.buffer').text()
    expect(buffer).toContain('portfolio control plane')
    expect(buffer).toContain('mc help')
  })

  it('labels the input for assistive technology', async () => {
    const wrapper = await mountTerminal()
    expect(wrapper.find('.input-field input').attributes('aria-label')).toBe('Terminal input')
  })

  it('runs a submitted command and clears the input', async () => {
    const wrapper = await mountTerminal()
    const input = wrapper.find('.input-field input')
    await input.setValue('mc get deploy')
    await wrapper.find('.inputline').trigger('submit')

    expect(wrapper.find('.buffer').text()).toContain(deployments[0].name)
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('marks pre-formatted rows so their columns stay aligned', async () => {
    const wrapper = await mountTerminal()
    await wrapper.find('.input-field input').setValue('mc get deploy')
    await wrapper.find('.inputline').trigger('submit')
    expect(wrapper.findAll('.line--pre').length).toBe(deployments.length)
  })

  it('shows the inline suggestion as the untyped remainder only', async () => {
    const wrapper = await mountTerminal()
    await wrapper.find('.input-field input').setValue('mc who')
    expect(wrapper.find('.ghost-typed').text()).toBe('mc who')
    expect(wrapper.find('.ghost').text()).toBe('mc whoami')
  })

  it('accepts the suggestion with the right arrow from the end of the line', async () => {
    const wrapper = await mountTerminal()
    const input = wrapper.find('.input-field input')
    await input.setValue('mc who')
    const el = input.element as HTMLInputElement
    el.selectionStart = el.value.length
    await input.trigger('keydown.right')
    expect((input.element as HTMLInputElement).value).toBe('mc whoami')
  })

  it('leaves the suggestion alone when the caret is mid-line', async () => {
    const wrapper = await mountTerminal()
    const input = wrapper.find('.input-field input')
    await input.setValue('mc who')
    const el = input.element as HTMLInputElement
    el.selectionStart = 2
    await input.trigger('keydown.right')
    expect((input.element as HTMLInputElement).value).toBe('mc who')
  })

  it('does nothing on the right arrow when there is no suggestion', async () => {
    const wrapper = await mountTerminal()
    const input = wrapper.find('.input-field input')
    await input.setValue('zzz')
    const el = input.element as HTMLInputElement
    el.selectionStart = el.value.length
    await input.trigger('keydown.right')
    expect((input.element as HTMLInputElement).value).toBe('zzz')
  })

  it('tab-completes', async () => {
    const wrapper = await mountTerminal()
    const input = wrapper.find('.input-field input')
    await input.setValue('mc whoa')
    await input.trigger('keydown.tab')
    expect((input.element as HTMLInputElement).value).toBe('mc whoami ')
  })

  it('walks history with the arrow keys', async () => {
    const wrapper = await mountTerminal()
    const input = wrapper.find('.input-field input')
    await input.setValue('mc top')
    await wrapper.find('.inputline').trigger('submit')

    await input.trigger('keydown.up')
    expect((input.element as HTMLInputElement).value).toBe('mc top')
    await input.trigger('keydown.down')
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('replays a command from the query string so any view is linkable', async () => {
    const wrapper = await mountTerminal('/terminal?c=get+deploy')
    const buffer = wrapper.find('.buffer').text()
    expect(buffer).toContain('mc get deploy')
    expect(buffer).toContain(deployments[0].name)
  })

  it('ignores a blank replay parameter', async () => {
    const wrapper = await mountTerminal('/terminal?c=%20%20')
    expect(wrapper.findAll('.line.prompt')).toHaveLength(0)
  })

  it('ignores a repeated replay parameter, which arrives as an array', async () => {
    const wrapper = await mountTerminal('/terminal?c=top&c=help')
    expect(wrapper.findAll('.line.prompt')).toHaveLength(0)
  })

  it('offers a no-JavaScript fallback pointing at the other interfaces', async () => {
    const wrapper = await mountTerminal()
    expect(wrapper.find('noscript').html()).toContain('portfolio')
  })
})
