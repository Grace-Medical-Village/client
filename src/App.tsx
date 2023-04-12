import { Auth } from 'aws-amplify';
import React, { lazy, Suspense, useContext, useEffect } from 'react';
import Loading from './components/loading';
import { AuthContext } from './context/auth';
import { userIsAdmin } from './utils/user';

const AuthenticatedApp = lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));

function App(): JSX.Element {
  const { state, update } = useContext(AuthContext);

  useEffect(onLoad, []);

  function onLoad(): void {
    Auth.currentSession()
      .then(() => {
        const username = localStorage.getItem('gvmcUsername') ?? '';
        const newState = {
          ...state,
          authenticated: true,
          isAdmin: userIsAdmin(username),
          username: username,
        };
        update(newState);
      })
      .catch((e) => console.error(e));
  }

  return (
    <Suspense fallback={<Loading />}>
      {state.authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;
