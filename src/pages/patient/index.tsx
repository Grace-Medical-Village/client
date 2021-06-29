import React, { useState } from 'react';
import { Radio, Row, Typography, Form } from 'antd';

import NewPatient from '../new-patient';
import PatientSearch from '../patient-search';

import './styles.css';

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function Patient(): JSX.Element {
  const [newPatient, toggle] = useState(false);

  const onChange = () => {
    toggle(!newPatient);
  };

  return (
    <>
      <div className="patient-layout">
        <Row justify="center">
          <Title level={3} style={{ paddingBottom: '1rem' }}>
            {newPatient ? 'New Patient Form' : 'Patient Search'}
          </Title>
        </Row>
        <Form initialValues={{ newPatient }} {...layout}>
          <Form.Item label="New Patient" name="newPatient">
            <Radio.Group onChange={onChange}>
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        {newPatient ? <NewPatient /> : <PatientSearch />}
      </div>
    </>
  );
}

export default Patient;
