import { esc, page } from './styles.mjs'

/*
 * Graphics for the Atlas, Anti Social Publisher, Boat Jam and Mars Cleaners
 * case studies. They are explanatory diagrams built from each project's own
 * documentation and code layout — no product screenshots, no customer or
 * account data, no private URLs or identifiers.
 */

const box = (label, note, extra = '') =>
  `<div class="panel node ${extra}"><div class="nl">${esc(label)}</div>${note ? `<div class="nn">${esc(note)}</div>` : ''}</div>`

const nodeCss = `
  .node { padding: 16px 18px; }
  .nl { font: 800 17px Nunito, sans-serif; }
  .nn { font: 400 13.5px/1.45 Nunito, sans-serif; color: #a3a3a3; margin-top: 6px; }
  .flow { display: flex; align-items: stretch; gap: 14px; margin-top: 30px; }
  .flow > .panel { flex: 1; }
  .flow > .arrow { flex: 0 0 auto; }
`

export const atlasArchitecture = {
  file: 'atlas/platform-architecture',
  slug: 'atlas',
  width: 1200,
  height: 470,
  html: page(
    `.canvas { width: 1200px; height: 470px; } ${nodeCss}`,
    `<div class="canvas">
      <div class="eyebrow">Atlas · Architecture</div>
      <h1>Three repositories, one tenant boundary</h1>
      <div class="flow">
        ${box('Web client', 'React 19 · Vite · TypeScript · TanStack Query. API types generated from the OpenAPI contract.')}
        <div class="arrow">→</div>
        ${box('API', 'FastAPI on Python 3.12. JWT verified against the auth provider’s signing keys. Every route declares a permission key.')}
        <div class="arrow">→</div>
        ${box('Database', 'Supabase PostgreSQL. The API connects as a role that cannot bypass Row Level Security.')}
      </div>
      <div class="flow">
        ${box('Checks in CI', 'Lint, strict types, unit tests, OpenAPI contract check, build.')}
        <div class="arrow"> </div>
        ${box('Checks in CI', 'Lint, strict mypy, pytest, startup check, DB-backed integration tests.')}
        <div class="arrow"> </div>
        ${box('Checks in CI', 'Migrations applied to a fresh local stack, pgTAP policy tests, phase-upgrade scripts.')}
      </div>
      <div class="foot">Workflows are defined and run on demand; they are not a merge gate. Internal development environment — not a production service.</div>
    </div>`,
  ),
}

const mod = (name) => `<span class="chip">${esc(name)}</span>`
const group = (title, items, note) =>
  `<div class="panel grp"><div class="label">${esc(title)}</div><div class="chips">${items.map(mod).join('')}</div>${note ? `<div class="nn">${esc(note)}</div>` : ''}</div>`

export const atlasModules = {
  file: 'atlas/module-map',
  slug: 'atlas',
  width: 1280,
  height: 570,
  html: page(
    `.canvas { width: 1280px; height: 570px; }
     .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 26px; }
     .grp { padding: 18px 20px; }
     .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
     .nn { font: 400 13.5px/1.45 Nunito, sans-serif; color: #a3a3a3; margin-top: 12px; }
     .wide { grid-column: 1 / -1; }`,
    `<div class="canvas">
      <div class="eyebrow">Atlas · Modules</div>
      <h1>Operations and finance on one data model</h1>
      <div class="grid">
        ${group('Operations', ['Customers', 'Equipment', 'Jobs & dispatch', 'Quotes', 'Rentals', 'Inspections & certificates', 'Maintenance plans', 'Inventory & stock', 'Purchasing', 'Service requests', 'Scheduling & tasks', 'Customer portal'], 'Operational records that finance work builds on.')}
        ${group('Finance', ['Invoices & payments', 'Receivables ageing', 'Payables', 'General ledger', 'Trial balance · P&L · balance sheet', 'Periods & year-end close', 'Bank import', 'Bank reconciliation', 'VAT', 'Fixed assets & depreciation', 'Operational & rental billing'], 'Postings are made from operational events and controlled by periods.')}
        ${group('Platform controls', ['Organisations & branches', 'Memberships & invitations', 'Permission registry', 'Per-user overrides', 'Audit events', 'Row Level Security', 'Documents & storage', 'Email outbox & statements', 'Operational reporting'])}
        ${group('Not built', ['Subscription / tenant billing', 'Platform admin', 'Production hardening', 'Backups & recovery'], 'Planned only. Listed so the scope is clear.')}
      </div>
    </div>`,
  ),
}

const status = (kind, text) => `<span class="st ${kind}">${esc(text)}</span>`
const row = (platform, kind, state, detail) =>
  `<tr><td class="p">${esc(platform)}</td><td>${status(kind, state)}</td><td class="d">${esc(detail)}</td></tr>`

export const publisherStatus = {
  file: 'anti-social-publisher/platform-status',
  slug: 'anti-social-publisher',
  width: 1280,
  height: 510,
  html: page(
    `.canvas { width: 1280px; height: 510px; }
     table { width: 100%; border-collapse: collapse; margin-top: 26px; }
     td { padding: 14px 12px; border-top: 1px solid #2c2c2c; vertical-align: top; }
     .p { font: 800 17px Nunito, sans-serif; width: 190px; }
     .d { font: 400 14.5px/1.5 Nunito, sans-serif; color: #b4b4b4; }
     .st { display: inline-block; padding: 4px 10px; border-radius: 3px; font: 800 12px Nunito, sans-serif; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; }
     .live { background: #1f3a2a; color: #9be2b4; }
     .fake { background: #3a3320; color: #ecd58a; }
     .pend { background: #2c2c2c; color: #d0d0d0; }
     .none { background: #1a1a1a; color: #8a8a8a; border: 1px solid #333; }
     td:nth-child(2) { width: 190px; }`,
    `<div class="canvas">
      <div class="eyebrow">Anti Social Publisher · Integration status</div>
      <h1>What is live, what is tested, what is pending</h1>
      <table>
        ${row('YouTube', 'live', 'Live-validated', 'Private uploads published through the app, including an interrupted upload resumed without a duplicate. Public/unlisted visibility and the revoked-consent path are not yet validated.')}
        ${row('YouTube scheduling', 'pend', 'Live test pending', 'Built and tested against fakes. A read-only preflight exists; the supervised live scheduled test has not been run.')}
        ${row('Instagram Reels', 'live', 'Single live test', 'One real Reel published under a development-mode app. No app review; not a production integration.')}
        ${row('Facebook Reels', 'fake', 'Fake-validated', 'Chunked-upload flow validated against a fake provider only. Live validation is deferred.')}
        ${row('TikTok', 'none', 'Research only', 'Platform constraints documented. No code.')}
      </table>
      <div class="foot">Derived from the project’s phase acceptance documents. No platform other than these is implemented.</div>
    </div>`,
  ),
}

const state = (label, note, kind = '') =>
  `<div class="panel node st2 ${kind}"><div class="nl">${esc(label)}</div><div class="nn">${esc(note)}</div></div>`

export const publisherLifecycle = {
  file: 'anti-social-publisher/job-lifecycle',
  slug: 'anti-social-publisher',
  width: 1200,
  height: 470,
  html: page(
    `.canvas { width: 1200px; height: 470px; } ${nodeCss}
     .st2 { min-height: 112px; }`,
    `<div class="canvas">
      <div class="eyebrow">Anti Social Publisher · Worker</div>
      <h1>A publishing job never retries blindly</h1>
      <div class="flow">
        ${state('Queued', 'Created from a source item; checked against quotas.')}
        <div class="arrow">→</div>
        ${state('Leased', 'One worker holds a time-limited lease. Expired leases are reclaimed.')}
        <div class="arrow">→</div>
        ${state('Uploading', 'The resumable session is stored encrypted before any bytes are sent.')}
        <div class="arrow">→</div>
        ${state('Published', 'Temporary media removed after a retention window.')}
      </div>
      <div class="flow">
        ${state('Retry scheduled', 'Transient failures wait and try again.')}
        <div class="arrow"> </div>
        ${state('Reconciling', 'If the outcome is unknown, check the platform before any retry, so a video is never posted twice.')}
        <div class="arrow"> </div>
        ${state('Failed permanently', 'After the maximum attempts. Visible to the user.')}
      </div>
      <div class="foot">Simplified from the project’s documented, database-enforced state machine.</div>
    </div>`,
  ),
}

export const boatJamSolver = {
  file: 'boat-jam/solver-pipeline',
  slug: 'boat-jam',
  width: 1200,
  height: 470,
  html: page(
    `.canvas { width: 1200px; height: 470px; } ${nodeCss}`,
    `<div class="canvas">
      <div class="eyebrow">Boat Jam · Puzzle tooling</div>
      <h1>Levels are generated, solved and measured</h1>
      <div class="flow">
        ${box('Generator', 'Produces candidate levels as validated JSON data.')}
        <div class="arrow">→</div>
        ${box('Rules engine', 'One pure rules implementation shared by play and tooling.')}
        <div class="arrow">→</div>
        ${box('BFS solver', 'Exhaustive breadth-first search with a safety limit.')}
        <div class="arrow">→</div>
        ${box('Analyser', 'Solution length and branching metrics used to grade difficulty.')}
      </div>
      <div class="foot">Two hand-made levels ship today; generated packs are pending owner review. Headless tests cover rules, solver, generator, analyser and calibration.</div>
    </div>`,
  ),
}

export const marsDeterminism = {
  file: 'mars-cleaners/authoritative-simulation',
  slug: 'mars-cleaners',
  width: 1200,
  height: 470,
  html: page(
    `.canvas { width: 1200px; height: 470px; } ${nodeCss}`,
    `<div class="canvas">
      <div class="eyebrow">Mars Cleaners · Systems</div>
      <h1>Gameplay state has one authority</h1>
      <div class="flow">
        ${box('Interaction', 'Player input becomes validated commands and events.')}
        <div class="arrow">→</div>
        ${box('Tool authority', 'The tool decides what a stroke is allowed to do.')}
        <div class="arrow">→</div>
        ${box('Dust simulation', 'Chunked coverage data that is the single source of truth.')}
        <div class="arrow">→</div>
        ${box('Ledger & save', 'Resources are conserved; saves detect corruption.')}
      </div>
      <div class="foot">Headless tests include a real physics controller and byte-identical determinism checks. Local project — early phases only.</div>
    </div>`,
  ),
}
