import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'

function renderAt(initialEntry) {
  const router = createMemoryRouter(routes, { initialEntries: [initialEntry] })
  return render(<RouterProvider router={router} />)
}

describe('router', () => {
  it('renderiza HomePage en la raíz', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { name: 'Get started' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renderiza 404 para rutas desconocidas dentro del layout', () => {
    renderAt('/no-existe')
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renderiza el perfil con el nombre de GitHub', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify({ name: 'Darío Rojas', login: 'x' }), {
            headers: { 'Content-Type': 'application/json' },
          }),
        ),
      ),
    )

    renderAt('/user/eldaridin')

    expect(await screen.findByRole('heading', { name: 'Darío Rojas' })).toBeInTheDocument()
    expect(screen.getByText('@eldaridin')).toBeInTheDocument()
  })

  it('usa el username como fallback si la API falla', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network down'))),
    )

    renderAt('/user/eldaridin')

    expect(await screen.findByRole('heading', { name: 'eldaridin' })).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
