import { projects } from '../data/projects'
import { orbitTechnologies, services } from '../data/services'
import { useReveal } from '../hooks/useReveal'
import { getPortfolioStats } from '../lib/projects'
import { Media } from './Media'
import './Capabilities.css'

const ORBIT_RADIUS = 40
const stats = getPortfolioStats(projects)

function orbitPosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + Math.cos(angle) * ORBIT_RADIUS}%`,
    top: `${50 + Math.sin(angle) * ORBIT_RADIUS}%`,
  }
}

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
        {services.map((service, index) => (
          <li key={service.id} className="capabilities__item">
            <Media
              image={service.image}
              label={String(index + 1).padStart(2, '0')}
              className="capabilities__media"
            />
            <h3 className="capabilities__title">{service.title}</h3>
            <p className="capabilities__body">{service.body}</p>
            <ul className="tag-list">
              {service.tags.map((tag) => (
                <li key={tag} className="tag capabilities__tag">
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
            A summary counted directly from the projects listed in this
            portfolio.
          </p>
          <ul className="capabilities__stats">
            {stats.map((stat) => (
              <li key={stat.label} className="capabilities__stat">
                <span className="capabilities__stat-value">{stat.value}</span>
                <span className="capabilities__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="orbit">
          <div className="orbit__ring" aria-hidden="true" />
          <div className="orbit__ring orbit__ring--inner" aria-hidden="true" />
          <div className="orbit__core">Stack</div>
          <ul className="orbit__list" aria-label="Technologies">
            {orbitTechnologies.map((name, index) => (
              <li
                key={name}
                className="orbit__chip"
                style={orbitPosition(index, orbitTechnologies.length)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
