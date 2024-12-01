import {
  AuthPage,
  CreateTodoPage,
  EditTodoPage,
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
        path: '/todos/:id/edit',
        element: <EditTodoPage />,
      },
      {
        path: '/todos/create',
        element: <CreateTodoPage />,
      },
    ],
  },
]);
