import { profile } from '../data/profile'
import './Header.css'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="header">
      <nav className="header__nav" aria-label="Primary">
        <a className="header__brand" href="#home" aria-label={`${profile.name} — home`}>
          <span className="header__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="header__name" aria-hidden="true">
            {profile.firstName}
            <br />
            {profile.lastName}
          </span>
        </a>
        <ul className="header__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a className="btn btn--primary header__cta" href="#contact">
              Let's get in touch
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
