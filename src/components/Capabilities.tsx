import { capabilities, getAtAGlance } from '../data/engineering'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { CapabilityGlyph } from './CapabilityGlyph'
import { CoreStack, EngineeringStats } from './EngineeringStats'
import './Capabilities.css'

const stats = getAtAGlance(projects)

export function Capabilities() {
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="capabilities"
      className={`section capabilities ${className}`}
      aria-labelledby="capabilities-title"
    >
      <span className="circle capabilities__circle" aria-hidden="true" />
      <div className="capabilities__header">
        <h2 id="capabilities-title" className="subheading capabilities__label">
          What I build
        </h2>
        <p className="capabilities__tagline">
          <b>Real products</b> and systems, built <b>end to end</b> — from the
          data model to the interface
        </p>
      </div>

      <ul className="capabilities__list">
        {capabilities.map((capability, index) => (
          <li key={capability.id} className="card capability">
            <span className="capability__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <CapabilityGlyph id={capability.id} />
            <h3 className="capability__title">{capability.title}</h3>
            <p className="capability__body">{capability.description}</p>
            <ul className="tag-list capability__tags" aria-label="Technologies">
              {capability.technologies.map((tag) => (
                <li key={tag} className="tag capability__tag">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="capabilities__overview">
        <div className="capabilities__overview-copy">
          <h3 className="subheading">At a glance</h3>
          <p className="capabilities__overview-text">
            Counted from this portfolio’s own data, plus the Lighthouse audit of
            its published pages.
          </p>
          <ul className="capabilities__stats">
            {stats.map((stat) => (
              <li key={stat.label} className="capabilities__stat">
                <span className="capabilities__stat-value">{stat.value}</span>
                <span className="capabilities__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
          <CoreStack />
        </div>

        <EngineeringStats />
      </div>
    </section>
  )
}
