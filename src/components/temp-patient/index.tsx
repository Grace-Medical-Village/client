import React from 'react';
import { Col, Row, Statistic, Typography } from 'antd';
import { PatientStat } from './types';
import ChronicCare from '../chronic-care';
import HealthMetrics from '../health-metrics';
import Medications from '../medications';

const { Title } = Typography;

export default function TempPatient() {
  const background: PatientStat[] = [
    {
      title: 'Name',
      value: 'Theodore Roosevelt',
    },
    {
      title: 'Age',
      value: 161,
    },
    {
      title: 'Gender',
      value: 'Male',
    },
    {
      title: 'Primary Language',
      value: 'English',
    },
    {
      title: 'Country of Origin',
      value: 'United States',
    },
    // TODO
    // {
    //   title: 'Last Visit',
    //   value: 'January 3, 2019',
    // },
    // {
    //   title: 'Visit Count',
    //   value: 3,
    // },
  ];
  return (
    <>
      <div style={{ padding: '2rem' }}>
        <Row>
          <Title level={2}>Patient Background</Title>
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
        <Row>
          <Title level={2}>Patient Statistics</Title>
        </Row>
        <Row>
          <HealthMetrics />
        </Row>
        <Row>
          <Title level={2}>Chronic Care</Title>
        </Row>
        <Row>
          <ChronicCare />
        </Row>
        <Row>
          <Title level={2}>Medications</Title>
        </Row>
        <Row>
          <Medications />
        </Row>
      </div>
    </>
  );
}
