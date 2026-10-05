import {
  STRENGTH_LABELS,
  STRENGTH_LEVELS,
  additionalStack,
  coreStack,
  engineeringStrengths,
  type StrengthLevel,
} from '../data/engineering'
import './EngineeringStats.css'

/** Relative radius of each tier on the radar. These are positions, not scores. */
const TIER_RADIUS: Record<StrengthLevel, number> = { core: 1, strong: 0.76, working: 0.52 }

const CENTRE = { x: 160, y: 140 }
const RADIUS = 92
const LABEL_RADIUS = RADIUS + 20

function point(index: number, total: number, factor: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: CENTRE.x + Math.cos(angle) * RADIUS * factor,
    y: CENTRE.y + Math.sin(angle) * RADIUS * factor,
    cos: Math.cos(angle),
    sin: Math.sin(angle),
  }
}

const polygon = (factorFor: (index: number) => number) =>
  engineeringStrengths
    .map((_, index) => {
      const p = point(index, engineeringStrengths.length, factorFor(index))
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    .join(' ')

/**
 * Engineering strengths as qualitative tiers. A radar shows the shape on wide
 * screens; the list below is the text equivalent and becomes bars on narrow
 * screens. Both read from the same data.
 */
export function EngineeringStats() {
  const total = engineeringStrengths.length

  return (
    <div className="eng">
      <h3 className="subheading eng__title">Engineering strengths</h3>

      <svg
        className="eng__radar"
        viewBox="0 0 320 290"
        role="img"
        aria-label="Radar chart of engineering strengths. The same information is listed below."
      >
        {STRENGTH_LEVELS.map((level) => (
          <polygon
            key={level}
            className={`eng__ring eng__ring--${level}`}
            points={polygon(() => TIER_RADIUS[level])}
          />
        ))}
        {engineeringStrengths.map((_, index) => {
          const edge = point(index, total, 1)
          return (
            <line key={index} className="eng__spoke" x1={CENTRE.x} y1={CENTRE.y} x2={edge.x} y2={edge.y} />
          )
        })}
        <polygon
          className="eng__shape"
          points={polygon((index) => TIER_RADIUS[engineeringStrengths[index]!.level])}
        />
        {engineeringStrengths.map((strength, index) => {
          const dot = point(index, total, TIER_RADIUS[strength.level])
          const label = point(index, total, LABEL_RADIUS / RADIUS)
          const anchor = Math.abs(label.cos) < 0.3 ? 'middle' : label.cos > 0 ? 'start' : 'end'
          return (
            <g key={strength.id}>
              <circle className="eng__dot" cx={dot.x} cy={dot.y} r="3" />
              <text className="eng__label" x={label.x} y={label.y + (label.sin > 0.3 ? 8 : label.sin < -0.3 ? -2 : 4)} textAnchor={anchor}>
                {strength.shortLabel}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className="eng__list" aria-label="Engineering strengths by level">
        {engineeringStrengths.map((strength) => (
          <li key={strength.id} className={`eng__row eng__row--${strength.level}`}>
            <span className="eng__name">{strength.label}</span>
            <span className="eng__bar" aria-hidden="true">
              <span className="eng__fill" />
            </span>
            <span className="eng__level">{STRENGTH_LABELS[strength.level]}</span>
          </li>
        ))}
      </ul>
      <p className="eng__note">Self-assessed relative strength, not a test score.</p>
    </div>
  )
}

/** The technologies that are genuinely core, with supporting languages kept apart. */
export function CoreStack() {
  return (
      <div className="eng__stack">
        <h4 className="eng__stack-title">Core stack</h4>
        <ul className="tag-list" aria-label="Core stack">
          {coreStack.map((tech) => (
            <li key={tech} className="tag eng__tag">
              {tech}
            </li>
          ))}
        </ul>
        <p className="eng__additional">
          <span>Additional:</span> {additionalStack.join(' · ')}
        </p>
      </div>
  )
}
