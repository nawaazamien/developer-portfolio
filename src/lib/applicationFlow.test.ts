import { describe, expect, it } from 'vitest'
import { PROJECT_PAGES } from '../data/projectSlugs'
import { projects } from '../data/projects'
import { caseStudyUrl, contactEmail, contactHref, publicLinks } from '../data/links'
import { identity } from '../data/identity'
import { homeMeta, projectMeta, renderHead } from '../seo/metadata'
import { DEFAULT_SITE_URL } from '../seo/site'
import { getProjects, getRepositoryUrl } from './projects'

describe('canonical links', () => {
  it('are https, public and consistent with the rest of the data', () => {
    for (const url of [
      publicLinks.github,
      publicLinks.portfolio,
      publicLinks.portfolioSource,
      publicLinks.saasFoundation.repository,
      publicLinks.saasFoundation.demo,
    ]) {
      expect(url).toMatch(/^https:\/\//)
    }
    expect(identity.githubUrl).toBe(publicLinks.github)
    expect(`${DEFAULT_SITE_URL}/`).toBe(publicLinks.portfolio)
  })

  it('builds case-study URLs that match the generated routes', () => {
    for (const page of PROJECT_PAGES) {
      expect(caseStudyUrl(page.slug)).toBe(`${DEFAULT_SITE_URL}/projects/${page.slug}/`)
    }
  })

  it('uses the single verified public contact address', () => {
    expect(contactHref).toBe(`mailto:${contactEmail}`)
    expect(contactEmail).toBe('nawaazamien9@gmail.com')
  })

  it('keeps the email out of structured data and the emitted head', () => {
    const site = DEFAULT_SITE_URL
    const heads = [homeMeta(site), ...PROJECT_PAGES.map((page) => projectMeta(page, site))]
    for (const meta of heads) {
      expect(renderHead(meta, site)).not.toContain(contactEmail)
    }
  })
})

describe('SaaS Foundation entry', () => {
  const project = projects.find((candidate) => candidate.slug === 'saas-foundation')!

  it('is the only public project, with repository and demo links', () => {
    expect(project.visibility).toBe('public')
    expect(getRepositoryUrl(project)).toBe(publicLinks.saasFoundation.repository)
    expect(project.liveUrl).toBe(publicLinks.saasFoundation.demo)
    expect(projects.filter((p) => p.visibility === 'public')).toHaveLength(1)
  })

  it('is featured second, after Anti Social Finance', () => {
    const featured = getProjects().filter((p) => p.featured).map((p) => p.slug)
    expect(featured.slice(0, 2)).toEqual(['anti-social-finance', 'saas-foundation'])
  })

  it('does not claim Supabase Auth or PostgREST testing', () => {
    const text = JSON.stringify(project).toLowerCase()
    expect(text).not.toMatch(/auth.*(tested|validated) (live|end-to-end)/)
  })
})
