import React, { useEffect, useState } from 'react';
import { Statistic, Row, Typography, Col } from 'antd';

import { PatientGeneralDetails, PatientStat } from './types';
import { getAge } from '../../services/date';
import { capitalize } from '../../services/patient';

import './styles.css';
const { Title } = Typography;

function PatientBackground({
  birthdate,
  firstName,
  gender,
  nativeLanguage,
  lastName,
}: PatientGeneralDetails) {
  const [age, setAge] = useState(0);

  useEffect(() => setAge(getAge(birthdate)), [birthdate]);

  const background: PatientStat[] = [
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
      title: 'Primary Language',
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
        {background.map((stat: PatientStat, index: number) => {
          const { title, value }: PatientStat = stat;
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

export default PatientBackground;
