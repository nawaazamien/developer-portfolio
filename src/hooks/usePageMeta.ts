import { useEffect } from 'react'
import { SITE_NAME } from '../data/projectSlugs'

export const DEFAULT_TITLE = `${SITE_NAME} — Software Engineer`
export const DEFAULT_DESCRIPTION =
  'Portfolio of Nawaaz Amien, a Cape Town software engineer building full-stack products, SaaS platforms, automation and developer tooling.'

function setDescription(content: string) {
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', content)
}

/** Sets the document title and meta description for the current route. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setDescription(description)
  }, [title, description])
}
