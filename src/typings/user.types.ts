export type User = {
	authenticated: boolean;
	password: string;
	user: string;
	setAuthenticated: () => void;
	setPassword: () => void;
	setUser: () => void;
};
