import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header style={{ padding: '1rem' }}>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  )
}