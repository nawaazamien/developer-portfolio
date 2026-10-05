import { About } from '../components/About'
import { Capabilities } from '../components/Capabilities'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Work } from '../components/Work'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, usePageMeta } from '../hooks/usePageMeta'

export function HomePage() {
  usePageMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION)

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
