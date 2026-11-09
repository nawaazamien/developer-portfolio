import type { CaseStudy } from '../types'

export const atlas: CaseStudy = {
  summary:
    'A multi-tenant platform that runs a service and rental business and its accounting from one data model: operational workflows on one side, a general ledger, reconciliation and fixed assets on the other.',
  role: 'Product and engineering owner (independent project, built with AI-assisted tooling and reviewed by me)',
  overview: [
    'Atlas is a business-operations and finance platform for equipment rental and service businesses. Customers, equipment, jobs, quotes, rentals and inventory sit alongside invoices, payables, a general ledger, bank reconciliation and fixed assets, so operational events and financial postings share one tenant-safe database.',
    'It is built as three independent repositories: a React and TypeScript web client, a FastAPI service, and a Supabase and PostgreSQL platform repository holding migrations and database tests. Atlas is a working title, and the project is an internal development environment, not a production service with customers.',
  ],
  problem: [
    'Small operational businesses often run jobs and rentals in one tool and their books in another, then reconcile by hand. The goal was a single system where an operational event such as a completed job or a rental period produces the right financial record, with every tenant’s data isolated and every action permission-checked.',
  ],
  keyFeatures: [
    {
      title: 'Operational workflows',
      body: 'Customers and equipment, jobs and dispatch, quotes with VAT, rentals, inspections with PDF certificates, maintenance plans, inventory and stock, purchasing, service requests, scheduling, documents and customer-facing portals.',
    },
    {
      title: 'Accounting',
      body: 'Invoices, payments and credits with receivables ageing, bills and supplier payments, a general ledger with journals, trial balance, profit and loss and balance sheet, VAT, accounting periods and year-end close.',
    },
    {
      title: 'Bank reconciliation',
      body: 'Bank statement import and a reconciliation workflow that matches imported lines against ledger entries, covered by end-to-end tests.',
    },
    {
      title: 'Fixed assets',
      body: 'An asset register with depreciation and disposal, posting to the ledger under the same period controls as every other journal.',
    },
    {
      title: 'Operational billing and statements',
      body: 'Billing generated from jobs and from scheduled rental periods, plus an email outbox and customer statements.',
    },
    {
      title: 'Permissions and reporting',
      body: 'A permission registry with roles and per-user overrides, audit events, cost and rate redaction for customer-visible views, and operational reporting.',
    },
  ],
  architecture: {
    summary:
      'The web client calls the API, which authenticates the JWT and talks to PostgreSQL inside a transaction bound to the caller’s tenant. The tenant boundary is enforced by the database, not only by application code.',
    diagram: {
      title: 'System architecture',
      description:
        'A React, Vite and TypeScript web client calls a FastAPI service. The service verifies the signed-in user’s token, checks a permission key on every route, and queries Supabase PostgreSQL as a role that cannot bypass Row Level Security. Migrations and database tests live in a separate platform repository.',
      flow: [
        { label: 'React · Vite · TypeScript', note: 'TanStack Query; API types generated from OpenAPI' },
        { label: 'FastAPI', note: 'Token verification, permission key on every route' },
        {
          label: 'Supabase PostgreSQL',
          children: [
            { label: 'Row Level Security', note: 'API role cannot bypass it' },
            { label: 'Migrations', note: 'Versioned, with upgrade-path scripts' },
            { label: 'pgTAP', note: 'Policy and ledger tests' },
          ],
        },
      ],
    },
    points: [
      'Every route declares the permission it requires, and the service refuses to start if a key is not in the registry.',
      'The API holds no service-role key: it connects as a restricted database role, so a bug in application code cannot read across tenants.',
      'The web client’s API types are generated from the OpenAPI contract and a CI check fails when they drift.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Tenant isolation at scale',
      body: 'More than a hundred tables each need Row Level Security policies that are provably correct. Policies are written as migrations and exercised by a large pgTAP suite rather than trusted by inspection.',
    },
    {
      title: 'Financial integrity',
      body: 'Postings must balance, closed periods must reject changes, and reversals must not rewrite history. These rules live in the database so no route can bypass them.',
    },
    {
      title: 'Evolving a large schema safely',
      body: 'More than 160 migrations were built in phases, with upgrade-path scripts that prove a database at an earlier phase still migrates cleanly.',
    },
  ],
  technicalDecisions: [
    {
      title: 'A separate API instead of the database client alone',
      body: 'Business rules such as posting, permission checks and PDF generation sit in a typed Python service, which keeps the client thin and makes the rules unit-testable.',
    },
    {
      title: 'Permissions as data',
      body: 'Roles and overrides are rows resolved by a single resolver, so access can change without a deploy and every decision is auditable.',
    },
  ],
  testing: [
    'Python: ruff, strict mypy and a pytest suite of roughly a thousand tests, including database-backed integration tests that fail if any test is skipped.',
    'Web: Vitest and Testing Library component tests, accessibility checks, and Playwright end-to-end specs for finance, rentals and invoicing flows.',
    'Database: pgTAP policy and ledger tests, run against a fresh local Supabase stack, plus phase-to-phase upgrade scripts.',
    'Counts are taken from the test sources, not from a recorded run.',
  ],
  currentStatus:
    'Active development over roughly four weeks across three repositories. Operations, finance, reconciliation, fixed assets and operational reporting are implemented. A development deployment on Render and hosted Supabase was verified against an earlier set of migrations; later migrations have not been confirmed there.',
  scopeNotes: [
    'No production use or real customers: this is an internal development environment with no staging tier.',
    'Subscription and tenant billing, platform administration, production hardening and backups are planned, not built.',
    'CI workflows are defined and run on demand; they are not a required merge gate, and end-to-end tests are not part of CI.',
    'No screenshots are shown because the application has not been captured with sanitised data. The diagrams describe the real structure.',
  ],
  lessons: [
    'Putting authorisation and ledger rules in the database made later features cheaper to review, because the invariants did not depend on every new route being written correctly.',
  ],
}
