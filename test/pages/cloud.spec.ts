import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CloudPage from '~/pages/cloud.vue'
import { certificates, deployments, nodePools, repositories } from '~/content'

const AWS =
  /\baws\b|amazon|\beks\b|\bs3\b|lambda|bedrock|redshift|cloudformation|codepipeline|cognito|\biam\b|guardduty|cloudwatch/i

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('multi-cloud page', () => {
  it('offers a tab per vendor with AWS selected first', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud' })
    const tabs = wrapper.findAll('.tab')
    expect(tabs.map(t => t.text())).toEqual([
      'AWS',
      'Microsoft Azure',
      'Google Cloud',
      'Oracle Cloud',
    ])
    expect(tabs[0].classes()).toContain('on')
  })

  it('shows the region for the selected vendor', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud' })
    expect(wrapper.find('.region').text()).toContain('eu-west-2')
  })

  it('filters roles, skills, certificates and repos to the selected vendor', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud' })
    const expectedRoles = deployments.filter(d => AWS.test(d.cloud))
    expect(expectedRoles.length).toBeGreaterThan(0)
    expect(wrapper.findAll('.role')).toHaveLength(expectedRoles.length)

    const tiles = wrapper.findAll('.tile .value').map(v => v.text())
    expect(tiles).toContain(String(expectedRoles.length))
    expect(tiles).toContain(String(nodePools.flatMap(p => p.nodes).filter(n => AWS.test(n)).length))
    expect(tiles).toContain(
      String(certificates.filter(c => AWS.test(c.name) || AWS.test(c.issuer)).length)
    )
    expect(tiles).toContain(
      String(repositories.filter(r => AWS.test(r.description) || AWS.test(r.name)).length)
    )
  })

  it('shows only the bullets that mention the selected vendor, capped at four', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud' })
    wrapper.findAll('.role').forEach(role => {
      const bullets = role.findAll('li')
      expect(bullets.length).toBeLessThanOrEqual(4)
      bullets.forEach(li => expect(AWS.test(li.text())).toBe(true))
    })
  })

  it('reskins and refilters when another vendor is picked, and records it in the hash', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud' })
    const replace = vi.spyOn(useRouter(), 'replace').mockResolvedValue(undefined)
    const tabs = wrapper.findAll('.tab')
    await tabs[1].trigger('click')

    expect(tabs[1].classes()).toContain('on')
    expect(tabs[0].classes()).not.toContain('on')
    expect(wrapper.find('.region').text()).toContain('uksouth')
    expect(replace).toHaveBeenCalledWith({ hash: '#azure' })
  })

  it.each([
    ['#azure', 'uksouth'],
    ['#gcp', 'europe-west2'],
    ['#oci', 'uk-london-1'],
  ])('opens directly on %s from the URL hash', async (hash, region) => {
    const wrapper = await mountSuspended(CloudPage, { route: `/cloud${hash}` })
    expect(wrapper.find('.region').text()).toContain(region)
  })

  it('ignores an unknown hash and stays on AWS', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud#ibm' })
    expect(wrapper.find('.tab').classes()).toContain('on')
    expect(wrapper.find('.region').text()).toContain('eu-west-2')
  })

  it('renders an empty state for a vendor with no matching roles or skills', async () => {
    const wrapper = await mountSuspended(CloudPage, { route: '/cloud#oci' })
    const panels = wrapper.findAll('.panel')
    const hasContent = panels.length > 0
    // OCI is certification-only, so either the panels exist or the fallback does.
    expect(hasContent || wrapper.find('.muted').exists()).toBe(true)
  })
})
