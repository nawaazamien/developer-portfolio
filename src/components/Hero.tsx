import { profile, socialLinks } from '../data/profile'
import { useRouteFocus } from '../hooks/useRouteFocus'
import { Media } from './Media'
import './Hero.css'

export function Hero() {
  const [roleLead, ...roleRest] = profile.roleLabel.split(' ')
  const headingRef = useRouteFocus<HTMLHeadingElement>()

  return (
    <section id="home" className="section hero" aria-labelledby="hero-title">
      <span className="circle hero__circle" aria-hidden="true" />

      <p className="hero__role">
        <span className="hero__role-light">{roleLead}</span>
        <span className="hero__role-bold">{roleRest.join(' ')}</span>
      </p>

      <div className="hero__body">
        <div className="hero__portrait">
          <Media
            image={profile.portrait}
            label={profile.initials}
            className="hero__portrait-media"
          />
          <div className="hero__fade" aria-hidden="true" />
        </div>
        <div className="hero__copy">
          <h1 ref={headingRef} tabIndex={-1} id="hero-title" className="hero__title">
            <span className="hero__first">{profile.firstName}</span>
            <span className="hero__last">{profile.lastName}</span>
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              Projects
            </a>
            <a className="btn btn--outline" href="#about">
              About me
            </a>
          </div>
        </div>
      </div>

      <ul className="hero__socials" aria-label="Social links">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <a
              className="hero__social"
              href={link.href}
              aria-label={link.name}
              title={link.name}
              target="_blank"
              rel="noreferrer"
            >
              {link.short}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
