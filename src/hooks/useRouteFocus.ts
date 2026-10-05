import { useEffect, useRef } from 'react'

let firstPageRendered = false

/**
 * Returns a ref for a page's main heading. After a client-side navigation the
 * heading receives focus, so keyboard and screen-reader users are not left on
 * an element from the previous page. The very first page load is left alone.
 */
export function useRouteFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (firstPageRendered) {
      ref.current?.focus({ preventScroll: true })
    }
    firstPageRendered = true
  }, [])

  return ref
}
