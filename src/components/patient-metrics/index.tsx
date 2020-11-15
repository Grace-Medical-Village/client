import React from 'react';
import { Col, Row } from 'antd';
import MetricForm from '../metric-form';
import MetricsTable from '../metric-table';

export default function PatientMetrics(): JSX.Element {
  return (
    <>
      <Row>
        <Col span={12}>
          <MetricForm />
        </Col>
        <Col span={12}>
          <MetricsTable />
        </Col>
      </Row>
    </>
  );
}
