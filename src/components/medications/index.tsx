import React from 'react';
import { Table, Tag } from 'antd';

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
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = 'red';
          if (tag === 'Tab') color = 'green';
          if (tag === 'Liquid') color = 'geekblue';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = 'geekblue';
          if (tag === 'Pain') color = 'red';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Date Received',
    dataIndex: 'dateReceived',
    key: 'dateReceived',
  },
  {
    title: 'Expiration',
    dataIndex: 'expiration',
    key: 'expiration',
  },
];

const data = [
  {
    expiration: '20-Nov',
    dateReceived: 'Aug 5, 2020',
    form: ['Tab'],
    medication: 'Acetamenophen',
    strength: '500mg',
    type: ['Pain'],
  },
  {
    expiration: '21 May && 22 Apr',
    dateReceived: 'Jun 1, 2020',
    form: ['Liquid'],
    medication: 'Docusate Sodium',
    strength: '100mg',
    type: ['Gastric'],
  },
  {
    expiration: '20-Feb',
    dateReceived: 'Aug 5, 2020',
    form: ['Tab'],
    medication: 'Adult',
    strength: null,
    type: ['Vitamins'],
  },
];

export default function Medications() {
  return <Table columns={columns} dataSource={data} />;
}
