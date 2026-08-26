import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

describe('portfolio page', () => {
  it('stacks every section in reading order', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const ids = wrapper.findAll('section[id]').map(s => s.attributes('id'))
    expect(ids).toEqual(['about', 'skills', 'experience', 'projects', 'contact'])
  })
})
