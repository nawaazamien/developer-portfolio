import { projects } from '../data/projects'
import type { Project } from '../data/types'

/** Featured projects in display order. */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

/**
 * The only sanctioned way to read a project's repository link. Private
 * projects never expose it, even if the curated data contains one.
 */
export function getRepositoryUrl(project: Project): string | undefined {
  return project.visibility === 'public' ? project.repository?.url : undefined
}
