import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col } from 'antd';
import { upperFirst } from 'lodash';

import { getAge } from '../../utils/dates';
import { capitalize } from '../../utils/patient';

import './styles.css';
import { DashboardBackground, PatientStatistic } from '../../utils/types';

export default function PatientBackground({
  birthdate,
  firstName,
  gender,
  nativeLanguage,
  lastName,
}: DashboardBackground): JSX.Element {
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (birthdate) setAge(getAge(birthdate));
  }, [birthdate]);

  const background: PatientStatistic[] = [
    {
      title: 'Patient',
      value: firstName && lastName ? `${firstName} ${lastName}` : 'N/A',
    },
    {
      title: 'Age',
      value: age,
    },
    {
      title: 'Gender',
      value: gender ? upperFirst(gender) : 'N/A',
    },
    {
      title: 'Language',
      value: upperFirst(nativeLanguage) ?? 'N/A',
    },
    {
      title: 'Last Visit',
      value: 'N/A',
    },
  ];

  return (
    <>
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
