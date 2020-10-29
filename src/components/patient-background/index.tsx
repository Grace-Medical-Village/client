import React, { useEffect, useState } from 'react';
import { Statistic, Row, Typography, Col } from 'antd';

import { getAge } from '../../services/dates';
import { capitalize } from '../../services/patient';

import './styles.css';
import { PatientStatistic } from '../../services/types';
const { Title } = Typography;

export default function PatientBackground({
  birthdate,
  firstName,
  gender,
  nativeLanguage,
  lastName,
}: any): JSX.Element {
  const [age, setAge] = useState(0);

  useEffect(() => setAge(getAge(birthdate)), [birthdate]);

  const background: PatientStatistic[] = [
    {
      title: 'Patient',
      value: `${firstName} ${lastName}`,
    },
    {
      title: 'Age',
      value: age,
    },
    {
      title: 'Gender',
      value: capitalize(gender),
    },
    {
      title: 'Language',
      value: nativeLanguage,
    },
    {
      title: 'Last Visit',
      value: 'N/A',
    },
  ];

  return (
    <>
      <Row>
        <Title level={3}>Background</Title>
      </Row>
      <Row>
        {background.map((stat: PatientStatistic, index: number) => {
          const { title, value }: PatientStatistic = stat;
          return (
            <Col key={index} span={4}>
              <Statistic title={title} value={value} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
