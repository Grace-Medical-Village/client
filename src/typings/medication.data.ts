enum Disease {
	Cholesterol,
	Diabetes,
	Hypertension,
}

type Medication = {
	medication: string;
	strengths: string[];
	disease: Disease;
};
export const medications = [
	{
		medication: 'name1',
		strengths: [],
		type: 'cholesterol',
	},
];

export enum Amount {
	Milligrams,
}

export type Medication = {
	datePrescribed: string;
	dosage: [number, Amount];
	medicationName: string;
};
