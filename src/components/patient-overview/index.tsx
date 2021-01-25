import React from 'react';
import { Collapse } from 'antd';
import Conditions from '../conditions';
import PatientBackground from '../patient-background';

const { Panel } = Collapse;

export default function PatientOverview(): JSX.Element {
  return (
    <>
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="Background" key="1">
          <PatientBackground />
        </Panel>
        <Panel header="Conditions" key="2">
          <Conditions />
        </Panel>
      </Collapse>
    </>
  );
}
