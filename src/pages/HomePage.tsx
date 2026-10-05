import { About } from '../components/About'
import { Capabilities } from '../components/Capabilities'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Work } from '../components/Work'
import { usePageMeta } from '../hooks/usePageMeta'
import { SITE_URL } from '../seo/applyHead'
import { homeMeta } from '../seo/metadata'

const meta = homeMeta(SITE_URL)

export function HomePage() {
  usePageMeta(meta)

  return (
    <main id="main">
      <Hero />
      <About />
      <Work />
      <Capabilities />
      <Projects />
    </main>
  )
}
