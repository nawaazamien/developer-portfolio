import { Link } from 'react-router'
import { githubUrl, profile } from '../data/profile'
import './Header.css'

const NAV_LINKS = [
  { hash: '#home', label: 'Home' },
  { hash: '#work', label: 'Work' },
  { hash: '#capabilities', label: 'What I build' },
  { hash: '#projects', label: 'Projects' },
  { hash: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="header">
      <nav className="header__nav" aria-label="Primary">
        <Link
          className="header__brand"
          to={{ pathname: '/', hash: '#home' }}
          aria-label={`${profile.name} — home`}
        >
          <span className="header__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="header__name" aria-hidden="true">
            {profile.firstName}
            <br />
            {profile.lastName}
          </span>
        </Link>
        <ul className="header__links">
          {NAV_LINKS.map((link) => (
            <li key={link.hash}>
              <Link to={{ pathname: '/', hash: link.hash }}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a
              className="btn btn--primary header__cta"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
