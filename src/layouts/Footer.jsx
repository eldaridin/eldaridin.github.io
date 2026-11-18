import { portfolio } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {portfolio.shortName} · Santiago, Chile
      </p>
    </footer>
  )
}
