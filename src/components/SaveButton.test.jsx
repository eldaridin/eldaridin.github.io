import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SaveButton } from './SaveButton.jsx'

describe('SaveButton', () => {
  it('dispara onClick y muestra confirmación temporal', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<SaveButton onClick={onClick} />)

    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Guardado ✓' })).toBeInTheDocument()
  })

  it('funciona sin handler', async () => {
    const user = userEvent.setup()

    render(<SaveButton />)

    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByRole('button', { name: 'Guardado ✓' })).toBeInTheDocument()
  })
})
