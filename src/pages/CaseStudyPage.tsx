import { Link, useParams } from 'react-router'
import { ArchitectureDiagram } from '../components/case-study/ArchitectureDiagram'
import { ScreenshotGallery } from '../components/case-study/ScreenshotGallery'
import { Media } from '../components/Media'
import { caseStudies } from '../data/caseStudies'
import { projectPageTitle } from '../data/projectSlugs'
import type { CaseStudy, Project } from '../data/types'
import { usePageMeta } from '../hooks/usePageMeta'
import { useRouteFocus } from '../hooks/useRouteFocus'
import {
  CATEGORY_LABELS,
  getProjects,
  getRepositoryUrl,
  getStatusLabel,
} from '../lib/projects'
import { NotFoundPage } from './NotFoundPage'
import './CaseStudyPage.css'

const allProjects = getProjects()

export function CaseStudyPage() {
  const { slug } = useParams()
  const index = allProjects.findIndex((project) => project.slug === slug)
  const project = allProjects[index]
  const study = project ? caseStudies[project.slug] : undefined

  if (!project || !study) return <NotFoundPage />

  return (
    <CaseStudyView
      project={project}
      study={study}
      previous={allProjects[index - 1]}
      next={allProjects[index + 1]}
    />
  )
}

interface CaseStudyViewProps {
  project: Project
  study: CaseStudy
  previous?: Project
  next?: Project
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="case__section" aria-labelledby={`case-${id}`}>
      <h2 id={`case-${id}`} className="case__heading">
        {title}
      </h2>
      {children}
    </section>
  )
}

function CaseStudyView({ project, study, previous, next }: CaseStudyViewProps) {
  usePageMeta(projectPageTitle(project.name), study.summary)
  const headingRef = useRouteFocus<HTMLHeadingElement>()

  const repositoryUrl = getRepositoryUrl(project)
  const heroImage = project.thumbnail ?? project.screenshots[0]
  const galleryImages = project.screenshots.filter(
    (image) => image.src !== heroImage?.src || project.screenshots.length === 1,
  )

  return (
    <main id="main" className="case">
      <nav className="case__crumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={{ pathname: '/', hash: '#projects' }}>Projects</Link>
          </li>
          <li aria-current="page">{project.name}</li>
        </ol>
      </nav>

      <header className="case__header">
        <p className="case__eyebrow">
          <span className="case__status">{getStatusLabel(project)}</span>
          <span>{CATEGORY_LABELS[project.category]}</span>
          <span>{project.projectType}</span>
        </p>
        <h1 ref={headingRef} tabIndex={-1} className="case__title">
          {project.name}
        </h1>
        <p className="case__summary">{study.summary}</p>
      </header>

      {heroImage && (
        <div className="case__hero">
          <Media image={heroImage} className="case__hero-media" />
        </div>
      )}

      <div className="case__layout">
        <div className="case__main">
          <Section id="overview" title="Overview">
            {study.overview.map((paragraph) => (
              <p key={paragraph} className="case__text">
                {paragraph}
              </p>
            ))}
          </Section>

          {(study.problem || study.goals) && (
            <Section id="problem" title="Problem and goals">
              {study.problem?.map((paragraph) => (
                <p key={paragraph} className="case__text">
                  {paragraph}
                </p>
              ))}
              {study.goals && (
                <ul className="case__list">
                  {study.goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          <Section id="built" title="What I built">
            <ul className="case__cards">
              {study.keyFeatures.map((feature) => (
                <li key={feature.title} className="card case__card">
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </li>
              ))}
            </ul>
          </Section>

          {study.architecture && (
            <Section id="architecture" title="Architecture">
              <p className="case__text">{study.architecture.summary}</p>
              {study.architecture.diagram && (
                <ArchitectureDiagram diagram={study.architecture.diagram} />
              )}
              {study.architecture.points && (
                <ul className="case__list">
                  {study.architecture.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          {study.engineeringChallenges && (
            <Section id="challenges" title="Engineering challenges">
              <ul className="case__cards">
                {study.engineeringChallenges.map((challenge) => (
                  <li key={challenge.title} className="card case__card">
                    <h3>{challenge.title}</h3>
                    <p>{challenge.body}</p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {study.technicalDecisions && (
            <Section id="decisions" title="Technical decisions">
              <dl className="case__decisions">
                {study.technicalDecisions.map((decision) => (
                  <div key={decision.title}>
                    <dt>{decision.title}</dt>
                    <dd>{decision.body}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {study.testing && (
            <Section id="testing" title="Testing and validation">
              <ul className="case__list">
                {study.testing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          <Section id="status" title="Current status">
            <p className="case__text">{study.currentStatus}</p>
            {study.scopeNotes && (
              <aside className="case__note" aria-label="Scope notes">
                <h3>Worth knowing</h3>
                <ul>
                  {study.scopeNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </aside>
            )}
          </Section>

          {study.lessons && (
            <Section id="lessons" title="What I took from it">
              <ul className="case__list">
                {study.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </Section>
          )}

          <Section id="screenshots" title="Screenshots">
            {galleryImages.length > 0 ? (
              <ScreenshotGallery images={galleryImages} projectName={project.name} />
            ) : (
              <p className="case__text case__text--muted">
                No screenshots of this project are published yet.
              </p>
            )}
          </Section>

          {study.credits && (
            <p className="case__credits">{study.credits.join(' ')}</p>
          )}
        </div>

        <aside className="case__aside" aria-label="Project facts">
          <h2 className="case__aside-title">At a glance</h2>
          <dl className="case__facts">
            <div>
              <dt>My role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{getStatusLabel(project)}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{CATEGORY_LABELS[project.category]}</dd>
            </div>
            <div>
              <dt>Repository</dt>
              <dd>
                {repositoryUrl ? (
                  <a href={repositoryUrl} target="_blank" rel="noreferrer">
                    View source
                  </a>
                ) : (
                  <span className="case__private">Private repository</span>
                )}
              </dd>
            </div>
            {project.liveUrl && (
              <div>
                <dt>Live</dt>
                <dd>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Open site
                  </a>
                </dd>
              </div>
            )}
          </dl>
          <h3 className="case__aside-subtitle">Technologies</h3>
          <ul className="tag-list">
            {project.technologies.map((tech) => (
              <li key={tech} className="tag case__tag">
                {tech}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <nav className="case__pager" aria-label="More projects">
        {previous ? (
          <Link to={`/projects/${previous.slug}`} rel="prev">
            <span className="case__pager-label">Previous project</span>
            <span className="case__pager-name">{previous.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/projects/${next.slug}`} rel="next" className="case__pager-next">
            <span className="case__pager-label">Next project</span>
            <span className="case__pager-name">{next.name}</span>
          </Link>
        ) : (
          <Link to={{ pathname: '/', hash: '#projects' }} className="case__pager-next">
            <span className="case__pager-label">Back to</span>
            <span className="case__pager-name">All projects</span>
          </Link>
        )}
      </nav>
    </main>
  )
}
