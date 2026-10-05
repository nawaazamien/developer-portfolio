import type { CaseStudy } from '../types'

export const petPlatform: CaseStudy = {
  summary:
    'A multi-tenant SaaS platform where breeders, rescues and shelters run a branded public website and manage pets, enquiries, customers and applications from one private dashboard.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Pet Platform gives each approved organisation its own branded public website and a private dashboard for its animals, enquiries and applications, all running on one shared multi-tenant system. It is built with React, TypeScript and Vite on a Supabase-oriented architecture. There is no checkout for animals; buyers and adopters get in touch by enquiry or application.',
    'A vetted marketplace layer is planned on top of the same data, but is not built.',
  ],
  problem: [
    'Small breeders and rescues typically juggle a basic website, an inbox and spreadsheets. The goal was one system where the public site, the enquiry-to-application workflow and the private records stay consistent, while many organisations share the platform without any chance of seeing each other’s data.',
  ],
  keyFeatures: [
    {
      title: 'Tenants and website settings',
      body: 'Organisations, memberships and per-tenant site settings with a live preview, conflict detection on save, and publish and unpublish as a separate action.',
    },
    {
      title: 'Pets and media',
      body: 'A pet record with one status model and separate website visibility, plus up to twelve photos per pet with reordering. Public listings only ever show public pets of published sites.',
    },
    {
      title: 'Enquiries',
      body: 'A controlled public enquiry function with validation, a honeypot, rate limits and idempotent retries, feeding a private two-pane inbox.',
    },
    {
      title: 'Customers and applications',
      body: 'Customer records and a configurable application form. An enquiry becomes a customer and an application in one idempotent step, and answers are stored as an immutable snapshot.',
    },
    {
      title: 'Placements and finances',
      body: 'Waiting lists and placements with transactional locking so a pet cannot be reserved twice, and placement payments recorded in integer cents with corrections by reversal.',
    },
    {
      title: 'Notifications and collaboration',
      body: 'An outbox-based notification architecture with email templates and preferences, plus staff notes, tasks and an append-only activity timeline.',
    },
  ],
  architecture: {
    summary:
      'The same React client serves both the public site and the dashboard. The tenant is derived from the signed-in user’s membership, never from the URL, and public data is exposed only through functions that return fixed fields.',
    diagram: {
      title: 'High-level architecture',
      description:
        'A React, Vite and TypeScript client serves the public site and the dashboard. It talks to Supabase, which provides email-code authentication, a PostgreSQL database with Row Level Security on every table, private storage for pet media, and server functions for public enquiries and notifications.',
      flow: [
        { label: 'React · Vite · TypeScript', note: 'Public site and private dashboard' },
        {
          label: 'Supabase',
          children: [
            { label: 'Auth', note: 'Email code or link' },
            { label: 'PostgreSQL + RLS' },
            { label: 'Storage', note: 'Private pet media' },
            { label: 'Functions', note: 'Enquiries, notifications' },
          ],
        },
      ],
    },
    points: [
      'Row Level Security on every table, with a test that fails if any table lacks it.',
      'Public pages read through database functions that return an explicit list of fields, so private columns cannot leak.',
      'The browser makes resized, metadata-free copies of photos, and media is served through short-lived signed links.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Tenant isolation',
      body: 'Every dashboard and public read must stay inside one organisation. Policies, column grants and cross-tenant tests enforce it rather than client-side filtering.',
    },
    {
      title: 'No double reservations',
      body: 'Two staff members can act on the same pet at once. Placement changes run in transactions that lock the pet, so it can never be reserved for two people.',
    },
    {
      title: 'Exactly-once notifications',
      body: 'Emails are queued in the same transaction as the event that causes them. A worker claims messages without contention, re-checks before sending, and retries with back-off.',
    },
    {
      title: 'Untrusted public input',
      body: 'The public enquiry and application forms are validated server-side, rate limited, protected by a honeypot and safe to retry without creating duplicates.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Immutable records, corrected by reversal',
      body: 'Payments, documents and activity entries are never edited. A correction is a new record that references the original, which keeps a trustworthy history.',
    },
    {
      title: 'Money as integer cents',
      body: 'Amounts are whole cents with derived totals, so balances and overpayments are always computed rather than stored.',
    },
    {
      title: 'A provider seam for email',
      body: 'Notifications go through a provider interface. The default provider is a development one that sends nothing, so behaviour can be tested without a real mail account.',
    },
  ],
  testing: [
    'Frontend unit and interface tests with Vitest and Testing Library.',
    'A large database suite covering row-level security, isolation, behaviour and concurrent sessions, run against an embedded PostgreSQL 17 harness with a Supabase-style platform layer.',
    'Browser-level checks at phone, tablet and desktop widths against an emulated API.',
  ],
  currentStatus:
    'Active development, validated locally. There is no hosted deployment yet. Because Docker could not be used on the development machine, the database layer was validated against a Docker-free embedded PostgreSQL 17 harness (real schema, policies, functions and concurrent sessions) and a browser-level API stand-in, rather than a full local Supabase stack.',
  scopeNotes: [
    'The notification pipeline is built against a development email provider. No real email has been sent.',
    'Not yet verified against a real Supabase deployment: error mapping through the real API, the storage round-trip, the server-function runtime and scheduling.',
    'Not built: online payments, e-signatures, calendar sync and the marketplace layer.',
  ],
  lessons: [
    'A faithful database harness gave most of the confidence of a full local stack, and made the unverified edges explicit instead of hidden.',
  ],
}
