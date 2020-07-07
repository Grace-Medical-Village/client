import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

// TODO - Type
function AuthProvider(props: any) {
	return <AuthContext.Provider value={props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
