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
    metric: 'Heart Rate',
    date: 'Jan 03, 2000',
    value: 42,
  },
  {
    metric: 'Height',
    date: 'Jan 03, 2000',
    value: '6\'0"',
  },
  {
    metric: 'Weight',
    date: 'Jan 03, 2000',
    value: '200',
  },
  {
    metric: 'Weight',
    date: 'Jun 13, 2004',
    value: '212',
  },
  {
    metric: 'Weight',
    date: 'Dec 1, 2014',
    value: '228',
  },
  {
    metric: 'Hemoglobin A1c',
    date: 'Dec 1, 2014',
    value: '4.5A',
  },
  {
    metric: 'Cholesterol',
    date: 'Dec 1, 2014',
    value: '200',
  },
  {
    metric: 'Blood Pressure',
    date: 'Dec 1, 2014',
    value: '120/60',
  },
];

export default function HealthMetrics() {
  return <Table columns={columns} dataSource={data} />;
}
