import { Link } from 'react-router'
import { usePageMeta } from '../hooks/usePageMeta'
import { useRouteFocus } from '../hooks/useRouteFocus'
import { notFoundMeta } from '../seo/metadata'
import './NotFoundPage.css'

const meta = notFoundMeta()

export function NotFoundPage() {
  usePageMeta(meta)
  const headingRef = useRouteFocus<HTMLHeadingElement>()

  return (
    <main id="main" className="section not-found">
      <span className="circle not-found__circle" aria-hidden="true" />
      <p className="not-found__code" aria-hidden="true">
        404
      </p>
      <h1 ref={headingRef} tabIndex={-1} className="section__heading">
        Page not found
      </h1>
      <p className="not-found__text">
        That page or project doesn’t exist, or the link may be out of date.
      </p>
      <div className="not-found__actions">
        <Link className="btn btn--primary" to={{ pathname: '/', hash: '#projects' }}>
          View projects
        </Link>
        <Link className="btn btn--outline" to="/">
          Back to home
        </Link>
      </div>
    </main>
  )
}
