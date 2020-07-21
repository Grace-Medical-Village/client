import React, { useState } from 'react';
import { Radio, Row, Typography, Form } from 'antd';

import NewPatient from './new-patient';
import PatientSearch from './patient-search';

const { Title } = Typography;

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

function Patient() {
	const [newPatient, toggle] = useState(false);

	const onChange = () => {
		toggle(!newPatient);
	};

	return (
		<>
			<Row justify='center'>
				<Title level={3}>
					{newPatient ? 'New Patient Form' : 'Patient Search'}
				</Title>
			</Row>
			<Form {...layout}>
				<Form.Item label='New Patient' name='newPatient'>
					<Radio.Group defaultValue={false} onChange={onChange}>
						<Radio.Button value={true}>Yes</Radio.Button>
						<Radio.Button value={false}>No</Radio.Button>
					</Radio.Group>
				</Form.Item>
			</Form>
			{newPatient ? <NewPatient /> : <PatientSearch />}
		</>
	);
}

export default Patient;
