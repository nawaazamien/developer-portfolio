import type { Project } from './types'
import { publicLinks } from './links'

/*
 * Homepage capability content: what is built, how strong each engineering
 * area is, and which technologies are genuinely core. The strengths are a
 * self-assessment shown as qualitative tiers; they are deliberately not
 * percentages. Project-specific tools (FFmpeg, yt-dlp, Ollama) belong on the
 * case-study pages, not here.
 */

export interface Capability {
  id: 'full-stack' | 'saas-backend' | 'automation' | 'interactive'
  title: string
  description: string
  technologies: string[]
}

export const capabilities: Capability[] = [
  {
    id: 'full-stack',
    title: 'Full-stack products',
    description:
      'End-to-end product engineering, from application architecture and data flows through to responsive interfaces.',
    technologies: ['React', 'TypeScript', 'JavaScript', 'Node.js'],
  },
  {
    id: 'saas-backend',
    title: 'SaaS & backend systems',
    description:
      'Multi-tenant systems with backend authorisation, database integrity and tenant-safe data access.',
    technologies: ['PostgreSQL', 'Supabase', 'Node.js', 'REST APIs', 'Row Level Security'],
  },
  {
    id: 'automation',
    title: 'Automation & tooling',
    description:
      'Developer tooling and automation that turns repetitive workflows into reliable, testable systems.',
    technologies: ['Node.js', 'Python', 'CI/CD', 'Automation pipelines'],
  },
  {
    id: 'interactive',
    title: 'Interactive systems',
    description:
      'Simulation and gameplay systems built with performance in mind: the same engineering habits in a different domain.',
    technologies: ['Godot', 'GDScript', 'Simulation', 'Performance'],
  },
]

export type StrengthLevel = 'core' | 'strong' | 'working'

export const STRENGTH_LEVELS: readonly StrengthLevel[] = ['core', 'strong', 'working']

export const STRENGTH_LABELS: Record<StrengthLevel, string> = {
  core: 'Core',
  strong: 'Strong',
  working: 'Working',
}

export interface EngineeringStrength {
  id: string
  label: string
  /** Short label used on the radar chart. */
  shortLabel: string
  level: StrengthLevel
}

/** Axis order is the order around the radar chart, clockwise from the top. */
export const engineeringStrengths: EngineeringStrength[] = [
  { id: 'frontend', label: 'Frontend Engineering', shortLabel: 'Frontend', level: 'core' },
  { id: 'backend', label: 'Backend Engineering', shortLabel: 'Backend', level: 'strong' },
  { id: 'data', label: 'Database & Data Design', shortLabel: 'Data', level: 'strong' },
  { id: 'testing', label: 'Testing & Quality', shortLabel: 'Testing', level: 'strong' },
  { id: 'product', label: 'Product Engineering', shortLabel: 'Product', level: 'core' },
  { id: 'automation', label: 'Automation', shortLabel: 'Automation', level: 'working' },
]

export const coreStack: string[] = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'HTML / CSS',
  'Git / GitHub Actions',
]

/** Supporting languages, shown separately so they are not mistaken for the core. */
export const additionalStack: string[] = ['Python', 'Godot', 'GDScript']

export interface GlanceStat {
  value: string
  label: string
}

/** The Lighthouse audit of the published routes scored 100 for accessibility and SEO. */
const AUDITED_ACCESSIBILITY_AND_SEO = '100'
export const PROFESSIONAL_YEARS = '4+'

/** Public codebases that can be inspected: this site's source and SaaS Foundation. */
export const publicCodebases = [
  publicLinks.portfolioSource,
  publicLinks.saasFoundation.repository,
]

/** Counts come from the real data, so they cannot drift from the project list. */
export function getAtAGlance(projects: Project[]): GlanceStat[] {
  return [
    { value: PROFESSIONAL_YEARS, label: 'Years of professional engineering' },
    { value: String(publicCodebases.length), label: 'Public codebases to inspect' },
    { value: String(projects.length), label: 'Projects across SaaS, automation and systems' },
    { value: AUDITED_ACCESSIBILITY_AND_SEO, label: 'Lighthouse accessibility and SEO' },
  ]
}
