import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Medication',
    dataIndex: 'medication',
    key: 'medication',
  },
  {
    title: 'Strength',
    dataIndex: 'strength',
    key: 'strength',
  },
  {
    title: 'Form',
    dataIndex: 'form',
    key: 'form',
  },
  {
    title: 'Expiration',
    dataIndex: 'expiration',
    key: 'expiration',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];

const data = [
  {
    medication: 'Acetamenophen',
    strength: 'Acetamenophen',
    form: 'Tab',
    expiration: '20-Nov',
    type: 'Pain',
  },
];

export default function Medications() {
  return <Table columns={columns} dataSource={data} />;
}
