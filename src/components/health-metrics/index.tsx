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
];

export default function HealthMetrics() {
  return <Table columns={columns} dataSource={data} />;
}
