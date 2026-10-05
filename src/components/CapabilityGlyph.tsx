import type { Capability } from '../data/engineering'

/*
 * Small abstract line drawings, one per capability. They are decoration only,
 * so they are hidden from assistive technology.
 */
const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function CapabilityGlyph({ id }: { id: Capability['id'] }) {
  return (
    <svg
      className="capability__glyph"
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      focusable="false"
      {...common}
    >
      {id === 'full-stack' && (
        <>
          <rect x="10" y="10" width="34" height="22" rx="2" />
          <path d="M10 17h34" />
          <rect x="20" y="24" width="34" height="22" rx="2" />
          <path d="M30 54h24M30 58h14" />
        </>
      )}
      {id === 'saas-backend' && (
        <>
          <rect x="8" y="8" width="48" height="48" rx="3" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="6" />
          <circle cx="18" cy="18" r="3" />
          <circle cx="46" cy="18" r="3" />
          <circle cx="32" cy="48" r="3" />
          <path d="M20 20l8 8M44 20l-8 8M32 38v7" />
        </>
      )}
      {id === 'automation' && (
        <>
          <circle cx="10" cy="32" r="4" />
          <rect x="24" y="26" width="12" height="12" rx="2" />
          <circle cx="54" cy="32" r="4" />
          <path d="M14 32h8M36 32h14M46 28l4 4-4 4" />
          <path d="M30 20v-6M30 44v6" strokeDasharray="2 3" />
        </>
      )}
      {id === 'interactive' && (
        <>
          {[14, 32, 50].flatMap((x) => [14, 32, 50].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />))}
          <path d="M14 50L32 50L32 32L50 32L50 14" />
          <circle cx="14" cy="50" r="4" />
          <circle cx="50" cy="14" r="4" />
        </>
      )}
    </svg>
  )
}
