export function Spinner({ label = 'Cargando…' }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__icon" aria-hidden="true" />
      {label}
    </div>
  )
}
