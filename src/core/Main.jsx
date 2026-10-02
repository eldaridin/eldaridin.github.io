import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import { HomePage } from './HomePage';
import { UserProfile } from './UserProfile';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'user/:username', element: <UserProfile /> },
    ],
  },
  { path: '*', element: <div style={{ padding: '2rem' }}>404 - Página no encontrada</div> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}