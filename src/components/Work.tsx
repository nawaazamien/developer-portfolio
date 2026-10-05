import { jobs, journey } from '../data/experience'
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
        {jobs.map((job) => (
          <li key={`${job.company}-${job.dates}`} className="work__job">
            <div className="work__cell">
              <span className="work__dates">{job.dates}</span>
              <span className="work__meta">{job.type}</span>
            </div>
            <div className="work__cell">
              <h3 className="work__company">{job.company}</h3>
              <span className="work__meta">{job.place}</span>
            </div>
            <div className="work__cell work__cell--wide">
              <span className="work__role">{job.role}</span>
              <p className="work__body">{job.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="subheading work__journey-title">Journey</h3>
      <p className="work__journey-intro">
        Two turning points that shaped how I work.
      </p>
      <ul className="work__journey">
        {journey.map((milestone) => (
          <li key={milestone.year} className="card work__milestone">
            <span className="work__year">{milestone.year}</span>
            <h4 className="work__milestone-title">[ {milestone.title} ]</h4>
            <p>{milestone.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
