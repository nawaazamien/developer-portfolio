import type { CaseStudy } from '../types'

export const saasFoundation: CaseStudy = {
  summary:
    'A public, runnable reference for multi-tenant SaaS: organisations, roles and Row Level Security in PostgreSQL, a typed React client, and tests that prove the rules on a real database.',
  role: 'Designed and built (independent, public project)',
  overview: [
    'SaaS Foundation is a small multi-tenant application whose purpose is to be read. It has four tables (profiles, organisations, memberships and projects), four roles (owner, admin, member and viewer) and one tenant-scoped resource. A user can belong to several organisations with a different role in each.',
    'Unlike most of the work on this site, its source is public. It is the code sample to open if you want to see how I structure an application: where the rules live, how the layers are separated and how the pieces are tested.',
  ],
  problem: [
    'Multi-tenant examples usually stop at a tenant column and a filter in the UI. The harder question is what stops one customer reading or changing another customer’s data when a client is buggy or hostile, and how to keep that rule in one place instead of scattering it through the interface.',
  ],
  goals: [
    'Enforce tenant isolation and roles in the database, so the UI is a convenience and not the control.',
    'Describe each role’s capabilities once, and use that description in the interface, the demo adapter and the policies.',
    'Keep the client independent of its data source through a typed backend contract.',
    'Test the SQL policies against a real database, and be explicit about what that does and does not prove.',
    'Make the whole thing explorable without an account or a backend.',
  ],
  keyFeatures: [
    {
      title: 'Tenants, roles and capabilities',
      body: 'Owners manage everything, admins manage members and viewers, members write projects, and viewers read. A capability matrix is shown in the app, and the same description drives which controls are offered.',
    },
    {
      title: 'Tenant switching',
      body: 'One provider decides which organisation is on screen. It remembers the choice but only honours it while the user is still a member, so a stale or tampered stored value falls back to a real membership.',
    },
    {
      title: 'Role-aware pages',
      body: 'Projects can be filtered by status and searched, created, edited and deleted according to role. Members can be promoted, demoted, removed or can leave, within the limits their own role allows.',
    },
    {
      title: 'Demo mode',
      body: 'A deterministic in-memory adapter with fictional data runs the full UI in the browser, including switching between an organisation where you are an owner and one where you are only a viewer.',
    },
    {
      title: 'Typed adapters',
      body: 'The UI depends on a Backend interface. A Supabase adapter and the demo adapter both implement it, and the same contract tests are written to describe either.',
    },
    {
      title: 'Documentation',
      body: 'A README for first-time readers, an architecture document with diagrams, and a security document with a threat table, a policy summary and a list of what has not been verified.',
    },
  ],
  architecture: {
    summary:
      'Authorisation is decided in PostgreSQL. The service layer adds validation and early, friendly checks, and the interface reflects what the backend will allow, but removing either of those would not make the data less safe.',
    diagram: {
      title: 'Layers',
      description:
        'The React interface uses providers for authentication, tenant selection and services. Services validate input and call a typed Backend interface. Two adapters implement it: a Supabase adapter that talks to PostgreSQL protected by Row Level Security, and an in-memory demo adapter that applies the same rules.',
      flow: [
        { label: 'React interface', note: 'Pages, role-aware controls' },
        { label: 'Providers and services', note: 'Auth, tenant selection, validation' },
        { label: 'Backend interface', note: 'The typed seam' },
        {
          label: 'Adapters',
          children: [
            { label: 'Supabase adapter', note: 'PostgreSQL with Row Level Security' },
            { label: 'Demo adapter', note: 'In memory, same rules' },
          ],
        },
      ],
    },
    points: [
      'Domain code (types, permissions, validation) has no framework or I/O dependencies, so it can be tested alone.',
      'Branded ID types stop an organisation ID being passed where a project ID is expected.',
      'Raw database messages never reach the user; errors are mapped to a small set of codes with plain-language messages.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Policies that do not recurse',
      body: 'A membership policy that needs to read memberships would recurse. Small helper functions in a private schema use SECURITY DEFINER with a pinned empty search_path, read the caller from auth.uid() and answer only about the caller, which avoids both recursion and probing other users.',
    },
    {
      title: 'Immutable identifiers',
      body: 'Row Level Security restricts rows, not columns. Column-level grants stop a client from moving a project to another organisation, rewriting a slug or forging created_by, and the insert policy requires created_by to be the caller.',
    },
    {
      title: 'Privilege escalation between roles',
      body: 'Admins can only set member or viewer on members and viewers, so they can neither create owners nor demote one. A trigger rejects removing or demoting the last owner, while still allowing an organisation to be deleted.',
    },
    {
      title: 'No rows is not an error',
      body: 'Row Level Security filters instead of failing, so a forbidden update simply affects zero rows. Both adapters treat that as a forbidden result and reads return empty lists, which keeps the UI behaviour identical with or without a database.',
    },
  ],
  technicalDecisions: [
    {
      title: 'The backend is the authority',
      body: 'Every rule is repeated below the interface. The pre-checks exist to give immediate, specific errors, not to protect anything.',
    },
    {
      title: 'Organisations are created through a function',
      body: 'Clients cannot insert organisations or owner rows directly. A single function creates the organisation and makes the caller its owner in one transaction.',
    },
    {
      title: 'A demo adapter that follows the same rules',
      body: 'It lets the interface be explored and tested quickly, but it is documented as proof of the rules as written in TypeScript, not of the SQL. The database tests cover the SQL.',
    },
    {
      title: 'Hash routing for static hosting',
      body: 'The live demo is served from GitHub Pages without rewrite rules, and the Supabase client is loaded lazily so demo mode never downloads it.',
    },
  ],
  testing: [
    'Unit tests for permissions, validation and error mapping.',
    'Contract tests covering tenant isolation (including forged organisation and project IDs), viewer write attempts, role changes, the last-owner rule and organisation rules.',
    'Component tests that drive the real interface in demo mode: tenant switching, role-based controls, filtering, form validation and member management.',
    'Twenty-eight database tests that start PostgreSQL 17, apply the actual migration and run the policies as different users with JWT claims set.',
    'Continuous integration runs lint, typecheck, all test suites and a build, and the demo is deployed only after they pass.',
  ],
  currentStatus:
    'Complete and maintained as a reference. The source is public and the demo is live on GitHub Pages in demo mode, with no secrets or backend.',
  scopeNotes: [
    'The policy tests run on real PostgreSQL but not on a full Supabase stack. Supabase Auth and PostgREST are replaced by a small bootstrap, so they are not exercised.',
    'The Supabase adapter is type-checked and its error mapping is unit-tested, but it has not been run against a live Supabase project.',
    'There is no invitation flow, so the interface cannot add members. Projects are the only tenant-scoped resource, and demo data resets on reload.',
  ],
  lessons: [
    'Writing the capability model once and testing it from three directions (interface, demo adapter, SQL) caught disagreements that testing any one of them would have missed.',
    'Stating what a test does not prove is part of the work; the security document lists it explicitly.',
  ],
}
