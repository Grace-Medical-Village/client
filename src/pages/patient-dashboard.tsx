import React from 'react';
import { Typography } from 'antd';
import PatientOverview from '../components/patient-overview';
import Triage from '../components/triage';
import Medication from '../components/medication';

import patient from '../assets/patient.data';

const { Title } = Typography;
function PatientDashboard() {
	return (
		<>
			<Title level={2}>Patient Dashboard</Title>
			<PatientOverview patient={patient} />
			<Triage />
			<Medication />
		</>
	);
}

export default PatientDashboard;
