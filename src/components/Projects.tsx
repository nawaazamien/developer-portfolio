import { useState } from 'react'
import type { ProjectCategory } from '../data/types'
import { useReveal } from '../hooks/useReveal'
import { CATEGORY_LABELS, getCategories, getProjects } from '../lib/projects'
import { ProjectCard } from './ProjectCard'
import './Projects.css'

const allProjects = getProjects()
const categories = getCategories(allProjects)

type Filter = ProjectCategory | 'all'

export function Projects() {
  const { ref, className } = useReveal<HTMLElement>()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = allProjects.filter(
    (project) => filter === 'all' || project.category === filter,
  )
  const featured = visible.filter((project) => project.featured)
  const additional = visible.filter((project) => !project.featured)

  const tabs: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...categories.map((value) => ({ value, label: CATEGORY_LABELS[value] })),
  ]

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
          Substantial software, <b>actively in development</b> — built and
          tested as real systems
        </p>
      </div>

      <div
        className="projects__tabs"
        role="group"
        aria-label="Filter projects by category"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className="projects__tab"
            aria-pressed={filter === tab.value}
            onClick={() => setFilter(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {featured.length > 0 && (
          <>
            <h3 className="projects__group-title">Featured</h3>
            <ul className="projects__featured">
              {featured.map((project, index) => (
                <li
                  key={project.id}
                  className={index === 0 ? 'projects__lead' : undefined}
                >
                  <ProjectCard
                    project={project}
                    variant={index === 0 ? 'lead' : 'standard'}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        {additional.length > 0 && (
          <>
            <h3 className="projects__group-title">More projects</h3>
            <ul className="projects__additional">
              {additional.map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} variant="compact" />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
