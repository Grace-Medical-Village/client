import React from 'react';
import { List, Row } from 'antd';

import { getAge } from '../../utils/dates';

export default function PatientAbout(): JSX.Element {
  const data = [
    {
      title: 'Smoker',
      value: 'TODO',
    },
    {
      title: 'Age',
      value: 'TODO',
    },
    {
      title: 'Map',
      value: 'TODO',
    },
    {
      title: 'Age',
      value: getAge('') ?? 'N/A',
    },
    {
      title: 'Gender',
      value: 'TODO',
    },
    {
      title: 'Native Language',
      value: 'TODO',
    },
    {
      title: 'Last Visit',
      value: 'N/A', // todo
    },
  ];

  return (
    <>
      <Row>
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <strong>{item.title}:</strong>
              {item.value}
            </List.Item>
          )}
        />
      </Row>
    </>
  );
}
