import type { CaseStudy } from '../types'

export const dominoes: CaseStudy = {
  summary:
    'A server-authoritative multiplayer dominoes platform: a deterministic rules engine, a redacted real-time protocol and match rooms, with ranked matchmaking, cosmetics and rewards behind them.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Dominoes is a cross-platform competitive dominoes platform organised as a TypeScript monorepo. The emphasis so far has been on the backend and shared engine: a pure rules engine, a versioned wire protocol, authoritative match rooms and the services around them. A React game client is in progress alongside an admin studio.',
    'The name is a working title and the product is unfinished.',
  ],
  keyFeatures: [
    {
      title: 'Deterministic rules engine',
      body: 'A pure state machine for one-versus-one Draw and two-versus-two Partnership Block, with replay support and contract tests derived from shared rule test vectors.',
    },
    {
      title: 'Redacted wire protocol',
      body: 'A versioned, schema-validated protocol that sends each player only their own view, so an opponent’s hand never leaves the server.',
    },
    {
      title: 'Authoritative match rooms',
      body: 'One server room per match, with sequence and idempotency handling, atomic persistence, turn timers and forfeit handling, and private rooms joined with signed tickets.',
    },
    {
      title: 'Matchmaking and ratings',
      body: 'A casual queue and ranked matchmaking for one-versus-one and two-versus-two with a widening rating window, Glicko-2 ratings, seasons, divisions and leaderboards.',
    },
    {
      title: 'Cosmetics and rewards',
      body: 'A cosmetics catalogue with ownership and loadouts, plus quests and a weekly reward. Reward claims are backed by database constraints so each is processed exactly once.',
    },
    {
      title: 'Admin studio',
      body: 'Admin workflows and a protected admin API for managing cosmetics, assets, quests and season rewards, with server-side authorisation.',
    },
  ],
  architecture: {
    summary:
      'Game rules live in a shared package that is pure and deterministic. The server wraps it in an authoritative runtime, and clients only ever render the redacted views they are sent.',
    diagram: {
      title: 'Platform layers',
      description:
        'Clients connect over WebSockets to a Cloudflare Worker, which routes to one Durable Object room per match. Each room runs the authoritative runtime on top of the deterministic rules engine and the redacted protocol. Ratings, cosmetics and rewards persist in Supabase Postgres.',
      flow: [
        { label: 'React clients', note: 'Game client and admin studio' },
        { label: 'Cloudflare Worker', note: 'HTTP and WebSocket entry point' },
        { label: 'Match room', note: 'One Durable Object per match' },
        {
          label: 'Shared packages',
          children: [
            { label: 'Rules engine' },
            { label: 'Wire protocol' },
            { label: 'Rating' },
          ],
        },
        { label: 'Supabase Postgres', note: 'Ratings, seasons, cosmetics, rewards' },
      ],
    },
  },
  engineeringChallenges: [
    {
      title: 'Hidden information',
      body: 'A multiplayer card-style game must never leak hands. Redaction is part of the protocol and covered by adversarial privacy tests.',
    },
    {
      title: 'Exactly-once effects',
      body: 'Ranked settlement and reward claims must not run twice, even with retries. They are made idempotent through database uniqueness constraints and functions.',
    },
    {
      title: 'Authoritative time',
      body: 'Turn timers, forfeits and bot takeover are driven by server alarms rather than client clocks.',
    },
  ],
  testing: [
    'Unit tests, property-based tests with fast-check and contract tests against shared rule vectors.',
    'Adversarial privacy tests and Playwright end-to-end tests for casual, private-room and ranked flows.',
    'Database-backed repositories are tested with fakes; they have not been verified against a live database yet.',
  ],
  currentStatus:
    'Active development with no production deployment. The rules engine, protocol, match runtime, matchmaking, ratings, cosmetics and reward systems are built and tested. The game client is unfinished, and purchases are not implemented.',
  scopeNotes: [
    'Desktop and mobile packaging are planned, not built.',
    'Branding is a working name and may change.',
  ],
}
