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
        <p className="about__text">{profile.about}</p>
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
        {skills.map((skill) => (
          <li key={skill.title} className="card about__skill">
            <h3>{skill.title}</h3>
            <p>{skill.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
