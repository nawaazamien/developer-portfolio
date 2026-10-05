import { lazy, Suspense } from 'react'

const CaseStudyPage = lazy(() =>
  import('../pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
)

/** Loads the case-study page on demand so the homepage bundle stays small. */
export function CaseStudyRoute() {
  return (
    <Suspense fallback={<main id="main" className="section" aria-busy="true" />}>
      <CaseStudyPage />
    </Suspense>
  )
}
