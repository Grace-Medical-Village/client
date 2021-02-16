import React from 'react';
import { List, Row } from 'antd';

import { getAge } from '../../utils/dates';
import { DashboardBackground } from '../../utils/types';

export default function PatientBackground({
  gender,
  nativeLanguage,
}: DashboardBackground): JSX.Element {
  const data = [
    {
      title: 'Age',
      value: getAge('') ?? 'N/A',
    },
    {
      title: 'Gender',
      value: gender ?? 'N/A',
    },
    {
      title: 'Native Language',
      value: nativeLanguage ?? 'N/A',
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
