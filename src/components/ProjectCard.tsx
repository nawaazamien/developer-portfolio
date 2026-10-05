import { Link } from 'react-router'
import type { Project } from '../data/types'
import { CATEGORY_LABELS, getRepositoryUrl, getStatusLabel } from '../lib/projects'
import { Media } from './Media'
import './ProjectCard.css'

export type ProjectCardVariant = 'lead' | 'standard' | 'compact'

interface ProjectCardProps {
  project: Project
  variant: ProjectCardVariant
}

function LockIcon() {
  return (
    <svg
      className="project-card__lock"
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z"
      />
    </svg>
  )
}

export function ProjectCard({ project, variant }: ProjectCardProps) {
  const repositoryUrl = getRepositoryUrl(project)
  const showHighlights = variant !== 'compact' && project.highlights.length > 0
  const image = project.thumbnail ?? project.screenshots[0]
  // Compact cards only get a media strip when a real image exists.
  const showMedia = variant !== 'compact' || Boolean(image)

  return (
    <article className={`card project-card project-card--${variant}`}>
      {showMedia && (
        <Media
          image={image}
          label={project.name}
          className="project-card__media"
        />
      )}
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__status">{getStatusLabel(project)}</span>
          <span className="project-card__category">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
        <h4 className="project-card__title">{project.name}</h4>
        <p className="project-card__type">{project.projectType}</p>
        <p className="project-card__description">{project.shortDescription}</p>
        {showHighlights && (
          <ul className="project-card__highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
        <ul className="tag-list project-card__tags" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="tag project-card__tag">
              {tech}
            </li>
          ))}
        </ul>
        <div className="project-card__links">
          <Link
            className="project-card__case"
            to={`/projects/${project.slug}`}
            aria-label={`View case study: ${project.name}`}
          >
            View case study <span aria-hidden="true">→</span>
          </Link>
          {repositoryUrl ? (
            <a
              className="project-card__link"
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              View source
            </a>
          ) : (
            <span className="project-card__private">
              <LockIcon />
              Private repository
            </span>
          )}
          {project.liveUrl && (
            <a
              className="project-card__link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live site
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
