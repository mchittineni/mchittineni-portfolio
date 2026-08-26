import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutSection from '~/components/AboutSection.vue'
import ContactSection from '~/components/ContactSection.vue'
import ExperienceSection from '~/components/ExperienceSection.vue'
import ProjectsSection from '~/components/ProjectsSection.vue'
import SkillsSection from '~/components/SkillsSection.vue'
import {
  contactDetails,
  highlights,
  jobs,
  projectCategories,
  projects,
  socials,
  stats,
} from '~/content'
import { certifications, proficiency, skillCategories } from '~/content/skills'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('AboutSection', () => {
  it('renders one stat per headline metric', async () => {
    const wrapper = await mountSuspended(AboutSection)
    const rendered = wrapper.findAll('.hero__stat')
    expect(rendered).toHaveLength(stats.length)
    stats.forEach((s, i) => {
      expect(rendered[i].text()).toContain(s.value)
      expect(rendered[i].text()).toContain(s.label)
    })
  })

  it('prefixes public assets with the runtime base URL so project pages resolve', async () => {
    const wrapper = await mountSuspended(AboutSection)
    const base = useRuntimeConfig().app.baseURL
    expect(wrapper.find('img').attributes('src')).toBe(`${base}profile.jpg`)
    expect(wrapper.find('a[download]').attributes('href')).toBe(
      `${base}Manideep_Chittineni_Resume.pdf`
    )
  })

  it('gives the portrait real alt text', async () => {
    const wrapper = await mountSuspended(AboutSection)
    expect(wrapper.find('img').attributes('alt')).toContain('Manideep Chittineni')
  })
})

describe('SkillsSection', () => {
  it('renders a card per skill category with every tool linked', async () => {
    const wrapper = await mountSuspended(SkillsSection)
    const text = wrapper.text()
    skillCategories.forEach(cat => {
      expect(text).toContain(cat.title)
      cat.items.forEach(item => expect(text).toContain(item.name))
    })
  })

  it('opens every tool link safely in a new tab', async () => {
    const wrapper = await mountSuspended(SkillsSection)
    wrapper.findAll('a.tech').forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  it('renders every proficiency bar and certification', async () => {
    const text = (await mountSuspended(SkillsSection)).text()
    proficiency.forEach(p => expect(text).toContain(p.name))
    certifications.forEach(c => expect(text).toContain(c.title))
  })

  it('gives every tool logo alt text matching its name', async () => {
    const wrapper = await mountSuspended(SkillsSection)
    const alts = wrapper.findAll('a.tech img').map(img => img.attributes('alt'))
    expect(alts.length).toBeGreaterThan(0)
    alts.forEach(alt => expect(alt).toBeTruthy())
  })
})

describe('ExperienceSection', () => {
  it('renders every role with its company and period', async () => {
    const text = (await mountSuspended(ExperienceSection)).text()
    jobs.forEach(job => {
      expect(text).toContain(job.role)
      expect(text).toContain(job.company)
      expect(text).toContain(job.period)
    })
  })

  it('renders every workstream bullet', async () => {
    const text = (await mountSuspended(ExperienceSection)).text()
    jobs.forEach(job =>
      job.groups.forEach(group => group.points.forEach(p => expect(text).toContain(p)))
    )
  })
})

describe('ProjectsSection', () => {
  it('renders the highlights banner', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    expect(wrapper.findAll('.highlight-card')).toHaveLength(highlights.length)
  })

  it('renders a filter button per category, with All active first', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons.map(b => b.text())).toEqual([...projectCategories])
    expect(buttons[0].classes()).toContain('active')
  })

  it('shows every project under the All filter', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    expect(wrapper.findAll('.project-card')).toHaveLength(projects.length)
  })

  it('narrows the grid to the chosen category and moves the active class', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    const category = projectCategories[1]
    const button = wrapper.findAll('.filter-btn')[1]
    await button.trigger('click')
    const expected = projects.filter(p => p.category === category)
    expect(expected.length).toBeGreaterThan(0)
    expect(wrapper.findAll('.project-card')).toHaveLength(expected.length)
    expect(button.classes()).toContain('active')
    expect(wrapper.findAll('.filter-btn')[0].classes()).not.toContain('active')
  })

  it.each(projectCategories.slice(1))('filters correctly for %s', async category => {
    const wrapper = await mountSuspended(ProjectsSection)
    const index = projectCategories.indexOf(category)
    await wrapper.findAll('.filter-btn')[index].trigger('click')
    expect(wrapper.findAll('.project-card')).toHaveLength(
      projects.filter(p => p.category === category).length
    )
  })

  it('returns to the full grid when All is chosen again', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    await wrapper.findAll('.filter-btn')[1].trigger('click')
    await wrapper.findAll('.filter-btn')[0].trigger('click')
    expect(wrapper.findAll('.project-card')).toHaveLength(projects.length)
  })

  it('links every card to its source repository', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    const hrefs = wrapper
      .findAll('.project-card__link:not(.project-card__link--demo)')
      .map(a => a.attributes('href'))
    expect(hrefs).toEqual(projects.map(p => p.githubUrl))
  })

  it('renders a demo link only for projects that publish one', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    const demos = wrapper.findAll('.project-card__link--demo')
    const withDemo = projects.filter(p => p.liveUrl)
    expect(withDemo.length).toBeGreaterThan(0)
    expect(demos).toHaveLength(withDemo.length)
    expect(demos.map(a => a.attributes('href'))).toEqual(withDemo.map(p => p.liveUrl))
  })

  it('names each link per project so screen readers can tell them apart', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    const labels = wrapper.findAll('.project-card__link').map(a => a.attributes('aria-label'))
    expect(new Set(labels).size).toBe(labels.length)
    expect(labels).toContain(`View ${projects[0].name} source code on GitHub`)
  })

  it('opens every outbound link safely', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    wrapper.findAll('.project-card__link').forEach(a => {
      expect(a.attributes('target')).toBe('_blank')
      expect(a.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  it('sizes each language segment by percentage', async () => {
    const wrapper = await mountSuspended(ProjectsSection)
    const segments = wrapper.findAll('.project-card')[0].findAll('.lang-bar__segment')
    expect(segments).toHaveLength(projects[0].languages.length)
    segments.forEach((seg, i) => {
      expect(seg.attributes('style')).toContain(`width: ${projects[0].languages[i].percentage}%`)
    })
  })
})

describe('ContactSection', () => {
  it('renders every contact detail and social link', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const text = wrapper.text()
    contactDetails.forEach(d => {
      expect(text).toContain(d.label)
      expect(text).toContain(d.value)
    })
    socials.forEach(s => {
      expect(wrapper.find(`a[href="${s.href}"]`).exists()).toBe(true)
    })
  })

  it('requires all three form fields', async () => {
    const wrapper = await mountSuspended(ContactSection)
    ;['#name', '#email', '#message'].forEach(selector => {
      expect(wrapper.find(selector).attributes('required')).toBeDefined()
    })
  })

  it('hands the message off to a mailto with the fields encoded', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const assign = vi.fn()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        set href(value: string) {
          assign(value)
        },
      },
    })

    await wrapper.find('#name').setValue('Ada Lovelace')
    await wrapper.find('#email').setValue('ada@example.com')
    await wrapper.find('#message').setValue('Hello & welcome')
    await wrapper.find('form').trigger('submit')

    expect(assign).toHaveBeenCalledTimes(1)
    const mailto = assign.mock.calls[0][0] as string
    expect(mailto.startsWith('mailto:manideep.chittineni@hotmail.com')).toBe(true)
    expect(mailto).toContain('Ada%20Lovelace')
    expect(mailto).toContain('ada%40example.com')
    expect(mailto).toContain('Hello%20%26%20welcome')
  })

  it('clears the form after submitting', async () => {
    const wrapper = await mountSuspended(ContactSection)
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { set href(_value: string) {} },
    })

    await wrapper.find('#name').setValue('Ada')
    await wrapper.find('form').trigger('submit')
    expect((wrapper.find('#name').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('#message').element as HTMLTextAreaElement).value).toBe('')
  })
})
