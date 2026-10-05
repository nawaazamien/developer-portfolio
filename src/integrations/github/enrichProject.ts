import type { Project } from '../../data/types'
import type { RepositoryActivity } from './types'

/**
 * Layers repository activity over a curated project. Curated values always
 * win; activity only fills gaps. Private projects take nothing from
 * repository data beyond non-identifying fields, so nothing leaks.
 */
export function enrichProject(
  project: Project,
  activity: RepositoryActivity | undefined,
): Project {
  if (!activity) return project

  return {
    ...project,
    liveUrl: project.liveUrl ?? activity.homepageUrl,
    latestMilestone:
      project.latestMilestone ??
      (project.visibility === 'public' ? activity.latestRelease?.tag : undefined),
  }
}
