/**
 * Canonical public links: the single place these URLs are written down.
 * Node-safe (no asset imports) so the build, the social-card generator and the
 * UI can all read it. Everything here is already public. Add nothing private.
 */

const github = 'https://github.com/nawaazamien'
const portfolio = 'https://nawaazamien.github.io/developer-portfolio/'

export const publicLinks = {
  github,
  /** The portfolio itself, with trailing slash. */
  portfolio,
  /** This site's source, a public repository. */
  portfolioSource: `${github}/developer-portfolio`,
  saasFoundation: {
    repository: `${github}/saas-foundation`,
    demo: 'https://nawaazamien.github.io/saas-foundation/',
  },
} as const

/** Canonical case-study URL for a project slug. */
export const caseStudyUrl = (slug: string): string => `${portfolio}projects/${slug}/`

/**
 * The recruiter CV is a static file in public/. Keeping the filename stable
 * means links in applications keep working when the PDF is replaced.
 */
export const cvFileName = 'Nawaaz-Amien-Software-Engineer-CV.pdf'
export const cvUrl = `${portfolio}${cvFileName}`

/**
 * The public contact address. It is already shown on the GitHub profile, so
 * using it here adds no new disclosure, but it does add another place a
 * scraper can find it. It is kept out of structured data and rendered in one
 * contact area only.
 */
export const contactEmail = 'nawaazamien9@gmail.com'
export const contactHref = `mailto:${contactEmail}`
