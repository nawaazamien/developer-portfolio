# GitHub integration seam

Reserved for the future GitHub layer (not built yet).

## Curated vs GitHub-derived data

- **Curated** (`src/data/projects.ts`, type `Project`): descriptions, featured flag, category, screenshots, highlights, case studies, and the repository URL of *public* projects.
- **GitHub-derived** (`RepositoryActivity`): last push, primary language, latest release, homepage URL.

`enrichProject` layers the second over the first. Curated values win; activity only fills gaps.

## Intended flow

1. A scheduled GitHub Actions workflow runs at **build time** with a token held in repository secrets. No token ever reaches the browser.
2. The workflow holds the private `projectId → repository` mapping in its own config, not in the client bundle, and fetches metadata for each project.
3. It writes a static JSON snapshot of publishable fields, keyed by `projectId`.
4. The app loads the snapshot and passes each project through `enrichProject`.

Private projects only ever receive non-identifying fields; repository URLs and release links are applied to public projects only.
