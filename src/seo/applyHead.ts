import { renderHead, type PageMeta } from './metadata'
import { resolveSiteUrl } from './site'

export const SITE_URL = resolveSiteUrl(import.meta.env.VITE_SITE_URL)

function findExisting(node: Element): Element | null {
  const name = node.getAttribute('name')
  const property = node.getAttribute('property')
  if (name) return document.head.querySelector(`meta[name="${name}"]`)
  if (property) return document.head.querySelector(`meta[property="${property}"]`)
  if (node.tagName === 'LINK') return document.head.querySelector('link[rel="canonical"]')
  return null
}

/**
 * Keeps the live head in step with the current route during client-side
 * navigation. Crawlers and social scrapers read the static HTML emitted at
 * build time; this only keeps an open tab consistent.
 */
export function applyHead(meta: PageMeta) {
  const template = document.createElement('template')
  template.innerHTML = renderHead(meta, SITE_URL)

  document.title = meta.title
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove())
  if (!meta.noindex) document.head.querySelector('meta[name="robots"]')?.remove()

  template.content.querySelectorAll('meta, link, script').forEach((node) => {
    const existing = findExisting(node)
    if (existing) {
      existing.replaceWith(node)
    } else {
      document.head.append(node)
    }
  })
}
