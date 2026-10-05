/**
 * Single registry of project routes and their search/social copy. The build
 * reads it (it has no asset imports, so it is safe to load from
 * vite.config.ts and the card generator) to emit static HTML, a sitemap and
 * metadata for each case study, and tests keep it in step with `projects.ts`.
 */

export type ProjectSchemaType = 'SoftwareApplication' | 'CreativeWork'

export interface ProjectPage {
  slug: string
  name: string
  /** Meta description: what the project is, in under ~160 characters. */
  description: string
  /** Short line for social cards. */
  tagline: string
  /** Eyebrow category shown on social cards. */
  category: string
  /** Research and tooling projects are CreativeWork rather than applications. */
  schemaType: ProjectSchemaType
  applicationCategory?: string
}

export const PROJECT_PAGES = [
  {
    slug: 'anti-social-finance',
    name: 'Anti Social Finance',
    description:
      'Multi-tenant accounting platform built with React, TypeScript, Supabase and PostgreSQL: banking, journals, ledgers, financial reporting and period controls.',
    tagline: 'Multi-tenant accounting platform',
    category: 'SaaS',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'FinanceApplication',
  },
  {
    slug: 'anti-social-trader',
    name: 'Anti Social Trader',
    description:
      'Python research and backtesting platform for algorithmic trading: verified market data, event-driven backtests, cost modelling and pre-registered research.',
    tagline: 'Quantitative research and backtesting',
    category: 'Data / Research',
    schemaType: 'CreativeWork',
  },
  {
    slug: 'pet-platform',
    name: 'Pet Platform',
    description:
      'Multi-tenant SaaS for breeders and rescues: branded public sites, pets, enquiries, applications and placements on React, TypeScript and Supabase.',
    tagline: 'Multi-tenant SaaS for breeders and rescues',
    category: 'SaaS',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
  },
  {
    slug: 'youtube-automation',
    name: 'YouTube Automation',
    description:
      'Local-first pipeline that turns long-form video into verified clip candidates and 9:16 edit plans using yt-dlp, FFmpeg, faster-whisper and a local LLM.',
    tagline: 'Local AI clip-selection and edit planning',
    category: 'Automation',
    schemaType: 'CreativeWork',
  },
  {
    slug: 'warmup',
    name: 'Warmup',
    description:
      'Local-first padel tournament manager with deterministic, fair scheduling for Americano and Mexicano formats, built with React, TypeScript and Dexie.',
    tagline: 'Local-first padel tournament manager',
    category: 'Full Stack',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'SportsApplication',
  },
  {
    slug: 'tiny-mobile-tower',
    name: 'Tiny Mobile Tower',
    description:
      'Isometric 3D survivor action game in Godot 4 with a 480×270 pixel renderer, modular tower weapons and data-driven enemies and bosses.',
    tagline: '3D survivor game · Godot 4',
    category: 'Interactive / Game',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'GameApplication',
  },
  {
    slug: 'kingdom-incremental',
    name: 'Kingdom Incremental',
    description:
      'Incremental kingdom builder in Godot 4 with a deterministic economy, offline progression and a versioned save format.',
    tagline: 'Incremental simulation · Godot 4',
    category: 'Interactive / Game',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'GameApplication',
  },
  {
    slug: 'tiny-swords-endless-survivor',
    name: 'Tiny Swords — Endless Survivor',
    description:
      'Endless survivor roguelike in Godot 4 where a growing squad fights goblin hordes, with large-crowd performance engineering.',
    tagline: 'Survivor roguelike · Godot 4',
    category: 'Interactive / Game',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'GameApplication',
  },
  {
    slug: 'castle-hold',
    name: 'Castle Hold',
    description:
      'Mobile-first tactical defence game in Godot 4: squads hold a castle courtyard against waves that attack from any direction.',
    tagline: 'Tactical defence · Godot 4',
    category: 'Interactive / Game',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'GameApplication',
  },
  {
    slug: 'dominoes',
    name: 'Dominoes',
    description:
      'Server-authoritative multiplayer dominoes platform: deterministic rules engine, redacted real-time protocol, ranked matchmaking and rewards.',
    tagline: 'Server-authoritative multiplayer platform',
    category: 'Full Stack',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'GameApplication',
  },
] as const satisfies readonly ProjectPage[]

export type ProjectSlug = (typeof PROJECT_PAGES)[number]['slug']

export const PROJECT_SLUGS: readonly ProjectSlug[] = PROJECT_PAGES.map(
  (page) => page.slug,
)

export const SITE_NAME = 'Nawaaz Amien'

export function projectPageTitle(name: string): string {
  return `${name} — ${SITE_NAME}`
}
