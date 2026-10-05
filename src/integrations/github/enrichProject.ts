import type { Project } from '../../data/types'
import type { RepositoryActivity } from './types'

/**
 * Layers GitHub-derived activity over a curated project. Curated values win;
 * activity only fills gaps. Repository URLs and release links are applied to
 * public projects only, so a private project can never gain a link here.
 */
export function enrichProject(
  project: Project,
  activity: RepositoryActivity | undefined,
): Project {
  if (!activity || activity.projectId !== project.id) return project

  const isPublic = project.visibility === 'public'

  return {
    ...project,
    liveUrl: project.liveUrl ?? activity.homepageUrl,
    repository:
      isPublic && !project.repository && activity.repositoryUrl
        ? { url: activity.repositoryUrl }
        : project.repository,
    latestMilestone:
      project.latestMilestone ??
      (isPublic ? activity.latestRelease?.tag : undefined),
  }
}
