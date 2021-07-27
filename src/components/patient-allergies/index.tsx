import React, { useContext } from 'react';
import { Form, Input, Button, Row } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { PatientContext } from '../../context/patient';
import { postPatientAllergy } from '../../services/api';

function PatientAllergies(): JSX.Element {
  const [form] = Form.useForm();
  // TODO
  // - show loader when you hit save
  // - build PatientContext to have allergies
  // - show allergies from PatientContext
  // - do a put if you already have allergies
  const { state } = useContext(PatientContext);
  const { patient } = state;
  const onSearchHandler = (allergies: string) => {
    if (patient && patient.id) {
      postPatientAllergy(patient.id, allergies)
        .then((r) => r)
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Row align="middle">
        <Form layout="inline" form={form}>
          <Form.Item>
            <Input.Search
              addonBefore="Allergies"
              defaultValue={state.allergies?.allergies ?? ''}
              enterButton={<Button icon={<SaveOutlined />} type="ghost" />}
              placeholder="None"
              maxLength={250}
              onSearch={onSearchHandler}
              size="large"
              style={{ width: '75vw' }}
            />
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}

export default PatientAllergies;
