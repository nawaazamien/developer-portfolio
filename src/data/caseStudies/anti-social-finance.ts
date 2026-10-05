import type { CaseStudy } from '../types'

export const antiSocialFinance: CaseStudy = {
  summary:
    'A multi-tenant accounting platform built for Anti Social Studios and designed to serve external organisations, where the rules that protect the books are enforced by the database.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Anti Social Finance is a multi-tenant accounting and finance platform for small businesses. It was built first for Anti Social Studios and architected so that other organisations can use it side by side without ever seeing each other’s data. The front end is React, TypeScript and Vite; the back end is Supabase on PostgreSQL. It is set in a South African context: rand amounts, VAT and FNB bank statements.',
    'It covers the accounting workflow end to end: importing bank statements, reviewing and categorising transactions, posting to a double-entry ledger, and reporting through a general ledger, trial balance, Profit & Loss and Balance Sheet — with accounting periods that can be closed and locked.',
  ],
  problem: [
    'Off-the-shelf accounting software is a recurring cost and a black box. The aim was a platform I could understand, extend and trust, where integrity is enforced by the database rather than left to application code that could be bypassed or get out of step.',
  ],
  goals: [
    'Isolate every organisation’s data by construction, not by convention.',
    'Make posted accounting records immutable, correctable only by reversal.',
    'Calculate money exactly, with no floating-point error.',
    'Keep every posting path consistent under concurrent use.',
    'Make the whole system testable, including at the database level.',
  ],
  keyFeatures: [
    {
      title: 'Tenancy and access',
      body: 'Organisations, memberships and role-based access control, with email sign-in and an onboarding flow for new organisations.',
    },
    {
      title: 'Banking and statement import',
      body: 'Bank accounts and immutable transactions. FNB CSV and XLSX statements are previewed, normalised to one canonical shape, de-duplicated and committed atomically.',
    },
    {
      title: 'Chart of accounts and mapping',
      body: 'A seeded chart of accounts, category-to-ledger mappings and bank accounts linked to ledger accounts, so imported transactions know where they post.',
    },
    {
      title: 'Journal engine',
      body: 'Draft, post and reverse journals with sequential numbering. Bank transactions, transfers and opening balances post to the ledger through the same engine.',
    },
    {
      title: 'Ledger and reporting',
      body: 'General ledger with running balances, trial balance, Profit & Loss and Balance Sheet, all derived from posted journals rather than stored separately.',
    },
    {
      title: 'Periods and close controls',
      body: 'Accounting periods, month close and posting locks, plus bank reconciliation and year-end close. Receivables, payables, VAT, cash flow and management reporting build on the same ledger.',
    },
  ],
  architecture: {
    summary:
      'A single-page client talks only to Supabase. Anything that changes accounting state goes through database functions, so the rules sit next to the data and cannot be skipped by a client.',
    diagram: {
      title: 'High-level architecture',
      description:
        'A React, Vite and TypeScript client calls Supabase. Supabase provides authentication, a PostgreSQL database protected by Row Level Security, database functions called over RPC, and private storage for bank statements. The database holds the immutable ledger that reports are derived from.',
      flow: [
        { label: 'React · Vite · TypeScript', note: 'UI, typed money helpers, client-side validation' },
        {
          label: 'Supabase',
          children: [
            { label: 'Auth' },
            { label: 'PostgreSQL' },
            { label: 'Row Level Security' },
            { label: 'RPC functions' },
            { label: 'Storage' },
          ],
        },
        { label: 'Accounting ledger', note: 'Immutable posted journals, period locks, derived reports' },
      ],
    },
    points: [
      'Row Level Security is on every table, and tenant-membership checks live in a private schema that the API does not expose.',
      'Organisation-scoped composite foreign keys make cross-tenant references impossible even if a policy were bypassed.',
      'Original bank statements sit in private storage and are reachable only through short-lived signed links after an access check.',
      'Report functions are read-only and derive every figure from posted journals, so nothing is stored that could drift.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Multi-tenant isolation',
      body: 'Every query has to be confined to the caller’s organisations. Isolation is enforced in the database with policies, scoped keys and tests that try to cross tenant boundaries, not by filtering in the client.',
    },
    {
      title: 'Immutable books',
      body: 'A posted journal can never be edited or deleted. Triggers enforce this even if the API layer were bypassed; mistakes are fixed with a reversing journal that mirrors the original.',
    },
    {
      title: 'Exact money',
      body: 'Amounts are whole minor units end to end, parsed from strings without floating point, and every journal line must carry exactly one of debit or credit.',
    },
    {
      title: 'Concurrency',
      body: 'Closing a period while someone posts into it, double-closing, and duplicate imports are all race conditions. They are handled with explicit row and advisory locks, atomic sequence counters and uniqueness constraints as a backstop.',
    },
    {
      title: 'Messy bank data',
      body: 'Statements arrive in different shapes. Import normalises them into one transaction model, refuses duplicate files by content hash, and commits all-or-nothing after a preview.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Database-enforced rules over application checks',
      body: 'Rules that protect the books live in constraints, triggers and functions, so every client — including future ones — gets the same guarantees.',
    },
    {
      title: 'Derive, don’t store',
      body: 'Reports and the dashboard are computed from posted journals, and as-at figures come from the ledger itself, so there is one source of truth.',
    },
    {
      title: 'Optimistic concurrency',
      body: 'Editable records carry a revision; a stale write is refused and the interface offers to reload instead of silently overwriting.',
    },
    {
      title: 'Stable error codes',
      body: 'The database returns a stable set of error codes that the client maps to plain messages, so raw backend errors never reach users.',
    },
  ],
  testing: [
    'Extensive automated testing across three layers: Vitest unit and interface tests, a pgTAP database suite covering tenant isolation, journal immutability, accounting periods, reconciliation and VAT, and checks that target race conditions between posting and period close.',
    'Production-build smoke checks at desktop and phone widths.',
    'Live verification against a hosted Supabase environment using synthetic fixture data only.',
  ],
  currentStatus:
    'Active development. The ledger, banking, reporting and period-control work is built and verified, and migrations are applied to a hosted Supabase environment and checked with synthetic data. The newest module, project financials, is verified locally and awaiting its hosted rollout. There is no public production deployment yet.',
  scopeNotes: [
    'The screenshots are the real interface running against fictional sample data for a made-up organisation. No real business data is shown.',
    'Statement import currently supports FNB layouts, verified with synthetic fixtures.',
    'The source is private. This page describes the design at a high level and shows no financial data.',
  ],
  lessons: [
    'Pushing invariants down into the database turned most “what if the client misbehaves?” questions into tests rather than worries.',
    'Designing the failure and race cases first made the happy path simpler.',
  ],
}
