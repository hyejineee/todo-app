import {
  AuthPage,
  CreateTodoPage,
  TodoDetailPage,
  TodosPage,
} from '@presentation/pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/todos',
    element: <TodosPage />,
    children: [
      {
        path: '/todos/:id',
        element: <TodoDetailPage />,
      },
      {
        path: '/todos/create',
        element: <CreateTodoPage />,
      },
    ],
  },
]);
