import { About } from './components/About'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Work } from './components/Work'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page">
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Work />
          <Services />
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
