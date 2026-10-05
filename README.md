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
```

Requires a current Node.js LTS.

## Architecture

```
src/
  components/     UI sections (Header, Hero, About, Work, Services, Projects, Footer) + Media
  data/           typed, centralised content (profile, experience, services, projects)
  hooks/          shared hooks (scroll-reveal)
  integrations/   future GitHub integration seam (see its README)
  lib/            small data helpers (project selection, repository visibility rules)
  styles/         design tokens and base styles; component CSS sits beside its component
```

The page is a single scrolling view with in-page anchors, so there is no router yet. Routes such as `/projects` and `/projects/:slug` can be added later without restructuring: components read from `src/data` through `src/lib`, not from hardcoded markup.

### Project data

Projects are described by the `Project` type in `src/data/types.ts` (status, visibility, technologies, repository, screenshots, case study, display order, …) and curated in `src/data/projects.ts`. UI renders from this data only.

Private projects can be shown without exposing source: repository links must be read through `getRepositoryUrl`, which returns nothing for `visibility: 'private'`.

### Future GitHub integration

`src/integrations/github` holds the seam. The plan is a build-time GitHub Actions job that reads repository metadata (latest push, language, release, homepage) with a secret token and writes a static JSON snapshot of publishable fields, which `enrichProject` layers over the curated data. No token is ever used in the browser. See the README in that folder.

### Content status

Copy and figures are placeholders transcribed from the design (name, jobs, stats, contact details, project entries). Social links without a URL are hidden. Portrait, screenshots and certificates render neutral tiles until images are supplied via the `image` fields in `src/data`.

## Deployment

Target: GitHub Pages via GitHub Actions (added in a later phase). The Vite `base` is intentionally unset: it depends on the final Pages URL (`/<repo>/` for a project site, `/` for a user site or custom domain) and must be set once that is confirmed. Asset links in `index.html` are relative to keep this simple.
