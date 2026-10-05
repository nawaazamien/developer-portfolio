import type { CaseStudy } from '../types'

export const warmup: CaseStudy = {
  summary:
    'A local-first padel tournament manager with fair, deterministic scheduling for Americano and Mexicano formats, a live scoring runner and optional rating.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Warmup is a padel companion app built with React, TypeScript and Vite. It runs entirely on the device using IndexedDB through Dexie, so a tournament keeps working without a connection, and it is structured as an installable PWA.',
    'Four formats are implemented end to end: Standard Americano, Mixed Americano, Mexicano and Mixed Mexicano. An organiser creates an event, generates and reviews a schedule, runs the tournament live, and finishes with tie-aware results.',
  ],
  problem: [
    'Running a social padel night fairly is harder than it looks: everyone should rest evenly, partner with different people and face different opponents. Doing that by hand on the day is slow and error-prone, and the organiser should never be blocked by a bad connection.',
  ],
  keyFeatures: [
    {
      title: 'Fair schedule generation',
      body: 'A seeded, deterministic generator builds several complete candidate schedules and refines them with a bounded local search against a prioritised fairness comparator.',
    },
    {
      title: 'Mexicano rounds',
      body: 'Rounds are generated one at a time from the live standings, so pairings react to results. Each generation is stored as an immutable record.',
    },
    {
      title: 'Live runner',
      body: 'Direct numeric score entry with unsaved-change protection, round navigation and live standings, with state persisted so a refresh never loses a match.',
    },
    {
      title: 'Standings and results',
      body: 'Standings are derived on demand with a documented tie-break order and competition ranking, then reused for final, tie-aware results.',
    },
    {
      title: 'Competitive rating',
      body: 'An optional Bayesian team rating update with rating periods, and a replayable history so ratings can be audited.',
    },
    {
      title: 'Optional cloud sync',
      body: 'An outbox-and-cursor sync layer to Supabase, built so the local database remains the source of truth.',
    },
  ],
  architecture: {
    summary:
      'Scheduling, standings and rating are pure, tested libraries with no UI or storage dependencies. Features compose them with a local repository layer, and cloud sync is an optional layer on top.',
    diagram: {
      title: 'Local-first architecture',
      description:
        'A React interface sits on pure domain libraries for scheduling, standings and rating. Data is stored locally in IndexedDB through Dexie, which is the source of truth. An optional sync outbox sends changes to Supabase.',
      flow: [
        { label: 'React interface', note: 'Create, prepare, run, results' },
        { label: 'Pure domain libraries', note: 'Scheduling, standings, rating' },
        { label: 'Dexie · IndexedDB', note: 'Local source of truth' },
        { label: 'Sync outbox', note: 'Optional' },
        { label: 'Supabase', note: 'Optional cloud copy' },
      ],
    },
    points: [
      'The schedule generator is deterministic for a given seed, so results are reproducible and testable.',
      'The PWA update flow asks before reloading, so an update can never interrupt a tournament in progress.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Fairness as an ordered goal',
      body: 'Rest evenness comes first, then avoiding repeated partners, then repeated opponents, then skill balance and court variety. Every refinement step re-verifies the hard constraints.',
    },
    {
      title: 'Small groups',
      body: 'Odd and small player counts exposed defects in the first generator, which led to the second version and a large regression suite of generated schedules.',
    },
    {
      title: 'Mixed formats',
      body: 'Mixed play needs eligibility rules for each player, validation and a remediation flow, and role snapshots stored on each schedule so history stays correct if a profile changes.',
    },
    {
      title: 'Sync without surprises',
      body: 'Offline-first sync needs idempotent operations, a conflict state and a clear rule that the device’s data wins until it is safely pushed.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Derive standings, don’t persist them',
      body: 'Standings are always calculated from stored results, so a corrected score can never leave a stale table behind.',
    },
    {
      title: 'Immutable round generations',
      body: 'Each generated round is stored and never rewritten, which gives an auditable record of exactly what was played.',
    },
    {
      title: 'A rating system chosen on purpose',
      body: 'The rating uses a Weng-Lin style Bayesian update with rating periods, and is documented as such rather than called Elo.',
    },
  ],
  testing: [
    'Dozens of unit, component and integration tests, including full end-to-end tournament flows run in a simulated browser.',
    'Simulation and benchmark harnesses exercise each format and the rating system at scale.',
    'Tests for each version of the local database schema migration, and Playwright screenshot sweeps for interface review.',
  ],
  currentStatus:
    'Active development. The four formats and the rating system run end to end on local persistence. Optional cloud sync is built against a hosted development project and is still in progress. It is not yet published as a public service.',
  scopeNotes: [
    'Screenshots show sample players, not real people.',
    'Native iOS and Android apps are planned, not built.',
  ],
  lessons: [
    'Keeping the algorithms pure made them easy to simulate thousands of times, which is how the fairness defects were found.',
  ],
}
