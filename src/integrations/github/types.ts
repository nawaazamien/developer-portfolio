/**
 * Repository metadata a future build-time sync will produce. Intentionally
 * limited to fields that are safe to publish.
 */
export interface RepositoryActivity {
  /** `owner/name`, matched against the curated project's repository. */
  fullName: string
  pushedAt?: string
  primaryLanguage?: string
  latestRelease?: { tag: string; url: string; publishedAt: string }
  homepageUrl?: string
}
