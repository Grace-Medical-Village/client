import React, { useEffect } from 'react';

import { Descriptions } from 'antd';

function PatientOverview({ patient }: any) {
	const { firstName, lastName, language, gender, weight } = patient;

	return (
		<>
			<Descriptions bordered title='Patient Dashboard' layout='horizontal'>
				<Descriptions.Item label='Name'>
					{firstName} {lastName}
				</Descriptions.Item>
				<Descriptions.Item label='Language'>{language}</Descriptions.Item>
				<Descriptions.Item label='Gender'>{gender}</Descriptions.Item>
				<Descriptions.Item label='Weight'>{weight}</Descriptions.Item>
			</Descriptions>
		</>
	);
}

export default PatientOverview;
