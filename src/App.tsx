import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import Loading from './components/loading';
import { useAuth } from './context/auth-context';

const AuthenticatedApp = lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));

function App() {
	const user = useAuth();

	return (
		<Suspense fallback={<Loading />}>
			{!user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</Suspense>
	);
}

export default App;
