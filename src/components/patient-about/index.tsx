import React, { useContext } from 'react';
import { List, Row, Typography } from 'antd';

import { getAge, monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { capitalize } from 'lodash';

export default function PatientAbout(): JSX.Element {
  const { state } = useContext(PatientContext);

  const data = [
    {
      title: 'Birthday',
      value: state?.patient?.birthdate
        ? monthDayYearFullDate(state.patient.birthdate)
        : 'N/A',
    },
    {
      title: 'Age',
      value: state?.patient?.birthdate
        ? getAge(state.patient.birthdate)
        : 'N/A',
    },
    {
      title: 'Gender',
      value: capitalize(state?.patient?.gender) ?? 'N/A',
    },
    {
      title: 'Native Language',
      value: state?.patient?.native_language ?? 'N/A',
    },
    {
      title: 'Map',
      value: capitalize(state?.patient?.map.toString()) ?? 'N/A',
    },
    {
      title: 'Smoker',
      value: capitalize(state?.patient?.smoker.toString()) ?? 'N/A',
    },
  ];

  return (
    <>
      <Row>
        <List
          bordered={false}
          dataSource={data}
          size="large"
          renderItem={(item) => (
            <List.Item>
              <Row align="middle" justify="space-between">
                <Typography.Text strong style={{ marginRight: '1rem' }}>
                  {item.title}:
                </Typography.Text>
                <Typography.Text>{item.value}</Typography.Text>
              </Row>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
}
