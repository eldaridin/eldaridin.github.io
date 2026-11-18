import { Link } from 'react-router-dom'
import { portfolio } from '../data/portfolio'

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/">
          {portfolio.shortName}
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="nav">
            {portfolio.sections.map((section) => (
              <li key={section.id}>
                <Link to={`/#${section.id}`}>{section.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/user/eldaridin">GitHub</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
