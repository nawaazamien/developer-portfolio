import financeChartOfAccounts from '../assets/projects/anti-social-finance/chart-of-accounts.webp'
import financeDashboard from '../assets/projects/anti-social-finance/dashboard.webp'
import financeTransactions from '../assets/projects/anti-social-finance/transactions.webp'
import petDashboard from '../assets/projects/pet-platform/dashboard.webp'
import petDashboardWide from '../assets/projects/pet-platform/dashboard-wide.webp'
import dominoesCommandPipeline from '../assets/projects/dominoes/command-pipeline.webp'
import dominoesLocalPlay from '../assets/projects/dominoes/local-pass-and-play.webp'
import dominoesOverview from '../assets/projects/dominoes/platform-overview.webp'
import dominoesRewardClaim from '../assets/projects/dominoes/reward-claim.webp'
import traderIntegrityImage from '../assets/projects/anti-social-trader/data-integrity.webp'
import traderFunnelImage from '../assets/projects/anti-social-trader/research-funnel.webp'
import traderLedgerImage from '../assets/projects/anti-social-trader/research-ledger.webp'
import youtubePipelineDetail from '../assets/projects/youtube-automation/pipeline-detail.webp'
import youtubePipelineOverview from '../assets/projects/youtube-automation/pipeline-overview.webp'
import youtubeValidation from '../assets/projects/youtube-automation/render-validation.webp'
import castleHoldCourtyard from '../assets/projects/castle-hold/courtyard-defence.webp'
import kingdomForestLedger from '../assets/projects/kingdom-incremental/forest-and-ledger.webp'
import tmtPipelineComparison from '../assets/projects/tiny-mobile-tower/pixel-pipeline-comparison.webp'
import tmtPipelineGrid from '../assets/projects/tiny-mobile-tower/pixel-pipeline-grid.webp'
import endlessHorde from '../assets/projects/tiny-swords-endless-survivor/horde.webp'
import endlessLevelUp from '../assets/projects/tiny-swords-endless-survivor/level-up-cards.webp'
import endlessNewThreat from '../assets/projects/tiny-swords-endless-survivor/new-threat.webp'
import warmupPrepare from '../assets/projects/warmup/prepare-tournament.webp'
import warmupRunner from '../assets/projects/warmup/live-runner-and-standings.webp'
import warmupRunnerWide from '../assets/projects/warmup/live-runner-and-standings-wide.webp'
import type { ImageAsset, Project } from './types'

/*
 * Curated project data — the single source the UI reads from.
 *
 * All of these repositories are private, so none sets `repository`. Add a
 * `repository` only for a public repo.
 *
 * Media lives in `src/assets/projects/<slug>/` as optimised, portfolio-safe
 * copies of real in-engine captures. Projects without a safe capture keep an
 * empty `screenshots` array and render the intentional empty state.
 */

const endlessThreat: ImageAsset = {
  src: endlessNewThreat,
  alt: 'Tiny Swords — Endless Survivor: a squad of soldiers faces a horde of goblins as a "New Threat: Troll Brute" mini-boss banner and boss health bar appear.',
  caption: 'Mini-boss introduction during a wave',
  width: 920,
  height: 540,
}

const endlessUpgrades: ImageAsset = {
  src: endlessLevelUp,
  alt: 'Tiny Swords — Endless Survivor level-up screen offering three upgrade cards: Heavy Blade (common), Death Frenzy (uncommon) and Explosive Arrow (rare).',
  caption: 'Level-up upgrade choices',
  width: 1160,
  height: 456,
}

const endlessSwarm: ImageAsset = {
  src: endlessHorde,
  alt: 'Tiny Swords — Endless Survivor: a small squad of soldiers surrounded by a large swarm of goblin enemies on a grass field.',
  caption: 'Large enemy counts on screen',
  width: 1000,
  height: 680,
}

const financeDashboardImage: ImageAsset = {
  src: financeDashboard,
  alt: 'Anti Social Finance dashboard for a fictional organisation: cash balance, revenue, expenses, net profit, receivables, payables and VAT position cards, a cash balance chart and a needs-attention list.',
  caption: 'Dashboard (fictional sample organisation)',
  width: 1280,
  height: 978,
}

const financeTransactionsImage: ImageAsset = {
  src: financeTransactions,
  alt: 'Anti Social Finance transactions screen listing imported bank statement lines with date, description, account, category, amount and review status, with search and filter controls.',
  caption: 'Imported bank transactions (sample data)',
  width: 1280,
  height: 800,
}

const financeChartImage: ImageAsset = {
  src: financeChartOfAccounts,
  alt: 'Anti Social Finance chart of accounts listing asset, liability, equity, income and expense accounts with codes, types, subtypes and posting status.',
  caption: 'Chart of accounts',
  width: 1280,
  height: 800,
}

const petDashboardImage: ImageAsset = {
  src: petDashboard,
  alt: 'Pet Platform reference dashboard for a fictional breeder: a navigation sidebar, quick actions, current listings with status and enquiry counts, and recent enquiries.',
  caption: 'Reference dashboard (fictional breeder, fixture content)',
  width: 1280,
  height: 800,
}

const petDashboardStrip: ImageAsset = {
  src: petDashboardWide,
  alt: 'Pet Platform reference dashboard for a fictional breeder showing a greeting, quick-action cards for adding a pet, new enquiries and website status, and the start of the current listings.',
  caption: 'Reference dashboard (fictional breeder, fixture content)',
  width: 1200,
  height: 466,
}

const traderFunnel: ImageAsset = {
  src: traderFunnelImage,
  alt: 'Instrument universe screening: 1,992 symbols in a broker census, 72 data-eligible after history and cost checks, and 15 cost-eligible symbols across 14 markets after measuring costs from 1.35 billion quote ticks.',
  caption: 'Instrument universe screening (figures from the project’s own reports)',
  width: 1200,
  height: 470,
}

const traderLedger: ImageAsset = {
  src: traderLedgerImage,
  alt: 'Table of research outcomes by phase, 3 to 20: most phases ended with no candidate or a negative result, a few data phases and narrow or inconclusive results, and the shadow phase still open. A note states no profitable strategy has been demonstrated and live trading is disabled.',
  caption: 'Outcomes by research phase, from the project’s experiment log',
  width: 1280,
  height: 1212,
}

const traderIntegrity: ImageAsset = {
  src: traderIntegrityImage,
  alt: 'Six-stage verified market-data pipeline (download, verify, normalise, validate, resample, manifest) with results for one-minute BTC/USDT history: 99.89 percent of rows present, 22 preserved gaps, no duplicate or invalid rows and 2,557 checksum-verified daily partitions.',
  caption: 'Verified market-data pipeline and its integrity results',
  width: 1280,
  height: 762,
}

const youtubeOverview: ImageAsset = {
  src: youtubePipelineOverview,
  alt: 'Six pipeline stages from long-form video to verified clip candidates: ingest, transcribe, segment, scout and direct with a local model, verify, and plan with render checks. A note says there is no upload or publishing step.',
  caption: 'Pipeline overview',
  width: 1200,
  height: 470,
}

const youtubeDetail: ImageAsset = {
  src: youtubePipelineDetail,
  alt: 'Twelve pipeline stages in two groups: nine automated stages from URL to verified candidates, and three explicit steps (edit plan, DaVinci Resolve edit and render, render validation). A note says nothing is uploaded or published.',
  caption: 'Automated run versus explicit steps',
  width: 1280,
  height: 840,
}

const youtubeValidationImage: ImageAsset = {
  src: youtubeValidation,
  alt: 'Render validation report for two synthetic test clips. The clean clip passes dimensions, duration, audio and black-frame checks. The defective clip fails because it has no audio stream and four seconds of black frames.',
  caption: 'Render validation on synthetic test clips (not real footage)',
  width: 1280,
  height: 862,
}

const dominoesOverviewImage: ImageAsset = {
  src: dominoesOverview,
  alt: 'Server-authoritative match flow: a React client sends intent to a Worker, which routes to a Durable Object match room that runs a deterministic rules engine, commits state atomically and sends each player a redacted view.',
  caption: 'Server-authoritative match flow',
  width: 1200,
  height: 470,
}

const dominoesPipelineImage: ImageAsset = {
  src: dominoesCommandPipeline,
  alt: 'Ten-step pipeline for processing one move: identify the caller, parse the envelope, check idempotency and sequence, adapt the command, apply it to the rules engine, re-check invariants, build responses, commit atomically and send after commit.',
  caption: 'How one move is processed',
  width: 1280,
  height: 837,
}

const dominoesRewardImage: ImageAsset = {
  src: dominoesRewardClaim,
  alt: 'Exactly-once weekly reward claim across client, Worker route and database function. A first claim creates a row, records a reward event and grants the cosmetic; a duplicate claim conflicts on the unique key and changes nothing.',
  caption: 'Exactly-once weekly reward claim',
  width: 1280,
  height: 665,
}

const dominoesLocalImage: ImageAsset = {
  src: dominoesLocalPlay,
  alt: 'Early local pass-and-play client: a chain of dominoes on the table, the open ends and the current player’s hand with a legal move offered.',
  caption: 'Early local pass-and-play client',
  width: 960,
  height: 420,
}

const warmupRunnerStrip: ImageAsset = {
  src: warmupRunnerWide,
  alt: 'Warmup: the live tournament screen showing two court results in an Americano tournament, next to the standings tab ranking eight players by points.',
  caption: 'Live runner and standings (sample players)',
  width: 1200,
  height: 532,
}

const warmupRunnerFull: ImageAsset = {
  src: warmupRunner,
  alt: 'Warmup on a phone: round 3 of 7 with both court results entered and a Next Round button, beside the standings tab listing eight sample players ranked by points.',
  caption: 'Live runner and standings (sample players)',
  width: 1200,
  height: 750,
}

const warmupSetup: ImageAsset = {
  src: warmupPrepare,
  alt: 'Warmup tournament preparation screen showing format, player count, courts, points per match, number of rounds, team mode and court rotation options.',
  caption: 'Tournament preparation',
  width: 430,
  height: 820,
}

const kingdomScreens: ImageAsset = {
  src: kingdomForestLedger,
  alt: 'Kingdom Incremental: the forest estate with a lumberjack working inside a fenced grove, next to the Forest Ledger panel listing a Timber Empire goal and priced upgrades such as Axe Quality and Work Boots.',
  caption: 'Forest estate and upgrade ledger',
  width: 1120,
  height: 720,
}

const castleHoldCourtyardImage: ImageAsset = {
  src: castleHoldCourtyard,
  alt: 'Castle Hold: a castle at the centre of a circular courtyard with four defensive squads positioned around it while enemies approach from the north.',
  caption: 'Squads defending the castle courtyard',
  width: 500,
  height: 430,
}

const towerPipelineStrip: ImageAsset = {
  src: tmtPipelineComparison,
  alt: 'Tiny Mobile Tower: the same scene rendered at normal resolution and through the 640 by 360 pixel-resolution pipeline, showing a voxel-style castle tower on wheels with goblins around it.',
  caption: 'Normal versus pixel-resolution rendering',
  width: 960,
  height: 360,
}

const towerPipelineGrid: ImageAsset = {
  src: tmtPipelineGrid,
  alt: 'Tiny Mobile Tower: four renders of the same scene at normal, 640 by 360, 480 by 270 and 320 by 180 pixel resolutions.',
  caption: 'Pixel-resolution comparison at four render sizes',
  width: 960,
  height: 720,
}

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
    thumbnail: financeDashboardImage,
    screenshots: [financeDashboardImage, financeTransactionsImage, financeChartImage],
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
      'Python 3.12 with uv, Pydantic, strict typing and linting. Includes Binance Vision market-data ingestion with checksum verification, 1-minute kline datasets, event-driven backtesting with transaction-cost modelling, cross-asset research and FX and CFD instrument-universe analysis.',
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
    thumbnail: traderFunnel,
    screenshots: [traderFunnel, traderLedger, traderIntegrity],
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
    thumbnail: petDashboardStrip,
    screenshots: [petDashboardImage],
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
      'A local, AI-assisted pipeline that finds clip candidates in long-form YouTube videos and plans verified vertical edits.',
    category: 'automation',
    projectType: 'Video automation pipeline',
    status: 'active',
    statusLabel: 'Prototype',
    featured: true,
    visibility: 'private',
    technologies: [
      'Python',
      'yt-dlp',
      'faster-whisper',
      'FFmpeg',
      'Ollama',
      'Qwen',
      'DaVinci Resolve',
    ],
    thumbnail: youtubeOverview,
    screenshots: [youtubeOverview, youtubeValidationImage, youtubeDetail],
    highlights: [
      'Media ingestion with yt-dlp and audio/video segmentation',
      'Content-unit detection and candidate clipping with local LLMs',
      'Edit planning for DaVinci Resolve with deterministic render validation',
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
    thumbnail: warmupRunnerStrip,
    screenshots: [warmupRunnerFull, warmupSetup],
    highlights: [
      'Tournament engines with player scheduling and fairness logic',
      'Live tournament runner with standings and session state',
      'Local-first persistence with optional Supabase cloud sync in progress',
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
    thumbnail: towerPipelineStrip,
    screenshots: [towerPipelineGrid],
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
    thumbnail: kingdomScreens,
    screenshots: [kingdomScreens],
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
    thumbnail: endlessThreat,
    screenshots: [endlessThreat, endlessUpgrades, endlessSwarm],
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
    thumbnail: castleHoldCourtyardImage,
    screenshots: [castleHoldCourtyardImage],
    highlights: [],
    displayOrder: 9,
  },
  {
    id: 'dominoes',
    slug: 'dominoes',
    name: 'Dominoes',
    shortDescription:
      'A server-authoritative multiplayer dominoes platform: a deterministic rules engine, a redacted real-time protocol, ranked matchmaking and database-backed rewards, with the game client still in progress.',
    category: 'full-stack',
    projectType: 'Multiplayer game platform',
    status: 'active',
    featured: false,
    visibility: 'private',
    technologies: [
      'TypeScript',
      'React',
      'Cloudflare Workers',
      'Durable Objects',
      'Supabase',
      'Zod',
      'Playwright',
    ],
    thumbnail: dominoesOverviewImage,
    screenshots: [dominoesOverviewImage, dominoesPipelineImage, dominoesRewardImage, dominoesLocalImage],
    highlights: [],
    displayOrder: 10,
  },
]
