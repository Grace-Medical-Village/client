export type Patient = {
	firstName: string;
	lastName: string;
	language: string;
	city: string;
	state: State;
	zipCode: string;
	gender: string;
	weight: number;
	blood: Blood;
	diabetic: boolean;
	cholesterol: number;
	hemoglobinA1c: string;
	medication: Medication[];
	visits: Visit[];
};

export type Blood = {
	systolic: number;
	diastolic: number;
};

export type User = {
	authenticated: boolean;
	password: string;
	user: string;
	setAuthenticated: () => void;
	setPassword: () => void;
	setUser: () => void;
};

export type Visit = {
	date: string;
};
