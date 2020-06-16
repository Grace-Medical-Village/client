import React from 'react';

import { Descriptions } from 'antd';

import patientData from './patient.data';

const { firstName, gender, language, lastName, weight } = patientData;
function PatientDashboard() {
	return (
		<>
			<div className='dashboard dashboard-grid'>
				<Descriptions title='Patient' layout='vertical'>
					<Descriptions.Item label='Name'>
						{firstName} {lastName}
					</Descriptions.Item>
					<Descriptions.Item label='Language'>{language}</Descriptions.Item>
					<Descriptions.Item label='Gender'>{gender}</Descriptions.Item>
					<Descriptions.Item label='Weight'>{weight}</Descriptions.Item>
				</Descriptions>
			</div>
		</>
	);
}

export default PatientDashboard;
