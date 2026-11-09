import type { CaseStudy } from '../types'

export const ugcOperationsDashboard: CaseStudy = {
  summary:
    'An operations dashboard for running creator-content campaigns: brands, deliverables, usage rights, invoices and deadlines in one workspace-isolated system on React and Supabase.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'The UGC Operations Dashboard brings the scattered admin of freelance content work into one place: who the brand is, what was agreed, what is due, what is owed and what rights the brand holds. It is a React and TypeScript single-page app over a Supabase PostgreSQL database with Row Level Security.',
    'The project follows a phased plan, and its documentation marks the planned phases as implemented.',
  ],
  keyFeatures: [
    {
      title: 'Campaigns and deliverables',
      body: 'Brands, campaigns and the deliverables inside them, with closeouts that record how a campaign finished.',
    },
    {
      title: 'Usage rights',
      body: 'Usage rights are recorded alongside the deliverables, so it is clear what a brand may do with the content.',
    },
    {
      title: 'Invoices and payments',
      body: 'Invoices, with payments recorded against them.',
    },
    {
      title: 'Tasks, documents and notifications',
      body: 'Deadlines and tasks, contracts and documents held in private storage with signed links, and in-app notifications.',
    },
    {
      title: 'Analytics',
      body: 'A dashboard and analytics views built with Recharts.',
    },
    {
      title: 'Workspaces and access',
      body: 'Authentication with isolated workspaces, enforced by Row Level Security rather than by the interface alone.',
    },
  ],
  architecture: {
    summary:
      'The React app is backed by Supabase, and the database carries the rules. Scheduled work uses pg_cron inside PostgreSQL.',
    diagram: {
      title: 'System architecture',
      description:
        'A React, Vite and TypeScript app uses Supabase authentication and queries PostgreSQL with Row Level Security. Documents sit in private storage behind signed URLs, and scheduled jobs run inside the database with pg_cron.',
      flow: [
        { label: 'React · Vite · TypeScript', note: 'Tailwind, Recharts' },
        {
          label: 'Supabase',
          children: [
            { label: 'Auth' },
            { label: 'PostgreSQL + RLS', note: 'Workspace isolation' },
            { label: 'Storage', note: 'Signed URLs' },
            { label: 'pg_cron', note: 'Scheduled jobs' },
          ],
        },
      ],
    },
  },
  engineeringChallenges: [
    {
      title: 'Isolation by construction',
      body: 'Workspace data is protected by Row Level Security policies, and the database test suite exercises them.',
    },
    {
      title: 'Relating money, work and rights',
      body: 'Campaigns, deliverables, rights and invoices are related records, so consistency is a schema concern rather than something the interface can guarantee alone.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Rules in the database',
      body: 'Authorisation and integrity live in PostgreSQL, so every client, including future ones, gets the same guarantees.',
    },
  ],
  testing: [
    'pgTAP database tests alongside roughly twenty migrations.',
    'Vitest and Testing Library component tests across the main screens.',
    'Counts are not quoted because they were not taken from a recorded run.',
  ],
  currentStatus:
    'Active development. The planned phases for campaigns, rights, finance, tasks, documents, notifications and analytics are implemented.',
  scopeNotes: [
    'Not publicly deployed. Real email delivery has not been exercised end to end.',
    'No screenshots are shown, because capturing the app would need sanitised sample data. The diagram describes the structure.',
  ],
}
