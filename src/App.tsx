import { Auth } from 'aws-amplify';
import React, { lazy, Suspense, useContext, useEffect } from 'react';
import Loading from './components/loading';
import { AuthContext } from './context/auth';

const AuthenticatedApp = lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));

function App(): JSX.Element {
  const { state, update } = useContext(AuthContext);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad(): Promise<void> {
    try {
      await Auth.currentSession();
      const newState = { ...state, authenticated: true };
      update(newState);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      {state.authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;
