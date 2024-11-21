import { DiContainerProvider, router } from '@app';
import { RouterProvider } from 'react-router-dom';

function Root() {
  return (
    <DiContainerProvider baseUrl={''}>
      <RouterProvider router={router} />
    </DiContainerProvider>
  );
}

export default Root;
