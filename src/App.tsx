import React, { lazy, Suspense, useContext } from 'react';
import Loading from './components/loading';
import { AuthContext } from './context/auth';

const AuthenticatedApp = lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));

function App() {
  const auth = useContext(AuthContext);
  const { authenticated } = auth.state;

  return (
    <Suspense fallback={<Loading />}>
      {authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;
