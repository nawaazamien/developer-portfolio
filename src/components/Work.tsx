import { education, experience } from '../data/experience'
import { useReveal } from '../hooks/useReveal'
import './Work.css'

export function Work() {
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="work"
      className={`section work ${className}`}
      aria-labelledby="work-title"
    >
      <span className="circle work__circle" aria-hidden="true" />
      <h2 id="work-title" className="section__heading work__title">
        Work
      </h2>
      <ol className="work__jobs">
        {experience.map((entry) => (
          <li key={entry.heading} className="work__job">
            <div className="work__cell">
              <span className="work__dates">{entry.period}</span>
              <span className="work__meta">{entry.periodNote}</span>
            </div>
            <div className="work__cell">
              <h3 className="work__company">{entry.heading}</h3>
              <span className="work__meta">{entry.headingNote}</span>
            </div>
            <div className="work__cell work__cell--wide">
              <span className="work__role">{entry.role}</span>
              <p className="work__body">{entry.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="subheading work__education-title">Education</h3>
      <p className="work__education-intro">
        Studied at Cape Peninsula University of Technology.
      </p>
      <ul className="work__education">
        {education.map((entry) => (
          <li key={entry.qualification} className="card work__qualification">
            <span className="work__level">{entry.qualification}</span>
            <h4 className="work__qualification-title">[ {entry.field} ]</h4>
            <p>{entry.institution}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
