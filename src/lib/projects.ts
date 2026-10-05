import { projects } from '../data/projects'
import type {
  Project,
  ProjectCategory,
  ProjectStatus,
  Stat,
} from '../data/types'

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  saas: 'SaaS',
  'full-stack': 'Full Stack',
  'data-research': 'Data / Research',
  automation: 'Automation',
  interactive: 'Interactive / Game',
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planning',
  active: 'Active development',
  beta: 'Beta',
  production: 'In production',
  completed: 'Completed',
  archived: 'Archived',
}

function byDisplayOrder(a: Project, b: Project) {
  return a.displayOrder - b.displayOrder
}

export function getProjects(): Project[] {
  return [...projects].sort(byDisplayOrder)
}

export function getStatusLabel(project: Project): string {
  return project.statusLabel ?? STATUS_LABELS[project.status]
}

/** Categories that actually have projects, in the order they first appear. */
export function getCategories(list: Project[]): ProjectCategory[] {
  return [...new Set(list.map((project) => project.category))]
}

/**
 * The only sanctioned way to read a project's repository link. Private
 * projects never expose it, even if the curated data contains one.
 */
export function getRepositoryUrl(project: Project): string | undefined {
  return project.visibility === 'public' ? project.repository?.url : undefined
}

/** Counts derived from the dataset, so they can never drift from it. */
export function getPortfolioStats(list: Project[]): Stat[] {
  const featured = list.filter((project) => project.featured).length
  const technologies = new Set(list.flatMap((project) => project.technologies))
  const active = list.filter((project) => project.status === 'active').length

  return [
    { value: String(featured), label: 'Featured products' },
    { value: String(list.length - featured), label: 'Additional projects' },
    { value: String(active), label: 'In active development' },
    { value: String(technologies.size), label: 'Technologies used' },
  ]
}
