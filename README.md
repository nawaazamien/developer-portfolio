# Nawaaz Amien — Developer Portfolio

[**Live site →**](https://nawaazamien.github.io/developer-portfolio/)

Personal software-engineering portfolio for Nawaaz Amien, covering production-oriented web applications, SaaS systems, automation, quantitative research tooling and interactive projects. Most of the showcased work lives in private repositories, so the site is built to present it — status, stack, engineering highlights and real screenshots — without exposing source.

## Stack

- React 19, TypeScript, Vite
- Plain modern CSS with design tokens (CSS variables); no UI framework
- Oxlint for linting, Vitest for content/data validation
- GitHub Actions + GitHub Pages for deployment

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # validate data, type-check, and build to dist/
npm run preview   # serve the production build locally
npm run lint      # lint with Oxlint
npm test          # validate portfolio data (Vitest)
```

Requires a current Node.js LTS (24 is used in CI).

## Architecture

```
src/
  components/     UI sections (Header, Hero, About, Work, Capabilities, Projects, Footer), ProjectCard, Media
  data/           typed, centralised content: profile, experience, services, projects
  assets/         optimised project images, one folder per project
  hooks/          shared hooks (scroll-reveal)
  integrations/   seam for future GitHub-derived project metadata
  lib/            project selection, labels, repository-visibility rules, validation
  styles/         design tokens and base styles; component CSS sits beside its component
```

The page is a single scrolling view with in-page anchors. UI renders only from `src/data` through `src/lib`; nothing project-specific is hardcoded in components.

### Project data model

A `Project` (see `src/data/types.ts`) carries category, status, visibility, technologies, highlights, media (`thumbnail`, `screenshots` with alt text, caption and dimensions), an optional case study and a display order. Curated fields are kept separate from fields a GitHub sync can derive later (last push, language, releases), which are layered on by `enrichProject` in `src/integrations/github`.

### Private projects

A private project shows its description, stack, status and screenshots with a "Private repository" badge and **no source link**. Repository links are read only through `getRepositoryUrl`, which returns nothing for private projects, and `npm test` fails if a private project carries a repository URL. The future GitHub sync is designed to run at build time with a secret held in Actions, keyed by project id so private repository names never reach the client bundle.

### Content safeguards

`npm test` validates the dataset — unique ids and slugs, at least one featured project, no repository on private projects, https-only external links, alt text on every image — and runs automatically before every build and in CI.

## Deployment

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main` (or manually via *Run workflow*). The workflow validates first (install, lint, tests, type-check and build) and only then configures Pages, builds with the Pages base path, and deploys.

The Vite base path comes from `VITE_BASE_PATH` and falls back to `/`, so local development is unaffected. In CI it is taken from the Pages metadata (`/developer-portfolio/` for the default project URL), which means a custom domain later needs no code change — Pages then reports an empty base path.

To preview the production base locally:

```powershell
$env:VITE_BASE_PATH = "/developer-portfolio/"; npm run build; npm run preview
```
