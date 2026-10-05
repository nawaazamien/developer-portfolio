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
  app/            router, root layout, scroll and focus management
  pages/          route components: home, case study, not found
  components/     homepage sections, ProjectCard, Media, case-study pieces (diagram, gallery)
  data/           typed, centralised content: profile, experience, services, projects, case studies
  assets/         optimised project images, one folder per project
  hooks/          shared hooks (scroll-reveal, page metadata, route focus)
  integrations/   seam for future GitHub-derived project metadata
  lib/            project selection, labels, repository-visibility rules, validation
  styles/         design tokens and base styles; component CSS sits beside its component
```

The homepage is a single scrolling view; each project also has a case-study page at `/projects/<slug>`. UI renders only from `src/data` through `src/lib`; nothing project-specific is hardcoded in components.

### Routing

React Router (`/` and `/projects/:slug`, plus a not-found route). The case-study route is code-split, so the homepage bundle does not carry case-study content. After each navigation the page heading receives focus, hash links scroll to and focus their section, and each page sets its own document title and description.

GitHub Pages has no SPA rewrites, so the build emits real files: a copy of `index.html` at `projects/<slug>/index.html` for every project (so direct links and refreshes return 200 with a route-specific title), and a `404.html` that Pages serves for unknown URLs, which the app renders as its not-found page. The list of slugs lives in `src/data/projectSlugs.ts`, and a test keeps it in step with the project data. The router's basename comes from Vite's base, so everything still works under `/developer-portfolio/` and, later, at a custom domain root.

### Project data model

A `Project` (see `src/data/types.ts`) carries category, status, visibility, technologies, highlights, media (`thumbnail`, `screenshots` with alt text, caption and dimensions) and a display order. Its case study — overview, problem, features, architecture diagram, challenges, decisions, testing and status — is structured data in `src/data/caseStudies`, rendered by one reusable page. Curated fields are kept separate from fields a GitHub sync can derive later (last push, language, releases), which are layered on by `enrichProject` in `src/integrations/github`.

### Public links and contact

`src/data/links.ts` is the single home for the canonical public URLs (GitHub, this site, SaaS Foundation and its demo, case-study URLs) and for the one public contact address, which is already shown on the GitHub profile. The address is rendered in the footer only and is kept out of structured data and page metadata. SaaS Foundation is the only project that sets a repository and live URL, and its card is marked "Public source".

### Private projects

A private project shows its description, stack, status and screenshots with a "Private repository" badge and **no source link**. Repository links are read only through `getRepositoryUrl`, which returns nothing for private projects, and `npm test` fails if a private project carries a repository URL. The future GitHub sync is designed to run at build time with a secret held in Actions, keyed by project id so private repository names never reach the client bundle.

### Search and social metadata

Metadata is generated at build time so crawlers and link-preview scrapers that do not run JavaScript still get it. `src/seo` builds, for the homepage, every case study and the credits page: a title and specific description, a canonical URL, Open Graph and Twitter tags, a 1200×630 social card and JSON-LD (a `Person` on the homepage; a conservative `SoftwareApplication` or `CreativeWork` plus breadcrumbs on each case study). The same build emits `sitemap.xml` and `robots.txt`. Per-project copy lives in `src/data/projectSlugs.ts`; verified public identity facts in `src/data/identity.ts`.

The site URL comes from the `SITE_URL` environment variable (the Pages workflow passes the origin and base path GitHub reports) and defaults to the Pages URL, so a custom domain needs no code change. Note that crawlers only read `robots.txt` at a host root, so it takes full effect once the site is served from one.

Social cards are branded designs, not screenshots. Regenerate them with `npm run social-cards` (requires Chrome); they are written to `public/social/`.

### Content safeguards

`npm test` validates the dataset, routing and SEO output — unique ids and slugs, a case study for every project, project-specific descriptions, canonical URLs, sitemap and structured data, no repository link on private project pages, https-only external links, alt text on every image, base-aware links and not-found handling — and runs automatically before every build and in CI.

## Media and credits

Project captures live in `src/assets/projects/<slug>/` as optimised WebP copies, imported by `src/data/projects.ts` so Vite hashes them and applies the base path. Every image carries alt text, an optional caption and its dimensions. Captures of web apps use fictional sample data only, and nothing containing private data, credentials or customer information is committed. Projects without a safe capture show an intentional empty tile. Where a project has no safe screenshot (a research system, a command-line pipeline, a backend platform), the media is an explanatory graphic built from real project facts and outputs, never a fabricated UI: `npm run technical-visuals` renders them (Chrome and ffmpeg required) from `scripts/technical-visuals/`, including a render-validation report produced by running the YouTube pipeline's own validator on synthetic test clips. Third-party assets and tools are credited on the `/credits` page (data in `src/data/credits.ts`).

### Performance

The two body fonts (Oswald and Nunito, SIL OFL 1.1) are self-hosted as latin variable subsets via Fontsource, so first paint does not wait on a third-party stylesheet, and the build preloads them and the hero portrait. Case-study content is a separate route chunk. Assets are content-hashed by Vite; note that GitHub Pages serves them with a short (10 minute) cache lifetime.

## Deployment

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main` (or manually via *Run workflow*). The workflow validates first (install, lint, tests, type-check and build) and only then configures Pages, builds with the Pages base path, and deploys.

The Vite base path comes from `VITE_BASE_PATH` and falls back to `/`, so local development is unaffected. In CI it is taken from the Pages metadata (`/developer-portfolio/` for the default project URL), which means a custom domain later needs no code change — Pages then reports an empty base path.

To preview the production base locally:

```powershell
$env:VITE_BASE_PATH = "/developer-portfolio/"; npm run build; npm run preview
```
