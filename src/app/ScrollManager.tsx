import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

/**
 * Scroll behaviour for client-side navigation: hash links scroll to their
 * section (and move focus there), new pages start at the top, and browser
 * back/forward keeps the position the browser restores.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const isFirstRender = useRef(true)

  useEffect(() => {
    const first = isFirstRender.current
    isFirstRender.current = false

    if (hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (!target) return
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.scrollIntoView()
        target.focus({ preventScroll: true })
      })
      return () => cancelAnimationFrame(frame)
    }

    if (!first && navigationType !== 'POP') window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}
