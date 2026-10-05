export type ProjectStatus =
  | 'planning'
  | 'active'
  | 'beta'
  | 'production'
  | 'completed'
  | 'archived'

export type ProjectVisibility = 'public' | 'private'

export interface ImageAsset {
  src: string
  alt: string
}

export interface CaseStudy {
  summary: string
  challenges: string[]
  architecture?: string
}

export interface Project {
  id: string
  slug: string
  name: string
  shortDescription: string
  longDescription?: string
  category: string
  projectType: string
  status: ProjectStatus
  featured: boolean
  visibility: ProjectVisibility
  technologies: string[]
  /**
   * Source repository. Never read this directly in UI code — use
   * `getRepositoryUrl` from `lib/projects`, which hides it for private projects.
   */
  repository?: { url: string }
  liveUrl?: string
  screenshots: ImageAsset[]
  thumbnail?: ImageAsset
  /** ISO 8601 dates. */
  startDate?: string
  completionDate?: string
  latestMilestone?: string
  highlights: string[]
  caseStudy?: CaseStudy
  displayOrder: number
}

export interface SocialLink {
  name: string
  short: string
  /** Links without a URL are not rendered until one is supplied. */
  href?: string
}

export interface Fact {
  label: string
  value: string
}

export interface Capability {
  title: string
  body: string
}

export interface Job {
  dates: string
  type: string
  company: string
  place: string
  role: string
  body: string
}

export interface Milestone {
  year: string
  title: string
  body: string
}

export interface Service extends Capability {
  id: string
  tags: string[]
  image?: ImageAsset
}

export interface Stat {
  value: string
  label: string
}

export interface Award extends Capability {
  id: string
  image?: ImageAsset
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  initials: string
  roleLabel: string
  intro: string
  about: string
  portrait?: ImageAsset
  email: string
  phone: string
  location: string
}
