import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DescribePane from '~/components/console/DescribePane.vue'
import LangBar from '~/components/console/LangBar.vue'
import ResourceTable from '~/components/console/ResourceTable.vue'
import StatusPill from '~/components/console/StatusPill.vue'
import { langColors } from '~/content'

describe('StatusPill', () => {
  it('renders the label', () => {
    expect(mount(StatusPill, { props: { label: 'Running' } }).text()).toBe('Running')
  })

  it('defaults to the ok tone', () => {
    const wrapper = mount(StatusPill, { props: { label: 'Running' } })
    expect(wrapper.classes()).toContain('pill')
    expect(wrapper.classes()).toContain('ok')
  })

  it.each(['muted', 'warn', 'err'])('applies the %s tone', tone => {
    expect(mount(StatusPill, { props: { label: 'x', tone } }).classes()).toContain(tone)
  })
})

describe('DescribePane', () => {
  it('renders the title as a heading', () => {
    const wrapper = mount(DescribePane, { props: { title: 'Platform Engineer' } })
    expect(wrapper.find('h3').text()).toBe('Platform Engineer')
  })

  it('omits the meta line when there is no meta', () => {
    const wrapper = mount(DescribePane, { props: { title: 'x' } })
    expect(wrapper.find('.meta').exists()).toBe(false)
  })

  it('renders the meta line when supplied', () => {
    const wrapper = mount(DescribePane, { props: { title: 'x', meta: 'Acme · 2y · AWS' } })
    expect(wrapper.find('.meta').text()).toBe('Acme · 2y · AWS')
  })

  it('renders slotted body content', () => {
    const wrapper = mount(DescribePane, {
      props: { title: 'x' },
      slots: { default: '<p class="body">detail</p>' },
    })
    expect(wrapper.find('p.body').text()).toBe('detail')
  })
})

describe('LangBar', () => {
  const languages = [
    { name: 'HCL', percentage: 60 },
    { name: 'Python', percentage: 40 },
  ]

  it('renders one segment per language, sized by percentage', () => {
    const spans = mount(LangBar, { props: { languages } }).findAll('span')
    expect(spans).toHaveLength(2)
    expect(spans[0].attributes('style')).toContain('width: 60%')
    expect(spans[1].attributes('style')).toContain('width: 40%')
  })

  it('colours a known language from the shared palette', () => {
    const style = mount(LangBar, { props: { languages } }).findAll('span')[0].attributes('style')!
    expect(langColors.HCL).toBeTruthy()
    expect(style.toLowerCase()).toContain(`background: ${langColors.HCL.toLowerCase()}`)
  })

  it('falls back to indigo for a language with no palette entry', () => {
    const wrapper = mount(LangBar, {
      props: { languages: [{ name: 'Brainfuck', percentage: 100 }] },
    })
    expect(langColors.Brainfuck).toBeUndefined()
    expect(wrapper.find('span').attributes('style')).toContain('background: #818cf8')
  })

  it('describes the whole bar for assistive technology', () => {
    const wrapper = mount(LangBar, { props: { languages } })
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('HCL 60%, Python 40%')
  })

  it('renders nothing but an empty bar for an empty language list', () => {
    const wrapper = mount(LangBar, { props: { languages: [] } })
    expect(wrapper.findAll('span')).toHaveLength(0)
    expect(wrapper.attributes('aria-label')).toBe('')
  })
})

describe('ResourceTable', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
  ]
  const rows = [
    { name: 'alpha', status: 'Running' },
    { name: 'beta', status: 'Completed' },
  ]

  it('renders a header per column and a row per record', () => {
    const wrapper = mount(ResourceTable, { props: { columns, rows } })
    expect(wrapper.findAll('th').map(th => th.text())).toEqual(['Name', 'Status'])
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.findAll('tbody tr')[0].text()).toContain('Running')
  })

  it('marks the first cell of each row as the name cell', () => {
    const wrapper = mount(ResourceTable, { props: { columns, rows } })
    const cells = wrapper.findAll('tbody tr')[0].findAll('td')
    expect(cells[0].classes()).toContain('name')
    expect(cells[1].classes()).not.toContain('name')
  })

  it('is inert by default — no caret, no button role, no tab stop', () => {
    const row = mount(ResourceTable, { props: { columns, rows } }).find('tbody tr')
    expect(row.classes()).not.toContain('selectable')
    expect(row.attributes('role')).toBeUndefined()
    expect(row.attributes('tabindex')).toBeUndefined()
    expect(row.attributes('aria-expanded')).toBeUndefined()
    expect(row.find('.caret').exists()).toBe(false)
  })

  it('emits nothing on click when not selectable', async () => {
    const wrapper = mount(ResourceTable, { props: { columns, rows } })
    await wrapper.find('tbody tr').trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('exposes selectable rows as keyboard-reachable buttons', () => {
    const row = mount(ResourceTable, {
      props: { columns, rows, selectable: true },
    }).find('tbody tr')
    expect(row.classes()).toContain('selectable')
    expect(row.attributes('role')).toBe('button')
    expect(row.attributes('tabindex')).toBe('0')
    expect(row.attributes('aria-expanded')).toBe('false')
  })

  it('emits the row key on click', async () => {
    const wrapper = mount(ResourceTable, { props: { columns, rows, selectable: true } })
    await wrapper.findAll('tbody tr')[1].trigger('click')
    expect(wrapper.emitted('select')).toEqual([['beta']])
  })

  it.each(['keydown.enter', 'keydown.space'])('emits the row key on %s', async event => {
    const wrapper = mount(ResourceTable, { props: { columns, rows, selectable: true } })
    await wrapper.find('tbody tr').trigger(event.replace('keydown.', 'keydown.'))
    expect(wrapper.emitted('select')).toEqual([['alpha']])
  })

  it('marks the selected row and turns its caret down', () => {
    const wrapper = mount(ResourceTable, {
      props: { columns, rows, selectable: true, selected: 'alpha' },
    })
    const [first, second] = wrapper.findAll('tbody tr')
    expect(first.classes()).toContain('selected')
    expect(first.attributes('aria-expanded')).toBe('true')
    expect(first.find('.caret').text()).toBe('▾')
    expect(second.classes()).not.toContain('selected')
    expect(second.find('.caret').text()).toBe('▸')
  })

  it('keys rows by a custom field', () => {
    const wrapper = mount(ResourceTable, {
      props: {
        columns: [{ key: 'label', label: 'Label' }],
        rows: [{ id: 'a1', label: 'Alpha' }],
        rowKey: 'id',
        selectable: true,
        selected: 'a1',
      },
    })
    expect(wrapper.find('tbody tr').classes()).toContain('selected')
  })

  it('lets a named slot override a column cell', () => {
    const wrapper = mount(ResourceTable, {
      props: { columns, rows },
      slots: { status: '<em class="custom">{{ params.row.name }}</em>' },
    })
    expect(wrapper.findAll('em.custom')).toHaveLength(2)
  })

  it('renders an empty body for no rows', () => {
    const wrapper = mount(ResourceTable, { props: { columns, rows: [] } })
    expect(wrapper.findAll('tbody tr')).toHaveLength(0)
    expect(wrapper.findAll('th')).toHaveLength(2)
  })
})
