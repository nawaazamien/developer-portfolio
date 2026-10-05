import type { Project } from '../data/types'

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

/** Returns a list of human-readable problems; empty means the data is valid. */
export function validateProjects(list: Project[]): string[] {
  const problems: string[] = []
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  if (!list.some((project) => project.featured)) {
    problems.push('No featured projects')
  }

  for (const project of list) {
    const label = project.id || '(missing id)'

    if (seenIds.has(project.id)) problems.push(`Duplicate id: ${label}`)
    if (seenSlugs.has(project.slug)) problems.push(`Duplicate slug: ${project.slug}`)
    seenIds.add(project.id)
    seenSlugs.add(project.slug)

    if (project.visibility === 'private' && project.repository) {
      problems.push(`${label}: private project must not set a repository`)
    }
    if (project.repository && !isHttpsUrl(project.repository.url)) {
      problems.push(`${label}: repository URL is not a valid https URL`)
    }
    if (project.liveUrl && !isHttpsUrl(project.liveUrl)) {
      problems.push(`${label}: liveUrl is not a valid https URL`)
    }

    const images = [...project.screenshots, ...(project.thumbnail ? [project.thumbnail] : [])]
    for (const image of images) {
      if (!image.src || !image.alt) {
        problems.push(`${label}: every image needs a src and alt text`)
      }
    }
  }

  return problems
}
