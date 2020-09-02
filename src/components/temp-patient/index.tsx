import React from 'react';
import {
  Col,
  Divider,
  Row,
  Statistic,
  Typography,
  Descriptions,
  Badge,
} from 'antd';
import { PatientStat } from './types';
import HealthMetrics from '../health-metrics';
import Medications from '../medications';

const { Title } = Typography;

export default function TempPatient() {
  const background: PatientStat[] = [
    {
      title: 'Patient',
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
        <Divider />
        <Descriptions title="Patient Info" layout="vertical" bordered>
          <Descriptions.Item label="Name">Tim Lee</Descriptions.Item>
          <Descriptions.Item label="Age">27</Descriptions.Item>
          <Descriptions.Item label="Gender">Male</Descriptions.Item>
          <Descriptions.Item label="Primary Language">
            English
          </Descriptions.Item>
          <Descriptions.Item label="Country of Origin">
            United States
          </Descriptions.Item>
          <Descriptions.Item label="Last Visit">
            August 5, 2020
          </Descriptions.Item>
          <Descriptions.Item label="Chronic Conditions" span={3}>
            <Badge color="red" text="Diabetic" />
            <br />
            <Badge color="lime" text="Hypertension" />
          </Descriptions.Item>
        </Descriptions>
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
