import React from 'react';
import {
  Badge,
  Col,
  Collapse,
  Descriptions,
  Divider,
  Row,
  Statistic,
  Typography,
} from 'antd';
import HealthMetrics from '../health-metrics';
import Medications from '../medications';
import { PatientStat } from './types';

const { Panel } = Collapse;
const { Item } = Descriptions;
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
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Chronic Care" key="1">
            <Descriptions layout="vertical" bordered>
              <Item label="Condition">
                <Badge color="red" text="Diabetic" />
                <br />
                <Badge color="orange" text="High Blood Cholesterol" />
                <br />
                <Badge color="lime" text="Hypertension" />
              </Item>
            </Descriptions>
          </Panel>
          <Panel header="Prior Visits" key="2">
            <Collapse>
              <Panel header="August 5, 2020" key="20200805">
                <Descriptions layout="vertical" bordered>
                  <Item label="Physician">Dr. Bradley</Item>
                  <Item label="Notes">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet, corporis.
                  </Item>
                </Descriptions>
              </Panel>
              <Panel header="June 1, 2020" key="20200601">
                <Descriptions layout="vertical" bordered>
                  <Item label="Physician">Dr. Yao</Item>
                  <Item label="Notes">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut perspiciatis unde in ut fuga deleniti maxime amet,
                    itaque fugiat vel cupiditate aliquam quasi, pariatur
                    voluptas ullam aperiam quae, iste et?
                  </Item>
                </Descriptions>
              </Panel>
            </Collapse>
          </Panel>
        </Collapse>
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
        <Row>{/* <Medications /> */}</Row>
      </div>
    </>
  );
}
