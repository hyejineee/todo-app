import { DiContainerProvider } from 'app/DiContainer';

function Root() {
  return <DiContainerProvider baseUrl={''}>app</DiContainerProvider>;
}

export default Root;
