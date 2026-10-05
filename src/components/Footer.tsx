import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import './Footer.css'

const FOOTER_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
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
        <h2 id="contact-title">I am eager to connect with you and hear your thoughts.</h2>
        <p>Have a project or role in mind? Send a note — I usually reply within a day.</p>
        <a className="btn btn--primary footer__button" href={`mailto:${profile.email}`}>
          Say hello
        </a>
      </div>

      <div className="footer__column">
        <h3>Contact</h3>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span>{profile.phone}</span>
        <span>{profile.location}</span>
      </div>

      <nav className="footer__column" aria-label="Footer">
        <h3>Links</h3>
        {FOOTER_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="footer__legal">
        <span>© 2026 {profile.name}</span>
        <span>Designed &amp; built with care</span>
      </div>
    </footer>
  )
}
