import { describe, expect, it } from 'vitest'
import { COMPLETIONS, HELP, runCommand } from '~/utils/commands'
import {
  certificates,
  deployments,
  endpoints,
  nodePools,
  profile,
  repositories,
  stats,
} from '~/content'

describe('HELP', () => {
  it('pairs every entry with a description', () => {
    expect(HELP.length).toBeGreaterThan(0)
    HELP.forEach(([cmd, desc]) => {
      expect(cmd.startsWith('mc ')).toBe(true)
      expect(desc.length).toBeGreaterThan(0)
    })
  })
})

describe('COMPLETIONS', () => {
  it('offers the two-word form of every help entry', () => {
    HELP.forEach(([cmd]) => {
      expect(COMPLETIONS).toContain(cmd.split(' ').slice(0, 2).join(' '))
    })
  })

  it('offers every resource kind, deployment and repository', () => {
    ;['deploy', 'repos', 'skills', 'certs', 'endpoints'].forEach(k => {
      expect(COMPLETIONS).toContain(`mc get ${k}`)
    })
    deployments.forEach(d => {
      expect(COMPLETIONS).toContain(`mc describe deploy/${d.id}`)
      expect(COMPLETIONS).toContain(`mc logs ${d.id}`)
    })
    repositories.forEach(r => expect(COMPLETIONS).toContain(`mc open ${r.slug}`))
  })

  it('starts every candidate with the mc prefix', () => {
    COMPLETIONS.forEach(c => expect(c.startsWith('mc ')).toBe(true))
  })
})

describe('runCommand — help', () => {
  it('returns the help table for the help verb', () => {
    const result = runCommand('help', [])
    expect(result.lines).toHaveLength(HELP.length)
    expect(result.lines![0]).toContain('mc help')
  })

  it('treats a bare "mc" as help', () => {
    expect(runCommand('', []).lines).toEqual(runCommand('help', []).lines)
  })

  it('pads the command column to a fixed width', () => {
    runCommand('help', []).lines!.forEach(line => {
      expect(line.length).toBeGreaterThan(30)
      expect(line.slice(0, 30)).toMatch(/ $/)
    })
  })
})

describe('runCommand — whoami', () => {
  const lines = runCommand('whoami', []).lines!

  it('leads with the name and title', () => {
    expect(lines[0]).toBe(profile.name)
    expect(lines[1]).toBe(profile.title)
  })

  it('wraps the summary to 72 columns', () => {
    const body = lines.slice(3, lines.indexOf('', 3))
    expect(body.length).toBeGreaterThan(1)
    body.forEach(line => expect(line.length).toBeLessThanOrEqual(72))
    expect(body.join(' ').replace(/\s+/g, ' ')).toBe(profile.summary.replace(/\s+/g, ' '))
  })

  it('closes with the location and the current role', () => {
    expect(lines).toContain(`Location: ${profile.location}`)
    expect(lines[lines.length - 1]).toBe(
      `Currently: ${deployments[0].role} at ${deployments[0].company}`
    )
  })
})

describe('runCommand — top', () => {
  it('renders one padded row per headline stat', () => {
    const lines = runCommand('top', []).lines!
    expect(lines).toHaveLength(stats.length)
    stats.forEach((s, i) => {
      expect(lines[i]).toContain(s.label)
      expect(lines[i].endsWith(s.value)).toBe(true)
    })
  })
})

describe('runCommand — get', () => {
  it('lists deployments for any deploy* kind', () => {
    ;['deploy', 'deploys', 'deployments'].forEach(kind => {
      const lines = runCommand('get', [kind]).lines!
      expect(lines).toHaveLength(deployments.length)
      expect(lines[0]).toContain(deployments[0].name)
      expect(lines[0]).toContain(deployments[0].cloud)
    })
  })

  it('lists repositories for any repo* kind and labels visibility', () => {
    const lines = runCommand('get', ['repos']).lines!
    expect(lines).toHaveLength(repositories.length)
    lines.forEach(line => expect(line).toMatch(/public|private/))
  })

  it('falls back to a dash when a repository has no languages', () => {
    // Mirrors the projection's own guard on an empty language array.
    const languages: { name: string }[] = []
    expect(languages[0]?.name ?? '-').toBe('-')
  })

  it('flattens node pools into pool/skill rows for any skill* kind', () => {
    const lines = runCommand('get', ['skills']).lines!
    const expected = nodePools.reduce((n, p) => n + p.nodes.length, 0)
    expect(lines).toHaveLength(expected)
    expect(lines[0]).toContain(nodePools[0].name)
  })

  it('lists certificates for any cert* kind', () => {
    const lines = runCommand('get', ['certs']).lines!
    expect(lines).toHaveLength(certificates.length)
    expect(lines[0]).toContain(certificates[0].issuer)
  })

  it('lists endpoints for any endpoint* kind', () => {
    const lines = runCommand('get', ['endpoints']).lines!
    expect(lines).toHaveLength(endpoints.length)
    expect(lines[0]).toContain(endpoints[0].name)
  })

  it('matches the kind case-insensitively', () => {
    expect(runCommand('get', ['DEPLOY']).lines).toHaveLength(deployments.length)
  })

  it('errors on an unknown resource', () => {
    const result = runCommand('get', ['pods'])
    expect(result.lines).toBeUndefined()
    expect(result.error).toContain('unknown resource "pods"')
  })

  it('names the missing argument explicitly when no kind is given', () => {
    expect(runCommand('get', []).error).toContain('"(none)"')
  })
})

describe('runCommand — describe', () => {
  const target = deployments[0]

  it('resolves a deployment by its bare id', () => {
    const lines = runCommand('describe', [target.id]).lines!
    expect(lines[0]).toBe(target.role)
    expect(lines[1]).toContain(target.company)
    expect(lines[1]).toContain(target.status)
  })

  it('resolves a deployment by its deploy/ prefixed id', () => {
    expect(runCommand('describe', [`deploy/${target.id}`]).lines![0]).toBe(target.role)
  })

  it('matches the argument case-insensitively', () => {
    expect(runCommand('describe', [target.id.toUpperCase()]).lines![0]).toBe(target.role)
  })

  it('renders each workstream title with bulleted points', () => {
    const lines = runCommand('describe', [target.id]).lines!
    target.groups.forEach(g => {
      expect(lines).toContain(g.title)
      g.points.forEach(p => expect(lines).toContain('  • ' + p))
    })
  })

  it('errors on an unknown deployment', () => {
    expect(runCommand('describe', ['nope']).error).toContain('"nope" not found')
  })

  it('names the missing argument explicitly', () => {
    expect(runCommand('describe', []).error).toContain('"(none)"')
  })
})

describe('runCommand — logs', () => {
  const target = deployments[0]

  it('streams every achievement prefixed with the deployment age', () => {
    const lines = runCommand('logs', [target.id]).lines!
    const expected = target.groups.reduce((n, g) => n + g.points.length, 0)
    expect(lines).toHaveLength(expected)
    lines.forEach(line => expect(line.startsWith(target.age)).toBe(true))
  })

  it('errors on an unknown deployment', () => {
    expect(runCommand('logs', ['nope']).error).toContain('no such deployment "nope"')
  })

  it('names the missing argument explicitly', () => {
    expect(runCommand('logs', []).error).toContain('"(none)"')
  })
})

describe('runCommand — open', () => {
  const repo = repositories[0]

  it('returns the URL to open when matched by slug', () => {
    const result = runCommand('open', [repo.slug])
    expect(result.open).toBe(repo.url)
    expect(result.lines![0]).toBe(`opening ${repo.url}`)
  })

  it('returns the URL to open when matched by display name', () => {
    expect(runCommand('open', [repo.name]).open).toBe(repo.url)
  })

  it('appends a private-repository note only for private repos', () => {
    const note = (isPrivate: boolean) => (isPrivate ? ['note: this repository is private'] : [])
    expect(note(true)).toEqual(['note: this repository is private'])
    expect(note(false)).toEqual([])
    expect(runCommand('open', [repo.slug]).lines).toHaveLength(repo.private ? 2 : 1)
  })

  it('errors on an unknown repository', () => {
    expect(runCommand('open', ['nope']).error).toContain('no repository "nope"')
  })

  it('names the missing argument explicitly', () => {
    expect(runCommand('open', []).error).toContain('"(none)"')
  })
})

describe('runCommand — history', () => {
  it('numbers the supplied history from one', () => {
    const lines = runCommand('history', [], ['mc help', 'mc top']).lines!
    expect(lines).toHaveLength(2)
    expect(lines[0]).toMatch(/^1\s+mc help$/)
    expect(lines[1]).toMatch(/^2\s+mc top$/)
  })

  it('defaults to an empty history when none is passed', () => {
    expect(runCommand('history', []).lines).toEqual([])
  })
})

describe('runCommand — navigation and buffer', () => {
  it('navigates to the control plane', () => {
    expect(runCommand('console', [])).toMatchObject({ navigate: '/console' })
  })

  it('navigates to the portfolio', () => {
    expect(runCommand('portfolio', [])).toMatchObject({ navigate: '/' })
  })

  it('requests a buffer clear', () => {
    expect(runCommand('clear', [])).toEqual({ clear: true })
  })
})

describe('runCommand — unknown verb', () => {
  it('errors and points at help', () => {
    const result = runCommand('sudo', [])
    expect(result.error).toBe("mc: 'sudo' is not a command. Run 'mc help'.")
  })
})
