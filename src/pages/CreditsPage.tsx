import { Link } from 'react-router'
import { credits, screenshotNote } from '../data/credits'
import { usePageMeta } from '../hooks/usePageMeta'
import { useRouteFocus } from '../hooks/useRouteFocus'
import { creditsMeta } from '../seo/metadata'
import './CreditsPage.css'

const meta = creditsMeta()

export function CreditsPage() {
  usePageMeta(meta)
  const headingRef = useRouteFocus<HTMLHeadingElement>()

  return (
    <main id="main" className="section credits">
      <span className="circle credits__circle" aria-hidden="true" />
      <h1 ref={headingRef} tabIndex={-1} className="section__heading credits__title">
        Credits and licences
      </h1>
      <p className="credits__intro">
        Third-party assets and tools behind the projects shown on this site.
      </p>

      <ul className="credits__list">
        {credits.map((credit) => (
          <li key={credit.name} className="card credits__item">
            <h2>
              {credit.name} <span>by {credit.by}</span>
            </h2>
            <p>{credit.usedFor}</p>
            <p className="credits__terms">{credit.terms}</p>
            <a href={credit.url} target="_blank" rel="noreferrer">
              {new URL(credit.url).host}
            </a>
          </li>
        ))}
      </ul>

      <p className="credits__note">{screenshotNote}</p>
      <p className="credits__back">
        <Link to="/">Back to the portfolio</Link>
      </p>
    </main>
  )
}
