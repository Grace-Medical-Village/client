import React from 'react';
import { Table, Typography } from 'antd';

const dataSource = [
	{
		key: 1,
		medication: 'Docusate',
		dosage: '100mg',
	},
	{
		key: 2,
		medication: 'HCTZ',
		dosage: '25mg',
	},
	{
		key: 3,
		medication: 'Glipizide',
		dosage: '10mg',
	},
	{
		key: 4,
		medication: 'Metformin',
		dosage: '50mg',
	},
];

const columns = [
	{
		title: 'Medication',
		dataIndex: 'medication',
		key: 'medication',
	},
	{
		title: 'Dosage',
		dataIndex: 'dosage',
		key: 'dosage',
	},
];

function Medication() {
	return (
		<>
			<Typography.Title level={4}>Medication</Typography.Title>
			<Table dataSource={dataSource} columns={columns} />;
		</>
	);
}

export default Medication;
