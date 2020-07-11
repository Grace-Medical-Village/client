import React, { lazy, Suspense } from 'react';
import { useAuth } from './context/auth-context';

const AuthenticatedApp = lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));

function App() {
	const user = useAuth();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{!user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</Suspense>
	);
}

export default App;
