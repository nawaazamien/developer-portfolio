import type { CaseStudy } from '../types'

export const boatJam: CaseStudy = {
  summary:
    'A harbour puzzle game where the engineering is a puzzle toolchain: a pure rules engine, an exact solver, a difficulty analyser and a level generator.',
  role: 'Game and systems developer (independent project)',
  overview: [
    'Boat Jam is a mobile-first puzzle prototype made with Godot 4 and GDScript. Boats are moved through a marina and passengers board by colour. The project’s centre of gravity is the tooling that proves levels are solvable and measures how hard they are.',
  ],
  keyFeatures: [
    {
      title: 'Pure rules engine',
      body: 'Movement, blocking and boarding rules live in a pure state machine with no scene dependencies, so gameplay and tooling share one implementation.',
    },
    {
      title: 'Exact breadth-first-search solver',
      body: 'Finds the shortest solution or proves a level unsolvable, with a safety limit on search size.',
    },
    {
      title: 'Complexity analyser',
      body: 'Reports solution length and branching figures used to grade difficulty.',
    },
    {
      title: 'Procedural level generator',
      body: 'Produces candidate levels as validated JSON, filtered through the solver and analyser, with a calibration and review workflow.',
    },
  ],
  engineeringChallenges: [
    {
      title: 'Keeping the solver honest',
      body: 'The solver runs the same rules as the game, so a level that passes analysis cannot depend on behaviour the player never sees.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Levels as data with a schema',
      body: 'A versioned JSON schema, a loader and a validator reject malformed levels before they reach the game.',
    },
  ],
  testing: [
    'Headless Godot test scripts for the rules engine, solver, generator, analyser, calibration and review session, including unsolvable-level fixtures.',
  ],
  currentStatus:
    'A playable prototype with a portrait 3D presentation and two hand-made levels. Generated level packs are not yet shipped and are pending review.',
  scopeNotes: [
    'Prototype, not a released game. Mobile targets are intended; no mobile export has been verified.',
    'The diagram shows the tooling pipeline, not a screenshot.',
  ],
}

export const marsCleaners: CaseStudy = {
  summary:
    'An original first-person cleaning game built around an authoritative dust simulation and a test-first approach to movement, tools and resources.',
  role: 'Game and systems developer (independent project)',
  overview: [
    'Mars Cleaners is a Godot 4 project inspired by a well-known cleaning-game genre. Its content is original, and the reference behaviour was documented in writing before implementation started. The engineering focus is deterministic simulation and systems that can be verified without a display.',
  ],
  keyFeatures: [
    {
      title: 'First-person controller',
      body: 'A movement controller tested against the real Jolt physics server with slopes, walls, steps and jump height.',
    },
    {
      title: 'Authoritative dust simulation',
      body: 'Chunked coverage data is the single source of truth, with strokes, persistence that tolerates corruption, and determinism tests.',
    },
    {
      title: 'Interaction and tool authority',
      body: 'Input becomes validated commands and events, and a handheld brush tool decides what each stroke may do.',
    },
    {
      title: 'Resource accounting',
      body: 'A conservation ledger checked with fault-injection tests, so resources are neither created nor lost.',
    },
  ],
  engineeringChallenges: [
    {
      title: 'Verifying without a screen',
      body: 'Most behaviour is covered by headless tests, with separate GPU-based checks and benchmarks for visuals and performance.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Document first, then build',
      body: 'Reference mechanics and architecture were written up in phases before implementation, with a content policy and provenance record for assets.',
    },
  ],
  testing: [
    'A headless GDScript test runner with physics tests running at 60 Hz against real colliders.',
    'Graphical validation scripts and benchmarks for dust and brush behaviour.',
  ],
  currentStatus:
    'Early development: the foundation, movement, dust simulation, brush gameplay and an original brush model are built. Payout, soak testing, save integrity and onboarding are still ahead.',
  scopeNotes: [
    'Local project in early phases, not a playable release.',
    'The diagram shows the architecture, not a screenshot.',
  ],
}
