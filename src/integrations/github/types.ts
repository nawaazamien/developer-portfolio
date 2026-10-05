/**
 * GitHub-derived data a future build-time sync will produce, keyed by the
 * curated project's `id` — never by repository name, so private repository
 * names do not ship in the client bundle. Limited to publishable fields.
 */
export interface RepositoryActivity {
  projectId: string
  pushedAt?: string
  primaryLanguage?: string
  /** Only ever set for public repositories. */
  repositoryUrl?: string
  latestRelease?: { tag: string; url: string; publishedAt: string }
  homepageUrl?: string
}
