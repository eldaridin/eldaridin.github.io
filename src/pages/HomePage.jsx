import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Section } from '../components/Section'
import { portfolio } from '../data/portfolio'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView?.()
  }, [hash])

  return (
    <div className="page">
      <header className="intro">
        <h1>{portfolio.name}</h1>
        <p className="intro__title">{portfolio.title}</p>
        <ul className="contact">
          {portfolio.contact.map(({ label, value, href, external }) => (
            <li key={label}>
              <strong>{label}:</strong>{' '}
              {href ? (
                <a
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </li>
          ))}
        </ul>
      </header>

      <Section id="perfil" title="Perfil Profesional">
        <p>{portfolio.profile}</p>
      </Section>

      <Section id="experiencia" title="Experiencia Laboral">
        <p className="empty">Próximamente</p>
      </Section>

      <Section id="educacion" title="Educación">
        {portfolio.education.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="card__meta">
              {item.institution} <span aria-hidden="true">|</span> {item.location}
            </p>
            <p className="card__period">{item.period}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </Section>

      <Section id="habilidades" title="Habilidades y Competencias">
        <div className="skills-grid">
          {portfolio.skills.map((group) => (
            <article className="card" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="bullets">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="certificaciones" title="Certificaciones">
        <p className="empty">Próximamente</p>
      </Section>
    </div>
  )
}
