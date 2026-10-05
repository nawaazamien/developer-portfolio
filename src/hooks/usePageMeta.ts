import { useEffect } from 'react'
import { applyHead } from '../seo/applyHead'
import type { PageMeta } from '../seo/metadata'

/** Applies a route's title, description, canonical and social tags. Pass a stable object. */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    applyHead(meta)
  }, [meta])
}
