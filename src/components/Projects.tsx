import { useState } from 'react'
import { awards } from '../data/services'
import { useReveal } from '../hooks/useReveal'
import { getFeaturedProjects } from '../lib/projects'
import { Media } from './Media'
import './Projects.css'

const featuredProjects = getFeaturedProjects()

export function Projects() {
  const { ref, className } = useReveal<HTMLElement>()
  const [activeId, setActiveId] = useState(featuredProjects[0]?.id)
  const project =
    featuredProjects.find((item) => item.id === activeId) ?? featuredProjects[0]

  return (
    <section
      ref={ref}
      id="projects"
      className={`section projects ${className}`}
      aria-labelledby="projects-title"
    >
      <div className="projects__header">
        <h2 id="projects-title" className="subheading projects__label">
          Projects
        </h2>
        <p className="projects__tagline">
          User-centered development <b>enhances productivity</b> and drives
          revenue growth
        </p>
      </div>

      {project && (
        <>
          <div className="projects__tabs" role="group" aria-label="Select a project">
            {featuredProjects.map((item) => (
              <button
                key={item.id}
                type="button"
                className="projects__tab"
                aria-pressed={item.id === project.id}
                onClick={() => setActiveId(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <Media
            image={project.thumbnail ?? project.screenshots[0]}
            className="projects__media"
          />

          <div className="projects__detail" aria-live="polite">
            <p className="projects__description">
              <b>{project.name}</b> — {project.shortDescription}
            </p>
            <ul className="tag-list projects__tags" aria-label="Technologies">
              {project.technologies.map((tech) => (
                <li key={tech} className="tag projects__tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <h3 className="subheading projects__recognition-title">
        Testimonials &amp; Recognitions
      </h3>
      <p className="projects__recognition-intro">
        Certificates and awards collected along the way.
      </p>
      <ul className="projects__awards">
        {awards.map((award) => (
          <li key={award.id} className="projects__award">
            <div className="projects__certificate">
              <Media image={award.image} />
            </div>
            <h4>{award.title}</h4>
            <p>{award.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
