import 'reflect-metadata';

import { router } from '@shared/config';
import { RouterProvider } from 'react-router-dom';

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
