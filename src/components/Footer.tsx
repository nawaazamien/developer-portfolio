import { Link } from 'react-router'
import { contactEmail, contactHref, cvFileName, publicLinks } from '../data/links'
import { githubUrl, portfolioSourceUrl, profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import './Footer.css'

const COPYRIGHT_YEAR = new Date().getFullYear()

const FOOTER_LINKS = [
  { hash: '#home', label: 'Home' },
  { hash: '#work', label: 'Work' },
  { hash: '#capabilities', label: 'What I build' },
  { hash: '#projects', label: 'Projects' },
]

export function Footer() {
  const { ref, className } = useReveal<HTMLElement>()

  return (
    <footer
      ref={ref}
      id="contact"
      className={`footer ${className}`}
      aria-labelledby="contact-title"
    >
      <div className="footer__cta">
        <span className="footer__mark" aria-hidden="true">
          {profile.initials}
        </span>
        <h2 id="contact-title">Interested in my work? Take a look at my GitHub.</h2>
        <p>
          Most of my projects are in private repositories, so this portfolio
          shows what they are and how they are built. SaaS Foundation and this
          site are public source.
        </p>
        <div className="footer__actions">
          <a
            className="btn btn--primary footer__button"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub
          </a>
          <a
            className="btn btn--outline footer__button"
            href={`${import.meta.env.BASE_URL}${cvFileName}`}
            download={cvFileName}
          >
            Download CV
          </a>
          <a className="btn btn--outline footer__button" href={contactHref}>
            Email me
          </a>
        </div>
      </div>

      <div className="footer__column">
        <h3>Find me</h3>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          github.com/nawaazamien
        </a>
        <a href={publicLinks.saasFoundation.repository} target="_blank" rel="noreferrer">
          Code sample: SaaS Foundation
        </a>
        <a href={publicLinks.saasFoundation.demo} target="_blank" rel="noreferrer">
          SaaS Foundation live demo
        </a>
        <a href={portfolioSourceUrl} target="_blank" rel="noreferrer">
          Source of this site
        </a>
        <a href={contactHref}>{contactEmail}</a>
        <span>{profile.location}</span>
      </div>

      <nav className="footer__column" aria-label="Footer">
        <h3>Links</h3>
        {FOOTER_LINKS.map((link) => (
          <Link key={link.hash} to={{ pathname: '/', hash: link.hash }}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="footer__legal">
        <span>
          © {COPYRIGHT_YEAR} {profile.name} · <Link to="/credits">Credits and licences</Link>
        </span>
        <span>{profile.roleLabel} · {profile.location}</span>
      </div>
    </footer>
  )
}
