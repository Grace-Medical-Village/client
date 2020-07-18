import React from 'react';
import { Table, Typography } from 'antd';

const dataSource = [
	{
		key: 1,
		measure: 'Blood Pressure',
		value: '120/70',
	},
	{
		key: 2,
		measure: 'Diabetic',
		value: 'Yes',
	},
	{
		key: 3,
		measure: 'Blood Sugar Level',
		value: 55,
	},
	{
		key: 4,
		measure: 'Cholesterol',
		value: 200,
	},
	{
		key: 5,
		measure: 'Hemoglobin A1v',
		value: '4.5A',
	},
	{
		key: 6,
		measure: 'Last Meal',
		value: 'n/a',
	},
];

const columns = [
	{
		name: 'Measure',
		dataIndex: 'measure',
		key: 'measure',
	},
	{
		value: 'Value',
		dataIndex: 'value',
		key: 'value',
	},
];

function Triage() {
	return (
		<>
			<Typography.Title level={4}>Triage</Typography.Title>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

export default Triage;
