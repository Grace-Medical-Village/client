import React, { lazy } from 'react';
import { useAuth } from './context/auth-context';

const AuthenticatedApp = lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));

function App() {
	const user = useAuth();

	return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
