// Single source of truth for every interface.
//
// The portfolio, the console and the terminal all read from here. The console
// and terminal additionally need each record projected as a platform resource
// (a role behaves like a Deployment, a repo like a custom resource), so those
// projections are derived below rather than maintained by hand.

export * from './profile'
export * from './experience'
export * from './projects'
export * from './skills'

import { profile, stats, socials, contactDetails } from './profile'
import { jobs } from './experience'
import { projects } from './projects'
import { skillCategories, certifications } from './skills'

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** "Mar 2026" -> months since epoch, so durations survive the passage of time. */
function toMonths(token: string): number | null {
  const [mon, year] = token.trim().toLowerCase().split(/\s+/)
  const m = MONTHS.indexOf(mon?.slice(0, 3))
  if (m < 0 || !year) return null
  return Number(year) * 12 + m
}

/** "Oct 2022 - Dec 2025" -> "3y2mo". "Present" resolves against today. */
export function durationOf(period: string): string {
  const [rawStart, rawEnd] = period.split(/[–—-]/).map(s => s.trim())
  const start = toMonths(rawStart)
  if (start === null) return ''
  const now = new Date()
  const end = /present|current/i.test(rawEnd ?? '')
    ? now.getFullYear() * 12 + now.getMonth()
    : toMonths(rawEnd ?? '')
  if (end === null) return ''
  const total = Math.max(0, end - start)
  const y = Math.floor(total / 12)
  const mo = total % 12
  return y ? `${y}y${mo ? mo + 'mo' : ''}` : `${mo}mo`
}

export interface Deployment {
  id: string
  name: string
  role: string
  company: string
  period: string
  ready: string
  status: 'Running' | 'Completed'
  age: string
  cloud: string
  metrics: { value: string; label: string }[]
  groups: { title: string; points: string[] }[]
}

const slugOf = (company: string) =>
  company
    .toLowerCase()
    .replace(/\b(limited|ltd|technologies)\b/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Two roles at the same employer would otherwise collapse to one slug and show
 * as duplicate rows. Where that happens, the id supplies the discriminator.
 */
const slugCounts = jobs.reduce<Record<string, number>>((acc, job) => {
  const slug = slugOf(job.company)
  acc[slug] = (acc[slug] ?? 0) + 1
  return acc
}, {})

/** Roles as Deployments: workstreams are replicas, a current role is Running. */
export const deployments: Deployment[] = jobs.map(job => ({
  id: job.id,
  name:
    slugCounts[slugOf(job.company)] > 1 && job.id.includes('-')
      ? `${slugOf(job.company)}-${job.id.split('-').pop()}`
      : slugOf(job.company),
  role: job.role,
  company: job.company,
  period: job.period,
  ready: `${job.groups.length}/${job.groups.length}`,
  status: /present|current/i.test(job.period) ? 'Running' : 'Completed',
  age: durationOf(job.period),
  cloud: job.clouds.join('·'),
  metrics: job.metrics,
  groups: job.groups,
}))

/** Repos as a custom resource. Visibility is real state worth surfacing. */
export const repositories = projects.map(p => ({
  name: p.name,
  slug: p.githubUrl.split('/').pop() ?? p.name,
  category: p.category,
  description: p.description,
  url: p.githubUrl,
  languages: p.languages,
  private: /claude-algo-trader|K8-s-MultiCloud-Setup/.test(p.githubUrl),
}))

/** Skill groups as node pools. */
export const nodePools = skillCategories.map(c => ({
  name: c.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  title: c.title,
  nodes: c.items.map(i => i.name),
}))

export const certificates = certifications.map(c => ({
  name: c.title,
  issuer: c.alt,
  url: c.href,
}))

export const endpoints = [
  ...contactDetails.map(d => ({
    name: d.label.toLowerCase(),
    type: 'ExternalName',
    address: d.value,
    url: d.href,
  })),
  ...socials.map(s => ({
    name: s.label.toLowerCase(),
    type: 'ClusterIP',
    address: s.href.replace(/^https?:\/\/(www\.)?/, ''),
    url: s.href,
  })),
]

export interface ClusterEvent {
  age: string
  type: 'Normal' | 'Warning'
  reason: string
  object: string
  message: string
}

/**
 * A career event stream. Each role's first workstream bullets become events
 * against that Deployment, so the feed stays true to the source content.
 */
export const events: ClusterEvent[] = deployments.flatMap(d =>
  d.groups.flatMap(g =>
    g.points.slice(0, 2).map(point => ({
      age: d.age,
      type: /incident|drift|waste|blocker/i.test(point)
        ? ('Warning' as const)
        : ('Normal' as const),
      reason: g.title
        .split(/[,&]/)[0]
        .trim()
        .split(/\s+/)
        .map(w => w[0].toUpperCase() + w.slice(1).replace(/[^a-zA-Z0-9]/g, ''))
        .join('')
        .slice(0, 28),
      object: `deploy/${d.name}`,
      message: point,
    }))
  )
)

export const headline = { profile, stats }
