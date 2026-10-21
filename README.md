# Portafolio Darío Rojas

Sitio personal / CV construido con **React 19 + Vite 8**, con React Compiler habilitado y despliegue automático a GitHub Pages.

## Requisitos

- Node.js 22+ (recomendado; usa [nvm](https://github.com/nvm-sh/nvm) si hace falta)
- npm 10+

## Comandos

| Comando             | Descripción                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Servidor de desarrollo con HMR       |
| `npm run build`     | Build de producción en `dist/`       |
| `npm run preview`   | Previsualiza el build localmente     |
| `npm run lint`      | ESLint sobre todo el proyecto        |
| `npm run test:run`  | Vitest una vez (para CI)             |
| `npm run test`      | Vitest en modo watch                 |

## Estructura

```
src/
├── main.jsx          # Punto de entrada (React root + estilos globales)
├── router.jsx        # Crea el BrowserRouter con las rutas
├── routes.jsx        # Tabla de rutas (compartida con los tests)
├── index.css         # Estilos globales y variables de diseño
├── App.css           # Estilos de la home
├── layouts/
│   ├── Root.jsx      # Shell: Header + <main> + Footer (Outlet)
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── UserProfile.jsx
│   └── NotFoundPage.jsx
├── hooks/
│   └── useUserProfile.js   # Perfil de GitHub + guardar en localStorage
├── components/
│   ├── Spinner.jsx
│   └── SaveButton.jsx
├── test/
│   └── setup.js      # Setup global de Vitest (jest-dom + cleanup)
└── assets/
```

## Rutas

| Ruta               | Página                                        |
| ------------------ | --------------------------------------------- |
| `/`                | Home                                          |
| `/user/:username`  | Perfil (datos de la API pública de GitHub)    |
| `*`                | 404 dentro del layout común                   |

## Tests

Vitest + Testing Library (jsdom). Los tests viven junto a lo que prueban:

- `src/router.test.jsx` — renderizado por ruta, 404 y perfil (con `fetch` mockeado)
- `src/components/SaveButton.test.jsx`

No uses `globals` de Vitest: importa `describe/it/expect/vi` desde `vitest` explícitamente.

## Despliegue

`.github/workflows/deploy.yml` corre en cada push a `main`: `npm ci` → lint → tests → build → publica `dist/` en GitHub Pages.

Requisito único en el repo de GitHub: **Settings → Pages → Source = GitHub Actions**.

## `docs/legacy/`

Carpeta con la versión anterior del sitio (HTML/CSS estático, previa a React). Se conserva solo como referencia histórica: tiene su propio `package.json` y no forma parte del build actual. No lo edites ni lo despliegues; el sitio real es el que se genera desde `src/`.
