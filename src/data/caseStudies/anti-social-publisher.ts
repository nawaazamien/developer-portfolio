import type { CaseStudy } from '../types'

export const antiSocialPublisher: CaseStudy = {
  summary:
    'A publishing automation system that takes a source video and publishes it to social platforms through OAuth-connected accounts, using an asynchronous worker built to survive failure without posting twice.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Anti Social Publisher turns a source item into a platform post. A web app handles sign-in and account connection, an API creates and tracks jobs, and a separate Python worker performs the uploads, with retries, leases and cleanup managed through PostgreSQL.',
    'The interesting work is reliability: uploads that can be interrupted and resumed, credentials that are encrypted at rest, and a state machine that checks the platform before retrying an unknown outcome. Integration status varies by platform, and is stated plainly below.',
  ],
  problem: [
    'Publishing to social platforms is a chain of fragile steps: OAuth consent, large resumable uploads and rate limits, with each platform failing differently. A naive script can post a video twice or lose a credential, so the goal was a system whose failure modes are explicit and tested.',
  ],
  keyFeatures: [
    {
      title: 'OAuth account connection',
      body: 'Google (YouTube), Meta Instagram Login and Facebook Page authorisation, with tokens stored encrypted and scoped per organisation.',
    },
    {
      title: 'Resumable uploads',
      body: 'The YouTube adapter persists its encrypted resumable-session reference before sending any bytes, and reconciles against the platform after an interruption so a video is adopted rather than duplicated.',
    },
    {
      title: 'Asynchronous worker',
      body: 'A Python worker claims jobs under time-limited leases. An expired lease is reclaimed by a sweeper so work is not stuck behind a crashed process.',
    },
    {
      title: 'Retries and reconciliation',
      body: 'Transient failures are rescheduled, permanent failures are recorded after a maximum number of attempts, and an unknown outcome enters a reconciling state that checks the platform before any retry.',
    },
    {
      title: 'Cleanup',
      body: 'Temporary media is removed after a retention window, with sweepers for orphaned files.',
    },
    {
      title: 'Encrypted credentials',
      body: 'Envelope encryption: a random data key per secret, wrapped by a versioned key, using AES-256-GCM with the organisation and account bound in as authenticated data.',
    },
  ],
  architecture: {
    summary:
      'A React client and a FastAPI service share a Supabase PostgreSQL database with Row Level Security. The worker is a separate process that reads and updates job state in the same database.',
    diagram: {
      title: 'Components',
      description:
        'A React web app and a FastAPI service create jobs in Supabase PostgreSQL. A separate Python worker claims jobs under leases and calls the YouTube, Instagram and Facebook APIs, writing state back to the database. Temporary media is cleaned up by sweepers.',
      flow: [
        { label: 'Web app', note: 'React · Vite · TypeScript' },
        { label: 'API', note: 'FastAPI · token verification · quotas and rate limits' },
        { label: 'Supabase PostgreSQL', note: 'Row Level Security · job state machine' },
        {
          label: 'Worker',
          children: [
            { label: 'Publisher', note: 'Leases, retries, reconciliation' },
            { label: 'Provider adapters', note: 'YouTube, Instagram, Facebook' },
            { label: 'Sweepers', note: 'Expired leases, temporary media' },
          ],
        },
      ],
    },
  },
  engineeringChallenges: [
    {
      title: 'Never posting twice',
      body: 'When a request times out the outcome is unknown. Rather than retrying blindly, the job moves to a reconciling state and asks the platform what exists.',
    },
    {
      title: 'Platform differences',
      body: 'Each platform has different upload mechanics, quotas and account rules, so provider behaviour sits behind adapters that can be replaced with fakes in tests.',
    },
    {
      title: 'Handling secrets responsibly',
      body: 'Credentials are encrypted at rest, and a documented incident from a live test led to token rotation and tighter handling rather than being hidden.',
    },
  ],
  technicalDecisions: [
    {
      title: 'A database-enforced state machine',
      body: 'Legal job transitions are enforced in PostgreSQL, so neither the API nor the worker can put a job into an impossible state.',
    },
    {
      title: 'Fakes first, then supervised live tests',
      body: 'Provider behaviour is built and tested against fakes, then validated live in small, supervised steps with the results recorded.',
    },
  ],
  testing: [
    'pgTAP database tests for policies and the job state machine, run on PostgreSQL 16.',
    'Python unit tests for the API and worker, and Vitest tests for the web app and shared types.',
    'Playwright browser tests in two suites: one against mocks, one against a disposable real Supabase stack with real authentication.',
    'CI runs secret scanning over full history, lint, type checks, all test layers and a build.',
    'Test counts are not quoted because they were not taken from a recorded run.',
  ],
  currentStatus:
    'Active development, about eleven days of work. YouTube is live-validated for private uploads. Instagram has had a single live Reel under a development-mode app. Facebook is validated against a fake provider only. YouTube scheduling is built and fake-tested; its supervised live test is pending.',
  scopeNotes: [
    'This is not a production multi-platform publisher: public YouTube visibility and revoked-consent handling are not yet validated, Instagram is not app-reviewed, and Facebook has not been run live.',
    'TikTok was researched only. No code exists for it, or for any other platform.',
    'No screenshots are shown because real captures would show connected accounts. The status and lifecycle diagrams are derived from the project’s own documents.',
  ],
  lessons: [
    'Writing down what is live, fake-validated and pending kept the project honest and made each next step small enough to supervise.',
  ],
}
