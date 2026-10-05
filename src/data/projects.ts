import type { Project } from './types'

/*
 * Curated project data — the single source the UI reads from.
 *
 * All of these repositories are private, so none sets `repository`. Add a
 * `repository` only for a public repo. Screenshots arrive in a later media
 * pass; empty arrays render an intentional empty state.
 */

export const projects: Project[] = [
  {
    id: 'anti-social-finance',
    slug: 'anti-social-finance',
    name: 'Anti Social Finance',
    shortDescription:
      'A multi-tenant accounting platform built for Anti Social Studios and architected to serve external organisations, as an alternative to traditional accounting software.',
    longDescription:
      'Covers authentication, organisations and tenancy, role-based access control, banking providers and accounts, transaction imports with normalisation, a chart of accounts with category mapping, journal entries with posting and reversals, transfers, a general ledger with running balances, and Profit & Loss and Balance Sheet reporting, with accounting periods, period close and posting locks.',
    category: 'saas',
    projectType: 'Multi-tenant accounting SaaS',
    status: 'active',
    featured: true,
    visibility: 'private',
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL'],
    screenshots: [],
    highlights: [
      'Ledger engine: journals, posting, reversals, accounting periods and period-close controls',
      'Tenancy, role-based access control and Supabase Row Level Security',
      'FNB CSV/XLSX import, Profit & Loss and Balance Sheet reporting, backed by extensive automated, database and concurrency testing',
    ],
    displayOrder: 1,
  },
  {
    id: 'anti-social-trader',
    slug: 'anti-social-trader',
    name: 'Anti Social Trader',
    shortDescription:
      'A quantitative research and backtesting platform for algorithmic trading, built around reproducible, preregistered methodology. A research system — no live trading.',
    longDescription:
      'Python 3.12 with uv, Pydantic, strict typing and linting. Includes Binance Vision market-data ingestion with checksum verification, 1-minute kline datasets, event-driven backtesting with transaction-cost modelling, cross-asset research and FxPro instrument-universe analysis.',
    category: 'data-research',
    projectType: 'Backtesting & research platform',
    status: 'active',
    statusLabel: 'Active research',
    featured: true,
    visibility: 'private',
    technologies: [
      'Python',
      'Pydantic',
      'uv',
      'Event-driven backtesting',
      'Market data pipelines',
    ],
    screenshots: [],
    highlights: [
      'Market-data ingestion from Binance Vision with checksum verification',
      'Event-driven backtesting with transaction-cost modelling',
      'Preregistered, reproducible research on a strictly typed Python codebase',
    ],
    displayOrder: 2,
  },
  {
    id: 'pet-platform',
    slug: 'pet-platform',
    name: 'Pet Platform',
    shortDescription:
      'A multi-tenant platform where breeders and pet businesses run branded websites and manage animals, enquiries, customers and applications from one shared system.',
    longDescription:
      'Some backend infrastructure has used local or emulated seams where hosted Supabase functionality was unavailable, so not every integration is deployed to production.',
    category: 'saas',
    projectType: 'Multi-tenant SaaS platform',
    status: 'active',
    featured: true,
    visibility: 'private',
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase'],
    screenshots: [],
    highlights: [
      'Tenant and membership foundation with per-tenant website settings and a publishing architecture',
      'Pet domain model with visibility, status, media and public listings',
      'Enquiry, customer and application records with notification and email-template architecture',
    ],
    displayOrder: 3,
  },
  {
    id: 'youtube-automation',
    slug: 'youtube-automation',
    name: 'YouTube Automation',
    shortDescription:
      'A local, AI-assisted pipeline that turns long-form YouTube videos into vertical short-form clips.',
    category: 'automation',
    projectType: 'Video automation pipeline',
    status: 'active',
    featured: true,
    visibility: 'private',
    technologies: [
      'Python',
      'yt-dlp',
      'FFmpeg',
      'Ollama',
      'Qwen',
      'DaVinci Resolve',
    ],
    screenshots: [],
    highlights: [
      'Media ingestion with yt-dlp and audio/video segmentation',
      'Content-unit detection and candidate clipping with local LLMs',
      '9:16 rendering with title generation and render validation',
    ],
    displayOrder: 4,
  },
  {
    id: 'warmup',
    slug: 'warmup',
    name: 'Warmup',
    shortDescription:
      'A local-first tournament manager for Padel formats such as Americano, Mexicano and Mixed, with an interface inspired by Apple’s Human Interface Guidelines.',
    category: 'full-stack',
    projectType: 'Tournament management PWA',
    status: 'active',
    featured: true,
    visibility: 'private',
    technologies: ['React', 'TypeScript', 'Vite', 'Dexie', 'PWA'],
    screenshots: [],
    highlights: [
      'Tournament engines with player scheduling and fairness logic',
      'Live tournament runner with standings and session state',
      'Local-first persistence with a seam for future Supabase sync',
    ],
    displayOrder: 5,
  },
  {
    id: 'tiny-mobile-tower',
    slug: 'tiny-mobile-tower',
    name: 'Tiny Mobile Tower',
    shortDescription:
      'A 3D game with a pixel-resolution rendering pipeline, modular combat, projectile and enemy systems, and breakable shields.',
    category: 'interactive',
    projectType: '3D game',
    status: 'active',
    featured: false,
    visibility: 'private',
    technologies: ['Godot 4', 'GDScript'],
    screenshots: [],
    highlights: [],
    displayOrder: 6,
  },
  {
    id: 'kingdom-incremental',
    slug: 'kingdom-incremental',
    name: 'Kingdom Incremental',
    shortDescription:
      'An incremental simulation game with interconnected gameplay pages, economy and upgrade systems, idle and offline progression, and save-state architecture.',
    category: 'interactive',
    projectType: 'Incremental game',
    status: 'active',
    featured: false,
    visibility: 'private',
    technologies: ['Godot 4', 'GDScript'],
    screenshots: [],
    highlights: [],
    displayOrder: 7,
  },
  {
    id: 'tiny-swords-endless-survivor',
    slug: 'tiny-swords-endless-survivor',
    name: 'Tiny Swords — Endless Survivor',
    shortDescription:
      'An action survival game covering combat, progression, upgrades, squad and follower systems, and enemy spawning tuned for large enemy counts.',
    category: 'interactive',
    projectType: 'Action survival game',
    status: 'active',
    featured: false,
    visibility: 'private',
    technologies: ['Godot 4', 'GDScript'],
    screenshots: [],
    highlights: [],
    displayOrder: 8,
  },
  {
    id: 'castle-hold',
    slug: 'castle-hold',
    name: 'Castle Hold',
    shortDescription:
      'A tactical defence game with a 360-degree defence space, squad placement, enemy routing, combat and wave systems.',
    category: 'interactive',
    projectType: 'Tactical defence game',
    status: 'active',
    featured: false,
    visibility: 'private',
    technologies: ['Godot 4', 'GDScript'],
    screenshots: [],
    highlights: [],
    displayOrder: 9,
  },
  {
    id: 'dominoes',
    slug: 'dominoes',
    name: 'Dominoes',
    shortDescription:
      'A game platform with player and admin APIs, admin workflows and database-backed reward claims designed to be processed exactly once, covered by automated tests.',
    category: 'full-stack',
    projectType: 'Game platform',
    status: 'active',
    featured: false,
    visibility: 'private',
    technologies: ['TypeScript'],
    screenshots: [],
    highlights: [],
    displayOrder: 10,
  },
]
