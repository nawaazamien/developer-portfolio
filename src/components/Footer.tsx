import { githubUrl, profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import './Footer.css'

const COPYRIGHT_YEAR = new Date().getFullYear()

const FOOTER_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'What I build' },
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
        <h2 id="contact-title">Interested in my work? Take a look at my GitHub.</h2>
        <p>
          Most of my projects are in private repositories; this portfolio is
          where I show what they are and how they are built.
        </p>
        <a
          className="btn btn--primary footer__button"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          View GitHub
        </a>
      </div>

      <div className="footer__column">
        <h3>Find me</h3>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          github.com/nawaazamien
        </a>
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
        <span>
          © {COPYRIGHT_YEAR} {profile.name}
        </span>
        <span>{profile.roleLabel} · {profile.location}</span>
      </div>
    </footer>
  )
}
