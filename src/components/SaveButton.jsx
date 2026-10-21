import { useEffect, useState } from 'react'

export function SaveButton({ onClick }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!saved) return
    const timeout = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(timeout)
  }, [saved])

  const handleClick = () => {
    onClick?.()
    setSaved(true)
  }

  return (
    <button type="button" className="save-button" onClick={handleClick}>
      {saved ? 'Guardado ✓' : 'Guardar'}
    </button>
  )
}
