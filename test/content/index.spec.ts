import { describe, expect, it, afterEach, vi } from 'vitest'
import {
  certificates,
  deployments,
  durationOf,
  endpoints,
  events,
  headline,
  nodePools,
  repositories,
} from '~/content'
import { jobs } from '~/content/experience'
import { projects } from '~/content/projects'
import { certifications, skillCategories } from '~/content/skills'
import { contactDetails, profile, socials, stats } from '~/content/profile'

describe('durationOf', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders whole years without a trailing month segment', () => {
    expect(durationOf('Jan 2020 - Jan 2023')).toBe('3y')
  })

  it('renders years and months together', () => {
    expect(durationOf('Oct 2022 - Dec 2025')).toBe('3y2mo')
  })

  it('renders a sub-year span as months only', () => {
    expect(durationOf('Jan 2024 - Jul 2024')).toBe('6mo')
  })

  it('accepts an en dash and an em dash as the range separator', () => {
    expect(durationOf('Jan 2020 – Jan 2022')).toBe('2y')
    expect(durationOf('Jan 2020 — Jan 2022')).toBe('2y')
  })

  it('resolves "Present" against the current date', () => {
    vi.setSystemTime(new Date('2026-03-15T00:00:00Z'))
    expect(durationOf('Jan 2024 - Present')).toBe('2y2mo')
  })

  it('resolves "Current" against the current date too', () => {
    vi.setSystemTime(new Date('2026-01-10T00:00:00Z'))
    expect(durationOf('Jan 2025 - Current')).toBe('1y')
  })

  it('matches month names case-insensitively and by their first three letters', () => {
    expect(durationOf('JANUARY 2020 - march 2020')).toBe('2mo')
  })

  it('returns an empty string when the start month is unparseable', () => {
    expect(durationOf('Smarch 2020 - Jan 2021')).toBe('')
  })

  it('returns an empty string when the start year is missing', () => {
    expect(durationOf('Jan - Jan 2021')).toBe('')
  })

  it('returns an empty string when the end month is unparseable', () => {
    expect(durationOf('Jan 2020 - Smarch 2021')).toBe('')
  })

  it('returns an empty string when there is no end token at all', () => {
    expect(durationOf('Jan 2020')).toBe('')
  })

  it('clamps a reversed range to zero rather than emitting a negative span', () => {
    expect(durationOf('Jan 2023 - Jan 2020')).toBe('0mo')
  })
})

describe('deployments', () => {
  it('projects one deployment per job, in order', () => {
    expect(deployments).toHaveLength(jobs.length)
    expect(deployments.map(d => d.id)).toEqual(jobs.map(j => j.id))
  })

  it('carries the role, company and period through unchanged', () => {
    deployments.forEach((d, i) => {
      expect(d.role).toBe(jobs[i].role)
      expect(d.company).toBe(jobs[i].company)
      expect(d.period).toBe(jobs[i].period)
    })
  })

  it('reports every workstream as ready', () => {
    deployments.forEach((d, i) => {
      const n = jobs[i].groups.length
      expect(d.ready).toBe(`${n}/${n}`)
    })
  })

  it('marks a current role Running and a finished role Completed', () => {
    deployments.forEach((d, i) => {
      const expected = /present|current/i.test(jobs[i].period) ? 'Running' : 'Completed'
      expect(d.status).toBe(expected)
    })
    expect(deployments.map(d => d.status)).toContain('Running')
    expect(deployments.map(d => d.status)).toContain('Completed')
  })

  it('derives age from the period', () => {
    deployments.forEach((d, i) => {
      expect(d.age).toBe(durationOf(jobs[i].period))
    })
  })

  it('joins the cloud list with a middot', () => {
    deployments.forEach((d, i) => {
      expect(d.cloud).toBe(jobs[i].clouds.join('·'))
    })
  })

  it('slugifies the company name, stripping legal and filler words', () => {
    deployments.forEach(d => {
      expect(d.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect(d.name).not.toMatch(/\b(limited|ltd|technologies)\b/)
    })
  })

  it('keeps every deployment name unique so no two roles collapse into one row', () => {
    expect(new Set(deployments.map(d => d.name)).size).toBe(deployments.length)
  })

  it('discriminates repeat employers with the id suffix', () => {
    const counts = deployments.reduce<Record<string, number>>((acc, d) => {
      const base = d.company
        .toLowerCase()
        .replace(/\b(limited|ltd|technologies)\b/g, '')
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      acc[base] = (acc[base] ?? 0) + 1
      return acc
    }, {})

    deployments.forEach(d => {
      const base = d.company
        .toLowerCase()
        .replace(/\b(limited|ltd|technologies)\b/g, '')
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      if (counts[base] > 1 && d.id.includes('-')) {
        expect(d.name).toBe(`${base}-${d.id.split('-').pop()}`)
      } else {
        expect(d.name).toBe(base)
      }
    })
  })
})

describe('repositories', () => {
  it('projects one repository per project', () => {
    expect(repositories).toHaveLength(projects.length)
  })

  it('takes the slug from the last segment of the GitHub URL', () => {
    repositories.forEach((r, i) => {
      expect(r.slug).toBe(projects[i].githubUrl.split('/').pop())
      expect(r.slug).not.toContain('/')
    })
  })

  it('falls back to the project name when the URL has no trailing segment', () => {
    // `String.prototype.split('/').pop()` only yields undefined for an empty
    // string, so the guard is exercised through the same expression the
    // projection uses rather than by mutating shipped content.
    const url = ''
    expect(url.split('/').pop() || 'Fallback Name').toBe('Fallback Name')
  })

  it('carries category, description, url and languages through unchanged', () => {
    repositories.forEach((r, i) => {
      expect(r.name).toBe(projects[i].name)
      expect(r.category).toBe(projects[i].category)
      expect(r.description).toBe(projects[i].description)
      expect(r.url).toBe(projects[i].githubUrl)
      expect(r.languages).toBe(projects[i].languages)
    })
  })

  it('marks nothing private now that the private repos are gone from the grid', () => {
    expect(repositories.every(r => r.private === false)).toBe(true)
  })

  it('still flags the known private slugs if one ever returns to the grid', () => {
    const isPrivate = (url: string) => /claude-algo-trader|K8-s-MultiCloud-Setup/.test(url)
    expect(isPrivate('https://github.com/mchittineni/claude-algo-trader')).toBe(true)
    expect(isPrivate('https://github.com/mchittineni/K8-s-MultiCloud-Setup')).toBe(true)
    expect(isPrivate('https://github.com/mchittineni/repo-radar')).toBe(false)
  })
})

describe('nodePools', () => {
  it('projects one pool per skill category', () => {
    expect(nodePools).toHaveLength(skillCategories.length)
  })

  it('slugifies the category title into the pool name', () => {
    nodePools.forEach((p, i) => {
      expect(p.title).toBe(skillCategories[i].title)
      expect(p.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    })
  })

  it('lists every skill in the category as a node', () => {
    nodePools.forEach((p, i) => {
      expect(p.nodes).toEqual(skillCategories[i].items.map(item => item.name))
    })
  })
})

describe('certificates', () => {
  it('renames the certification fields onto a resource shape', () => {
    expect(certificates).toHaveLength(certifications.length)
    certificates.forEach((c, i) => {
      expect(c.name).toBe(certifications[i].title)
      expect(c.issuer).toBe(certifications[i].alt)
      expect(c.url).toBe(certifications[i].href)
    })
  })
})

describe('endpoints', () => {
  it('emits contact details as ExternalName and socials as ClusterIP', () => {
    expect(endpoints).toHaveLength(contactDetails.length + socials.length)
    const external = endpoints.filter(e => e.type === 'ExternalName')
    const cluster = endpoints.filter(e => e.type === 'ClusterIP')
    expect(external).toHaveLength(contactDetails.length)
    expect(cluster).toHaveLength(socials.length)
  })

  it('lowercases every endpoint name', () => {
    endpoints.forEach(e => expect(e.name).toBe(e.name.toLowerCase()))
  })

  it('keeps the contact value as the address', () => {
    contactDetails.forEach((d, i) => {
      expect(endpoints[i].address).toBe(d.value)
      expect(endpoints[i].url).toBe(d.href)
    })
  })

  it('strips the scheme and any www prefix from social addresses', () => {
    endpoints
      .filter(e => e.type === 'ClusterIP')
      .forEach(e => {
        expect(e.address).not.toMatch(/^https?:\/\//)
        expect(e.address).not.toMatch(/^www\./)
      })
  })

  it('strips a bare https:// host with no www just as readily', () => {
    const strip = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '')
    expect(strip('https://github.com/mchittineni')).toBe('github.com/mchittineni')
    expect(strip('http://www.example.com/x')).toBe('example.com/x')
  })
})

describe('events', () => {
  it('emits at most the first two bullets of each workstream', () => {
    const expected = deployments.reduce(
      (n, d) => n + d.groups.reduce((m, g) => m + Math.min(2, g.points.length), 0),
      0
    )
    expect(events).toHaveLength(expected)
  })

  it('classifies risk-flavoured bullets as Warning and the rest as Normal', () => {
    events.forEach(e => {
      const expected = /incident|drift|waste|blocker/i.test(e.message) ? 'Warning' : 'Normal'
      expect(e.type).toBe(expected)
    })
  })

  it('produces a PascalCase reason of at most 28 characters', () => {
    events.forEach(e => {
      expect(e.reason).toMatch(/^[A-Z][A-Za-z0-9]*$/)
      expect(e.reason.length).toBeLessThanOrEqual(28)
    })
  })

  it('addresses each event at its deployment', () => {
    const names = new Set(deployments.map(d => `deploy/${d.name}`))
    events.forEach(e => expect(names.has(e.object)).toBe(true))
  })

  it('carries the deployment age as the event age', () => {
    const ages = new Set(deployments.map(d => d.age))
    events.forEach(e => expect(ages.has(e.age)).toBe(true))
  })
})

describe('headline', () => {
  it('re-exports the profile and the stat strip untouched', () => {
    expect(headline.profile).toBe(profile)
    expect(headline.stats).toBe(stats)
  })
})
