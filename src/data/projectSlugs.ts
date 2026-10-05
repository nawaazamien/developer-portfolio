/**
 * Single registry of project routes. The build reads it (no asset imports, so
 * it is safe to load from vite.config.ts) to emit one static HTML entry per
 * case study, and a test keeps it in step with `projects.ts`.
 */
export const PROJECT_PAGES = [
  { slug: 'anti-social-finance', name: 'Anti Social Finance' },
  { slug: 'anti-social-trader', name: 'Anti Social Trader' },
  { slug: 'pet-platform', name: 'Pet Platform' },
  { slug: 'youtube-automation', name: 'YouTube Automation' },
  { slug: 'warmup', name: 'Warmup' },
  { slug: 'tiny-mobile-tower', name: 'Tiny Mobile Tower' },
  { slug: 'kingdom-incremental', name: 'Kingdom Incremental' },
  { slug: 'tiny-swords-endless-survivor', name: 'Tiny Swords — Endless Survivor' },
  { slug: 'castle-hold', name: 'Castle Hold' },
  { slug: 'dominoes', name: 'Dominoes' },
] as const

export type ProjectSlug = (typeof PROJECT_PAGES)[number]['slug']

export const PROJECT_SLUGS: readonly ProjectSlug[] = PROJECT_PAGES.map(
  (page) => page.slug,
)

export const SITE_NAME = 'Nawaaz Amien'

export function projectPageTitle(name: string): string {
  return `${name} — ${SITE_NAME}`
}
