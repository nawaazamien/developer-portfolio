/** The production site URL (origin + base path, no trailing slash). */
export const DEFAULT_SITE_URL = 'https://nawaazamien.github.io/developer-portfolio'

/**
 * Normalises a site URL. CI passes the value reported by GitHub Pages, so a
 * custom domain later needs no code change; local builds fall back to the
 * Pages URL.
 */
export function resolveSiteUrl(raw?: string): string {
  const value = (raw ?? '').trim()
  return (value || DEFAULT_SITE_URL).replace(/\/+$/, '')
}
