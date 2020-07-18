import React from 'react';

import { Statistic } from 'antd';

function PatientOverview({ patient }: any) {
	const { firstName, lastName } = patient;

	return (
		<>
			<Statistic title='Name' value={`${firstName} ${lastName}`} />
		</>
	);
}

export default PatientOverview;
