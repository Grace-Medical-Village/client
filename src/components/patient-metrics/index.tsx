import React from 'react';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

export default function PatientMetrics(): JSX.Element {
  return (
    <>
      <Row>
        <Title level={3}>Metrics</Title>
      </Row>
      <Row>
        <Col span={12}>{/* <MetricsBuilder /> */}</Col>
        <Col span={12}>{/* <MetricsTable /> */}</Col>
      </Row>
    </>
  );
}
