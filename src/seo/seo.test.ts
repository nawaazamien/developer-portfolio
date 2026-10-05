import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { credits } from '../data/credits'
import { identity } from '../data/identity'
import { PROJECT_PAGES, projectPageTitle } from '../data/projectSlugs'
import {
  buildRobots,
  buildSitemap,
  creditsMeta,
  homeMeta,
  notFoundMeta,
  projectMeta,
  renderHead,
  sitemapPaths,
} from './metadata'
import { DEFAULT_SITE_URL, resolveSiteUrl } from './site'

const SITE = 'https://example.test/portfolio'
const publicDir = join(process.cwd(), 'public')

const allMeta = () => [
  homeMeta(SITE),
  ...PROJECT_PAGES.map((page) => projectMeta(page, SITE)),
  creditsMeta(),
]

describe('site url', () => {
  it('defaults to the production Pages URL and strips trailing slashes', () => {
    expect(resolveSiteUrl()).toBe(DEFAULT_SITE_URL)
    expect(resolveSiteUrl('https://example.org/')).toBe('https://example.org')
    expect(resolveSiteUrl('  ')).toBe(DEFAULT_SITE_URL)
  })
})

describe('page metadata', () => {
  it('gives every project a specific title and description', () => {
    const descriptions = new Set<string>()
    for (const page of PROJECT_PAGES) {
      const meta = projectMeta(page, SITE)
      expect(meta.title).toBe(projectPageTitle(page.name))
      expect(meta.description.length).toBeGreaterThan(80)
      expect(meta.description.length).toBeLessThanOrEqual(170)
      expect(meta.description).not.toContain('Case study of')
      descriptions.add(meta.description)
    }
    expect(descriptions.size).toBe(PROJECT_PAGES.length)
  })

  it('renders canonical, Open Graph and Twitter tags for every page', () => {
    for (const meta of allMeta()) {
      const head = renderHead(meta, SITE)
      expect(head).toContain(`<title>`)
      expect(head).toContain(`<link rel="canonical" href="${SITE}${meta.path}" />`)
      for (const tag of [
        'og:title',
        'og:description',
        'og:type',
        'og:url',
        'og:image"',
        'og:site_name',
        'twitter:card" content="summary_large_image"',
        'twitter:title',
        'twitter:description',
        'twitter:image"',
      ]) {
        expect(head).toContain(tag)
      }
      expect(head).toContain(`content="${SITE}/${meta.image}"`)
    }
  })

  it('has a social image on disk for every page', () => {
    for (const meta of allMeta()) {
      expect(existsSync(join(publicDir, meta.image))).toBe(true)
    }
    for (const page of PROJECT_PAGES) {
      expect(existsSync(join(publicDir, `social/${page.slug}.jpg`))).toBe(true)
    }
  })

  it('marks the not-found page noindex', () => {
    expect(renderHead(notFoundMeta(), SITE)).toContain('name="robots" content="noindex"')
    expect(renderHead(homeMeta(SITE), SITE)).not.toContain('noindex')
  })
})

describe('sitemap and robots', () => {
  it('lists the homepage and every case study with canonical URLs only', () => {
    const xml = buildSitemap(SITE)
    expect(xml).toContain(`<loc>${SITE}/</loc>`)
    for (const page of PROJECT_PAGES) {
      expect(xml).toContain(`<loc>${SITE}/projects/${page.slug}/</loc>`)
    }
    expect(xml).not.toContain('#')
    expect(xml).not.toContain('404')
    expect(sitemapPaths().filter((path) => path.startsWith('/projects/'))).toHaveLength(PROJECT_PAGES.length)
  })

  it('points robots.txt at the sitemap', () => {
    const robots = buildRobots(SITE)
    expect(robots).toContain('Allow: /')
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  })
})

describe('structured data', () => {
  it('describes only verified public facts about the person', () => {
    const [person] = homeMeta(SITE).jsonLd
    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('Nawaaz Amien')
    expect(person.jobTitle).toBe('Software Engineer')
    expect(person.sameAs).toEqual([identity.githubUrl])
    const json = JSON.stringify(person)
    expect(json).not.toMatch(/@[a-z0-9-]+\.[a-z]{2,}/i)
    expect(json).not.toMatch(/telephone|email|linkedin/i)
  })

  it('uses a conservative schema type per project and no invented facts', () => {
    for (const page of PROJECT_PAGES) {
      const [work, breadcrumbs] = projectMeta(page, SITE).jsonLd
      expect(work['@type']).toBe(page.schemaType)
      expect(breadcrumbs['@type']).toBe('BreadcrumbList')
      const json = JSON.stringify(work)
      expect(json).not.toMatch(/aggregateRating|offers|price|downloadUrl|operatingSystem|datePublished/)
    }
    const trader = PROJECT_PAGES.find((page) => page.slug === 'anti-social-trader')!
    expect(trader.schemaType).toBe('CreativeWork')
  })

  it('exposes no repository URLs in any emitted metadata', () => {
    for (const meta of allMeta()) {
      const head = renderHead(meta, SITE)
      const urls = head.match(/https:\/\/github\.com\/[^"\\\s]*/g) ?? []
      expect(urls.every((url) => url === identity.githubUrl)).toBe(true)
    }
  })

  it('escapes script-breaking characters in JSON-LD', () => {
    const head = renderHead(
      { ...homeMeta(SITE), jsonLd: [{ name: '</script><b>' }] },
      SITE,
    )
    expect(head).not.toContain('</script><b>')
  })
})

describe('credits', () => {
  it('credits the third-party assets that appear on the site', () => {
    const names = credits.map((credit) => credit.name)
    expect(names).toContain('Tiny Swords')
    expect(names).toContain('Meshy')
    for (const credit of credits) expect(credit.url).toMatch(/^https:\/\//)
    expect(creditsMeta().title).toContain('Credits')
  })
})
