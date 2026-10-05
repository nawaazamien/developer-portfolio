import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects'
import { socialLinks } from '../data/profile'
import type { Project } from '../data/types'
import { getRepositoryUrl } from './projects'
import { validateProjects } from './validateProjects'

describe('portfolio content', () => {
  it('has valid project data', () => {
    expect(validateProjects(projects)).toEqual([])
  })

  it('exposes only real external links', () => {
    for (const link of socialLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/)
    }
  })

  it('never reveals a private repository', () => {
    for (const project of projects.filter((p) => p.visibility === 'private')) {
      expect(getRepositoryUrl(project)).toBeUndefined()
    }
  })
})

describe('validateProjects', () => {
  const base: Project = { ...projects[0] }

  it('flags duplicate slugs', () => {
    const problems = validateProjects([base, { ...base, id: 'other' }])
    expect(problems.join()).toContain('Duplicate slug')
  })

  it('flags a repository on a private project', () => {
    const problems = validateProjects([
      { ...base, visibility: 'private', repository: { url: 'https://github.com/x/y' } },
    ])
    expect(problems.join()).toContain('private project must not set a repository')
  })

  it('requires a featured project and valid images', () => {
    const problems = validateProjects([
      { ...base, featured: false, screenshots: [{ src: '', alt: '', width: 1, height: 1 }] },
    ])
    expect(problems.join()).toContain('No featured projects')
    expect(problems.join()).toContain('src and alt')
  })

  it('suppresses repository links for private projects at read time', () => {
    const leaky: Project = {
      ...base,
      visibility: 'private',
      repository: { url: 'https://github.com/x/y' },
    }
    expect(getRepositoryUrl(leaky)).toBeUndefined()
  })
})
