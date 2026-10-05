# GitHub integration seam

Reserved for the future GitHub layer (not built in Phase 0).

Intended flow:

1. A scheduled GitHub Actions workflow runs at **build time**, using a token held in repository secrets. No token ever reaches the browser.
2. It fetches metadata (latest push, primary language, latest release, homepage URL) for the repositories named in `src/data/projects.ts`.
3. It writes a static JSON snapshot of **publishable** fields only (see `RepositoryActivity`).
4. The app loads that snapshot and passes each project through `enrichProject`. Curated data wins; activity only fills gaps.

Private repositories are matched by the workflow but only non-identifying fields (never the URL) are written to the snapshot.
