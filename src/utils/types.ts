export type Blood = {
	systolic: number;
	diastolic: number;
};

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

export type User = {
	authenticated: boolean;
	password: string;
	user: string;
	setAuthenticated: () => void;
	setPassword: () => void;
	setUser: () => void;
};

export enum Amount {
	Milligrams,
}

export type Medication = {
	datePrescribed: string;
	dosage: [number, Amount];
	medicationName: string;
};

export type Visit = {
	date: string;
};

export enum State {
	AL,
	AK,
	AZ,
	AR,
	CA,
	CO,
	CT,
	DE,
	FL,
	GA,
	HI,
	ID,
	IL,
	IN,
	IA,
	KS,
	KY,
	LA,
	ME,
	MD,
	MA,
	MI,
	MN,
	MS,
	MO,
	MT,
	NE,
	NV,
	NH,
	NJ,
	NM,
	NY,
	NC,
	ND,
	OH,
	OK,
	OR,
	PA,
	RI,
	SC,
	SD,
	TN,
	TX,
	UT,
	VT,
	VA,
	WA,
	WV,
	WI,
	WY,
}
