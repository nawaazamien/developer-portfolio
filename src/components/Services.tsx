import { orbitTechnologies, services, stats } from '../data/services'
import { useReveal } from '../hooks/useReveal'
import { Media } from './Media'
import './Services.css'

const ORBIT_RADIUS = 40

function orbitPosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + Math.cos(angle) * ORBIT_RADIUS}%`,
    top: `${50 + Math.sin(angle) * ORBIT_RADIUS}%`,
  }
}

export function Services() {
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="services"
      className={`section services ${className}`}
      aria-labelledby="services-title"
    >
      <span className="circle services__circle" aria-hidden="true" />
      <div className="services__header">
        <h2 id="services-title" className="subheading services__label">
          Services
        </h2>
        <p className="services__tagline">
          <b>Craft unforgettable</b> and impactful websites,{' '}
          <b>web applications</b> and <b>mobile apps</b>
        </p>
      </div>

      <ul className="services__list">
        {services.map((service) => (
          <li key={service.id} className="services__item">
            <Media image={service.image} className="services__media" />
            <h3 className="services__title">{service.title}</h3>
            <p className="services__body">{service.body}</p>
            <ul className="tag-list">
              {service.tags.map((tag) => (
                <li key={tag} className="tag services__tag">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="services__integration">
        <div className="services__integration-copy">
          <h3 className="subheading">Integration</h3>
          <p className="services__integration-text">
            Striving to create innovative applications that connect cleanly with
            the tools teams already use.
          </p>
          <ul className="services__stats">
            {stats.map((stat) => (
              <li key={stat.label} className="services__stat">
                <span className="services__stat-value">{stat.value}</span>
                <span className="services__stat-label">{stat.label}</span>
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
