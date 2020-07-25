export type Patient = {
	firstName: string;
	lastName: string;
	language: any; // TODO
	zipCode: string;
	gender: string; // ENUM?
	hispanic: boolean; // ENUM?
	// weight: number;
	// blood: Blood;
	// diabetic: boolean;
	// cholesterol: number;
	// hemoglobinA1c: string;
	// medication: Medication; // TODO
	// visits: Visit[];
};

export type Blood = {
	diastolic: number;
	systolic: number;
	type: string;
};
