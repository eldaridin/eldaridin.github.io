import { Root } from './layouts/Root'
import { HomePage } from './pages/HomePage'
import { UserProfile } from './pages/UserProfile'
import { NotFoundPage } from './pages/NotFoundPage'

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'user/:username', element: <UserProfile /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
