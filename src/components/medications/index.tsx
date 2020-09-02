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
    title: 'Expiration',
    dataIndex: 'expiration',
    key: 'expiration',
  },
];

const data = [
  {
    medication: 'Acetamenophen',
    strength: '500mg',
    form: ['Tab'],
    expiration: '20-Nov',
    type: ['Pain'],
  },
  {
    medication: 'Docusate Sodium',
    strength: '100mg',
    form: ['Liquid'],
    expiration: '21 May && 22 Apr',
    type: ['Gastric'],
  },
  {
    medication: 'Adult',
    strength: null,
    form: ['Tab'],
    expiration: '20-Feb',
    type: ['Vitamins'],
  },
];

export default function Medications() {
  return <Table columns={columns} dataSource={data} />;
}
