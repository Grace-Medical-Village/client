import React from 'react';
import { Typography } from 'antd';
import PatientOverview from '../components/patient-overview';
import Triage from '../components/triage';
import Medication from '../components/medication';

const { Title } = Typography;
function Dashboard() {
	return (
		<>
			<Title level={2}>Patient Dashboard</Title>
			<PatientOverview />
			<Triage />
			<Medication />
		</>
	);
}

export default Dashboard;
