import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function NoPatient() {
  return (
    <>
      <Title level={4}>
        Please register a new patient or search for an existing patient.
      </Title>
    </>
  );
}
