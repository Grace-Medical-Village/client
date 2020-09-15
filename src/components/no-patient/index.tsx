import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function NoPatient(): JSX.Element {
  return (
    <>
      <Title level={4}>
        Register a new patient or search for an existing patient.
      </Title>
    </>
  );
}
