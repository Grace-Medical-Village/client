import React from 'react';

import Medication from '../components/medication';
import PatientOverview from '../components/patient-overview';
import Triage from '../components/triage';

import patient from '../assets/patient.data';

function PatientDashboard() {
	return (
		<>
			<PatientOverview patient={patient} />
			<Medication />
			<Triage />
		</>
	);
}

export default PatientDashboard;
