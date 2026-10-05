import { identity } from '../data/identity.ts'
import {
  PROJECT_PAGES,
  projectPageTitle,
  SITE_NAME,
  type ProjectPage,
} from '../data/projectSlugs.ts'

export const HOME_TITLE = `${SITE_NAME} — Software Engineer`
export const HOME_DESCRIPTION =
  'Portfolio of Nawaaz Amien, a Cape Town software engineer building full-stack products, SaaS platforms, automation and developer tooling.'
export const CREDITS_DESCRIPTION =
  'Credits and licences for third-party assets, tools and fonts used by projects shown in this portfolio.'

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const

type JsonLd = Record<string, unknown>

export interface PageMeta {
  title: string
  description: string
  /** Route path under the site URL, always with leading and trailing slash. */
  path: string
  /** Social image path relative to the site URL. */
  image: string
  imageAlt: string
  noindex?: boolean
  jsonLd: JsonLd[]
}

export function absoluteUrl(siteUrl: string, path: string): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

const personRef = (siteUrl: string): JsonLd => ({
  '@type': 'Person',
  name: identity.name,
  url: `${siteUrl}/`,
})

function personJsonLd(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    jobTitle: identity.jobTitle,
    url: `${siteUrl}/`,
    sameAs: [identity.githubUrl],
    alumniOf: { '@type': 'CollegeOrUniversity', name: identity.alumniOf },
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.city,
      addressCountry: identity.countryCode,
    },
  }
}

function projectJsonLd(page: ProjectPage, siteUrl: string): JsonLd[] {
  const url = absoluteUrl(siteUrl, `/projects/${page.slug}/`)
  const work: JsonLd = {
    '@context': 'https://schema.org',
    '@type': page.schemaType,
    name: page.name,
    description: page.description,
    url,
    author: personRef(siteUrl),
    ...(page.schemaType === 'SoftwareApplication' && page.applicationCategory
      ? { applicationCategory: page.applicationCategory }
      : { genre: page.category }),
  }
  const breadcrumbs: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/#projects` },
      { '@type': 'ListItem', position: 3, name: page.name, item: url },
    ],
  }
  return [work, breadcrumbs]
}

export function homeMeta(siteUrl: string): PageMeta {
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
    image: 'social/home.jpg',
    imageAlt: `${SITE_NAME} — Software Engineer. Portfolio social preview card.`,
    jsonLd: [personJsonLd(siteUrl)],
  }
}

export function projectMeta(page: ProjectPage, siteUrl: string): PageMeta {
  return {
    title: projectPageTitle(page.name),
    description: page.description,
    path: `/projects/${page.slug}/`,
    image: `social/${page.slug}.jpg`,
    imageAlt: `${page.name} — ${page.tagline}. Social preview card.`,
    jsonLd: projectJsonLd(page, siteUrl),
  }
}

export function creditsMeta(): PageMeta {
  return {
    title: `Credits and licences — ${SITE_NAME}`,
    description: CREDITS_DESCRIPTION,
    path: '/credits/',
    image: 'social/home.jpg',
    imageAlt: `${SITE_NAME} — Software Engineer. Portfolio social preview card.`,
    jsonLd: [],
  }
}

export function notFoundMeta(): PageMeta {
  return {
    title: `Page not found — ${SITE_NAME}`,
    description: 'This page does not exist.',
    path: '/',
    image: 'social/home.jpg',
    imageAlt: `${SITE_NAME} — Software Engineer. Portfolio social preview card.`,
    noindex: true,
    jsonLd: [],
  }
}

export function metaForSlug(slug: string, siteUrl: string): PageMeta | undefined {
  const page = PROJECT_PAGES.find((candidate) => candidate.slug === slug)
  return page ? projectMeta(page, siteUrl) : undefined
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** JSON for an inline script: the less-than sign is escaped so it cannot close the tag. */
export const serialiseJsonLd = (data: JsonLd) =>
  JSON.stringify(data).replace(/</g, '\\u003c')

/** The SEO block placed in the head: title, description, canonical, social, JSON-LD. */
export function renderHead(meta: PageMeta, siteUrl: string): string {
  const url = absoluteUrl(siteUrl, meta.path)
  const image = absoluteUrl(siteUrl, meta.image)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const alt = escapeHtml(meta.imageAlt)
  const lines = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : '',
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${SOCIAL_IMAGE_SIZE.width}" />`,
    `<meta property="og:image:height" content="${SOCIAL_IMAGE_SIZE.height}" />`,
    `<meta property="og:image:alt" content="${alt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${alt}" />`,
    ...meta.jsonLd.map(
      (data) => `<script type="application/ld+json">${serialiseJsonLd(data)}</script>`,
    ),
  ]
  return lines.filter(Boolean).join('\n    ')
}

/** Every indexable URL, in sitemap order. */
export function sitemapPaths(): string[] {
  return ['/', ...PROJECT_PAGES.map((page) => `/projects/${page.slug}/`), '/credits/']
}

export function buildSitemap(siteUrl: string): string {
  const urls = sitemapPaths()
    .map((path) => `  <url><loc>${absoluteUrl(siteUrl, path)}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}
