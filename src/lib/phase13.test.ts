import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { caseStudies } from '../data/caseStudies'
import { professionalStack, productStack, coreStack } from '../data/engineering'
import { projects } from '../data/projects'
import { PROJECT_PAGES, PROJECT_SLUGS } from '../data/projectSlugs'
import { skills } from '../data/profile'
import { getProjects, getRepositoryUrl } from './projects'
import { getAtAGlance } from '../data/engineering'

const NEW_SLUGS = [
  'atlas',
  'anti-social-publisher',
  'fluxkit',
  'ugc-operations-dashboard',
  'boat-jam',
  'mars-cleaners',
]

describe('Phase 13 portfolio refresh', () => {
  it('registers every new project with a route, a case study and a card', () => {
    for (const slug of NEW_SLUGS) {
      expect(PROJECT_SLUGS).toContain(slug)
      expect(projects.some((p) => p.slug === slug)).toBe(true)
      expect(caseStudies[slug as keyof typeof caseStudies]).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', 'social', `${slug}.jpg`))).toBe(true)
    }
  })

  it('keeps the project list, route registry and case studies in step', () => {
    expect(projects).toHaveLength(PROJECT_PAGES.length)
    expect(Object.keys(caseStudies).sort()).toEqual([...PROJECT_SLUGS].sort())
    const stat = getAtAGlance(projects).find((s) => s.label.startsWith('Projects'))
    expect(stat?.value).toBe(String(projects.length))
    expect(projects.length).toBe(17)
  })

  it('features the five strongest full-stack projects in order', () => {
    const featured = getProjects().filter((p) => p.featured).map((p) => p.slug)
    expect(featured).toEqual([
      'atlas',
      'anti-social-finance',
      'saas-foundation',
      'anti-social-publisher',
      'pet-platform',
    ])
  })

  it('keeps game projects secondary', () => {
    for (const p of projects.filter((x) => x.category === 'interactive')) {
      expect(p.featured).toBe(false)
    }
  })

  it('exposes no repository link for private projects, including the new ones', () => {
    for (const slug of NEW_SLUGS) {
      const project = projects.find((p) => p.slug === slug)!
      expect(project.visibility).toBe('private')
      expect(getRepositoryUrl(project)).toBeUndefined()
    }
  })

  it('has diagram media with alt text for each new project and no fake screenshots', () => {
    for (const slug of NEW_SLUGS) {
      const project = projects.find((p) => p.slug === slug)!
      expect(project.screenshots.length).toBeGreaterThan(0)
      for (const image of project.screenshots) {
        expect(image.alt.length).toBeGreaterThan(40)
        expect(image.src).toMatch(/\.webp/)
      }
    }
  })

  it('does not publish secrets, private URLs, local paths or private identifiers', () => {
    const files = [
      'src/data/projects.ts',
      'src/data/projectSlugs.ts',
      'src/data/caseStudies/atlas.ts',
      'src/data/caseStudies/anti-social-publisher.ts',
      'src/data/caseStudies/systems-games.ts',
      'src/data/caseStudies/fluxkit.ts',
      'src/data/caseStudies/ugc-operations-dashboard.ts',
      'scripts/technical-visuals/platforms.mjs',
    ]
    const forbidden = [
      /onrender\.com/i,
      /supabase\.co/i,
      /D:[\\/]/,
      /C:\\Users/,
      /Monarch/i,
      /gezpij/i,
      /bryiviuj/i,
      /w_moonbabe/i,
      /SK4mr1X|rK9PXhz/,
      /github\.com\/(Monarch|nawaazamien\/(atlas|anti-social-publisher|boat-jam|mars))/i,
      /eyJ[A-Za-z0-9_-]{10,}/,
    ]
    for (const file of files) {
      const text = readFileSync(join(process.cwd(), file), 'utf8')
      for (const pattern of forbidden) expect(text, `${file} ${pattern}`).not.toMatch(pattern)
    }
  })

  it('does not claim technologies the work does not use', () => {
    const all = JSON.stringify([projects, skills, coreStack, professionalStack, productStack])
    for (const claim of ['Laravel', 'Redis', 'Nginx', 'Terraform', 'Nomad', 'Consul', 'Vault']) {
      expect(all).not.toContain(claim)
    }
  })

  it('shows PHP as professional, not as a core product technology', () => {
    expect(professionalStack).toContain('PHP')
    expect(coreStack).not.toContain('PHP')
    expect(skills.flatMap((g) => g.items)).toContain('PHP')
    expect(productStack).not.toContain('PHP')
    expect(professionalStack).not.toContain('React')
    expect(professionalStack).not.toContain('TypeScript')
  })

  it('states Fluxkit and Publisher limits honestly', () => {
    const fluxkit = caseStudies.fluxkit.scopeNotes!.join(' ')
    expect(fluxkit).toMatch(/One working tool out of fifty-one/)
    expect(caseStudies.fluxkit.summary).toMatch(/one working tool/)
    const publisher = projects.find((p) => p.slug === 'anti-social-publisher')!
    expect(publisher.screenshots.some((i) => /mocked data/i.test(i.caption ?? ''))).toBe(true)
  })

  it('states what is pending in the Atlas and Publisher case studies', () => {
    const atlas = caseStudies.atlas.scopeNotes!.join(' ')
    expect(atlas).toMatch(/No production use/)
    const publisher = caseStudies['anti-social-publisher'].scopeNotes!.join(' ')
    expect(publisher).toMatch(/not a production multi-platform publisher/)
    expect(publisher).toMatch(/TikTok/)
  })
})
