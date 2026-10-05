# Developer Portfolio

Personal software-engineering portfolio for Nawaaz Amien, built for recruiter screening, CVs, job applications and technical interviews. The visual design is approved in Claude Design and implemented here as production React + CSS.

## Stack

- React 19, TypeScript, Vite
- Plain modern CSS with design tokens (CSS variables) — no UI framework
- Oxlint for linting

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and produce a production build in dist/
npm run preview   # serve the production build locally
npm run lint      # lint with Oxlint
npm test          # validate portfolio data (Vitest)
```

Requires a current Node.js LTS.

## Architecture

```
src/
  components/     UI sections (Header, Hero, About, Work, Capabilities, Projects, Footer), ProjectCard, Media
  data/           typed, centralised content (profile, experience, services, projects)
  hooks/          shared hooks (scroll-reveal)
  integrations/   future GitHub integration seam (see its README)
  lib/            small data helpers (project selection, labels, repository visibility rules, data validation)
  styles/         design tokens and base styles; component CSS sits beside its component
```

The page is a single scrolling view with in-page anchors, so there is no router yet. Routes such as `/projects` and `/projects/:slug` can be added later without restructuring: components read from `src/data` through `src/lib`, not from hardcoded markup.

### Project data

Projects are described by the `Project` type in `src/data/types.ts` (status, visibility, technologies, repository, screenshots, case study, display order, …) and curated in `src/data/projects.ts`. UI renders from this data only.

Private projects can be shown without exposing source: repository links must be read through `getRepositoryUrl`, which returns nothing for `visibility: 'private'`.

### Future GitHub integration

`src/integrations/github` holds the seam. The plan is a build-time GitHub Actions job that reads repository metadata (latest push, language, release, homepage) with a secret token and writes a static JSON snapshot of publishable fields, which `enrichProject` layers over the curated data. No token is ever used in the browser. See the README in that folder.

### Content status

All copy is factual: only verified details are published (GitHub link, role, education, location, real projects). Employer details are intentionally omitted, and no contact email, phone or other social links appear until verified ones exist. Add them in `src/data/profile.ts`; entries without an `href` are never rendered.

No portrait has been supplied, so the hero shows the "NA" tile; most projects also render an intentional empty tile until a safe screenshot exists. Add images through `portrait` in `src/data/profile.ts` and `thumbnail` / `screenshots` in `src/data/projects.ts`.

### Content safeguards

`npm test` validates the dataset (unique ids and slugs, at least one featured project, private projects carry no repository, https-only external links, images have alt text) and runs automatically before `npm run build`.

## Media

Project captures live in `src/assets/projects/<slug>/` as optimised WebP copies of real in-engine screenshots, imported by `src/data/projects.ts` (so Vite hashes them and applies the base path). Each image carries alt text, an optional caption and its dimensions. Projects without a safe capture keep an empty `screenshots` array and show the intentional empty tile. Never commit captures containing private data, credentials or customer information.

## Deployment

Target: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). On every push to `main` (or manually via *Run workflow*) it runs lint, tests and the build as a quality gate, then deploys `dist/`.

**Base path.** `vite.config.ts` reads `VITE_BASE_PATH` and falls back to `/`, so local dev is unaffected. The workflow sets it from `actions/configure-pages`, which reports `/developer-portfolio` for the default project URL (`https://nawaazamien.github.io/developer-portfolio/`) and an empty path under a custom domain. Adding a custom domain therefore needs no code change: configure it in the repository's Pages settings and the next deploy builds with base `/`.

**Preview the production base locally:**

```powershell
$env:VITE_BASE_PATH = "/developer-portfolio/"; npm run build; npm run preview
```

**One-time setup.** In *Settings → Pages*, set *Source* to **GitHub Actions**. GitHub Pages for a *private* repository requires a plan that supports it (Pro, Team or Enterprise); on a free plan the repository must be public, or the plan upgraded, before the deploy job can succeed.
