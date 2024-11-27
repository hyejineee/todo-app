import { AuthPage } from '@presentation/pages/auth';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);
