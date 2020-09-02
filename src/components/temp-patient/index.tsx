import React from 'react';
import { Col, Divider, Row, Statistic, Typography } from 'antd';
import { PatientStat } from './types';
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
    {
      title: 'Last Visit',
      value: 'Jan 6, 2019',
    },
  ];
  return (
    <>
      <div style={{ padding: '2rem' }}>
        <Row>
          <Title level={3}>Patient Background</Title>
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
        <Divider />
        <Row>
          <Title level={3}>Metrics</Title>
        </Row>
        <Row>
          <HealthMetrics />
        </Row>
        <Divider />
        <Row>
          <Title level={3}>Medications</Title>
        </Row>
        <Row>
          <Medications />
        </Row>
      </div>
    </>
  );
}
