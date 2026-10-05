import { facts, profile, skills } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import './About.css'

export function About() {
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="about"
      className={`section about ${className}`}
      aria-labelledby="about-title"
    >
      <div className="about__intro">
        <h2 id="about-title" className="section__heading">
          About
        </h2>
        {profile.about.map((paragraph) => (
          <p key={paragraph} className="about__text">
            {paragraph}
          </p>
        ))}
        <dl className="about__facts">
          {facts.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="about__skills">
        {skills.map((group) => (
          <li key={group.title} className="card about__skill">
            <h3>{group.title}</h3>
            <p>{group.items.join(' · ')}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
