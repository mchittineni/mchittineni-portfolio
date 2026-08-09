// The command allowlist. One function per verb, every one returning plain
// text lines so `| grep` can filter any output uniformly.
import {
  profile,
  stats,
  deployments,
  repositories,
  nodePools,
  certificates,
  endpoints,
} from '~/content'

export interface CommandResult {
  lines?: string[]
  error?: string
  clear?: boolean
  navigate?: string
  open?: string
}

const pad = (value: unknown, width: number) => String(value).padEnd(width)

export const HELP: [string, string][] = [
  ['mc help', 'Show this list'],
  ['mc whoami', 'Profile and current focus'],
  ['mc top', 'Headline metrics'],
  ['mc get <kind>', 'deploy · repos · skills · certs · endpoints'],
  ['mc describe deploy/<name>', 'Full detail for one role'],
  ['mc logs <name>', 'Achievements as an event stream'],
  ['mc open <repo>', 'Open a repository on GitHub'],
  ['mc history', 'Command history'],
  ['mc console', 'Switch to the control plane'],
  ['mc portfolio', 'Switch to the scroll portfolio'],
  ['mc clear', 'Clear the buffer'],
]

/** Names the shell can complete, derived from the content layer. */
export const COMPLETIONS: string[] = [
  ...HELP.map(([cmd]) => cmd.split(' ').slice(0, 2).join(' ')),
  ...['deploy', 'repos', 'skills', 'certs', 'endpoints'].map(k => `mc get ${k}`),
  ...deployments.map(d => `mc describe deploy/${d.id}`),
  ...deployments.map(d => `mc logs ${d.id}`),
  ...repositories.map(r => `mc open ${r.slug}`),
]

function findDeployment(arg = '') {
  const id = arg.replace(/^deploy\//, '').toLowerCase()
  return deployments.find(d => d.id === id || d.name === id)
}

export function runCommand(verb: string, args: string[], history: string[] = []): CommandResult {
  switch (verb) {
    case '':
    case 'help':
      return { lines: HELP.map(([cmd, desc]) => pad(cmd, 30) + desc) }

    case 'whoami':
      return {
        lines: [
          profile.name,
          profile.title,
          '',
          ...profile.summary.match(/.{1,72}(\s|$)/g)!.map(s => s.trim()),
          '',
          `Location: ${profile.location}`,
          `Currently: ${deployments[0].role} at ${deployments[0].company}`,
        ],
      }

    case 'top':
      return { lines: stats.map(s => pad(s.label, 22) + s.value) }

    case 'get': {
      const kind = (args[0] || '').toLowerCase()
      if (kind.startsWith('deploy'))
        return {
          lines: deployments.map(
            d => pad(d.name, 26) + pad(d.ready, 7) + pad(d.status, 11) + pad(d.age, 8) + d.cloud
          ),
        }
      if (kind.startsWith('repo'))
        return {
          lines: repositories.map(
            r =>
              pad(r.slug, 26) +
              pad(r.private ? 'private' : 'public', 9) +
              pad(r.languages[0]?.name ?? '-', 13) +
              r.category
          ),
        }
      if (kind.startsWith('skill'))
        return {
          lines: nodePools.flatMap(p => p.nodes.map(n => pad(p.name, 28) + n)),
        }
      if (kind.startsWith('cert'))
        return { lines: certificates.map(c => pad(c.issuer, 22) + c.name) }
      if (kind.startsWith('endpoint'))
        return {
          lines: endpoints.map(e => pad(e.name, 12) + pad(e.type, 14) + e.address),
        }
      return {
        error: `error: unknown resource "${kind || '(none)'}" — try deploy, repos, skills, certs, endpoints`,
      }
    }

    case 'describe': {
      const d = findDeployment(args[0])
      if (!d) return { error: `error: deployments "${args[0] || '(none)'}" not found` }
      const lines = [d.role, `${d.company} · ${d.period} · ${d.cloud} · ${d.status}`, '']
      d.groups.forEach(g => {
        lines.push(g.title)
        g.points.forEach(p => lines.push('  • ' + p))
        lines.push('')
      })
      return { lines }
    }

    case 'logs': {
      const d = findDeployment(args[0])
      if (!d) return { error: `error: no such deployment "${args[0] || '(none)'}"` }
      return {
        lines: d.groups.flatMap(g => g.points.map(p => pad(d.age, 7) + p)),
      }
    }

    case 'open': {
      const r = repositories.find(x => x.slug === args[0] || x.name === args[0])
      if (!r) return { error: `error: no repository "${args[0] || '(none)'}"` }
      return {
        open: r.url,
        lines: [`opening ${r.url}`, ...(r.private ? ['note: this repository is private'] : [])],
      }
    }

    case 'history':
      return { lines: history.map((c, i) => pad(i + 1, 5) + c) }

    case 'console':
      return { navigate: '/console', lines: ['switching to the control plane…'] }

    case 'portfolio':
      return { navigate: '/', lines: ['switching to the portfolio…'] }

    case 'clear':
      return { clear: true }

    default:
      return { error: `mc: '${verb}' is not a command. Run 'mc help'.` }
  }
}
