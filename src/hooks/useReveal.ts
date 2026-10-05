import { useEffect, useRef, useState } from 'react'

/**
 * Fades a section up the first time it scrolls into view. Pass `enabled=false`
 * for above-the-fold content that should render immediately.
 */
export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(
    () => !enabled || !('IntersectionObserver' in window),
  )

  useEffect(() => {
    const element = ref.current
    if (revealed || !element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [revealed])

  const className = enabled
    ? `reveal${revealed ? '' : ' reveal--hidden'}`
    : ''

  return { ref, className }
}
