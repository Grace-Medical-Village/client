import { Amount, Patient, State } from '../utils/types';

const patientData: Patient = {
	firstName: 'Ignaz',
	lastName: 'Semmelweis',
	language: 'Hungarian',
	city: 'Atlanta',
	state: State.GA,
	zipCode: '33033',
	gender: 'M',
	weight: 195,
	blood: {
		systolic: 120,
		diastolic: 80,
	},
	diabetic: true,
	cholesterol: 150,
	hemoglobinA1c: '4.5A',
	medication: [
		{
			medicationName: 'docusate',
			dosage: [100, Amount.Milligrams],
			datePrescribed: '',
		},
		{
			medicationName: 'hctz',
			dosage: [25, Amount.Milligrams],
			datePrescribed: '',
		},
		{
			medicationName: 'glipizide',
			dosage: [10, Amount.Milligrams],
			datePrescribed: '',
		},
		{
			medicationName: 'ibuprofen',
			dosage: [200, Amount.Milligrams],
			datePrescribed: '',
		},
	],
	visits: [
		{
			date: '2020-06-03T00:36:11+0000',
		},
	],
};

export default patientData;
