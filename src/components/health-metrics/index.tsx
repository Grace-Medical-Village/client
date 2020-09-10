import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

const data = [
  {
    key: '1',
    metric: 'Heart Rate',
    date: 'Jan 03, 2000',
    value: 42,
  },
  {
    key: '2',
    metric: 'Height',
    date: 'Jan 03, 2000',
    value: '6\'0"',
  },
  {
    key: '3',
    metric: 'Weight',
    date: 'Jan 03, 2000',
    value: '200',
  },
  {
    key: '4',
    metric: 'Weight',
    date: 'Jun 13, 2004',
    value: '212',
  },
  {
    key: '5',
    metric: 'Weight',
    date: 'Dec 1, 2014',
    value: '228',
  },
  {
    key: '6',
    metric: 'Hemoglobin A1c',
    date: 'Dec 1, 2014',
    value: '4.5A',
  },
  {
    key: '7',
    metric: 'Cholesterol',
    date: 'Dec 1, 2014',
    value: '200',
  },
  {
    key: '8',
    metric: 'Blood Pressure',
    date: 'Dec 1, 2014',
    value: '120/60',
  },
];

export default function HealthMetrics() {
  return <Table columns={columns} dataSource={data} />;
}
