import type { ProjectSlug } from './projectSlugs'

export type ProjectStatus =
  | 'planning'
  | 'active'
  | 'beta'
  | 'production'
  | 'completed'
  | 'archived'

export type ProjectVisibility = 'public' | 'private'

export type ProjectCategory =
  | 'saas'
  | 'full-stack'
  | 'data-research'
  | 'automation'
  | 'interactive'

export interface ImageAsset {
  src: string
  /** Describes the image for people who cannot see it. Required. */
  alt: string
  caption?: string
  /** `contain` shows diagrams whole instead of cropping them to the slot. */
  fit?: 'cover' | 'contain'
  /** Intrinsic size in pixels; lets the browser reserve space. */
  width: number
  height: number
}

export interface TitledText {
  title: string
  body: string
}

/** A node in an architecture diagram; `children` branch out beneath it. */
export interface DiagramNode {
  label: string
  note?: string
  children?: DiagramNode[]
}

export interface ArchitectureDiagram {
  title: string
  /** Plain-language equivalent for people who cannot see the diagram. */
  description: string
  /** Stages from top to bottom. */
  flow: DiagramNode[]
}

/**
 * Structured case-study content. Everything but the core fields is optional so
 * a concise study and a deep one share one page template.
 */
export interface CaseStudy {
  summary: string
  role: string
  overview: string[]
  problem?: string[]
  goals?: string[]
  keyFeatures: TitledText[]
  architecture?: {
    summary: string
    points?: string[]
    diagram?: ArchitectureDiagram
  }
  engineeringChallenges?: TitledText[]
  technicalDecisions?: TitledText[]
  testing?: string[]
  currentStatus: string
  lessons?: string[]
  /** Honest scope limits, e.g. "research system — no live trading". */
  scopeNotes?: string[]
  credits?: string[]
}

/**
 * Curated project record. Everything here is written by hand; values that a
 * GitHub sync can derive (last push, language, releases) live in
 * `RepositoryActivity` and are layered on with `enrichProject`.
 */
export interface Project {
  id: string
  slug: ProjectSlug
  name: string
  shortDescription: string
  longDescription?: string
  category: ProjectCategory
  /** Free-text product type shown on the card, e.g. "Accounting SaaS". */
  projectType: string
  status: ProjectStatus
  /** Overrides the default label for `status`, e.g. "Active research". */
  statusLabel?: string
  featured: boolean
  visibility: ProjectVisibility
  technologies: string[]
  /**
   * Public source repository only. Private projects must not set this —
   * `validateProjects` enforces it — and UI code reads it through
   * `getRepositoryUrl`.
   */
  repository?: { url: string }
  liveUrl?: string
  screenshots: ImageAsset[]
  thumbnail?: ImageAsset
  /** ISO 8601 dates. */
  startDate?: string
  completionDate?: string
  latestMilestone?: string
  /** Short engineering points shown on featured cards. */
  highlights: string[]
  displayOrder: number
}

export interface SocialLink {
  name: string
  short: string
  href: string
}

export interface Fact {
  label: string
  value: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface ExperienceEntry {
  period: string
  periodNote: string
  heading: string
  headingNote: string
  role: string
  body: string
}

export interface EducationEntry {
  qualification: string
  field: string
  institution: string
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  initials: string
  roleLabel: string
  intro: string
  about: string[]
  portrait?: ImageAsset
  location: string
}
