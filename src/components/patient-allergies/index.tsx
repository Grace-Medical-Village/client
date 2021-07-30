import React, { useContext, useState } from 'react';
import { Form, Input, Button, Row, notification } from 'antd';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { PatientContext } from '../../context/patient';
import {
  deletePatientAllergy,
  postPatientAllergy,
  putPatientAllergy,
} from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { PatientAllergy, PatientData } from '../../utils/types';

function PatientAllergies(): JSX.Element {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { state, update } = useContext(PatientContext);
  const { patient } = state;

  const onSearchHandler = (allergies: string) => {
    setLoading(true);
    if (allergies.length === 0 && state.allergies?.id) {
      deletePatientAllergy(state.allergies.id)
        .then((r) => {
          if (r.status >= 200 && r.status <= 299) {
            notificationHandler(r.status, 'Deleted Allergies', 'bottomRight');
            const newState: PatientData = {
              ...state,
            };
            delete newState.allergies;
            update(newState);
          } else {
            notificationHandler(
              400,
              'Failed to Delete Allergies',
              'bottomRight'
            );
          }
        })
        .catch((err) => {
          console.error(err);
          notificationHandler(500, 'Failed to Delete Allergies', 'bottomRight');
        });
    } else if (allergies.length === 0) {
      notification['warning']({
        message: 'No Allergies Provided',
        description: null,
        placement: 'bottomRight',
      });
    } else if (state.allergies?.id) {
      putPatientAllergy(state.allergies.id, allergies)
        .then((r) => {
          if (r.status >= 200 && r.status <= 299) {
            notificationHandler(r.status, 'Updated Allergies', 'bottomRight');
            if (state.allergies && state.patient) {
              const patientAllergy: PatientAllergy = {
                id: state.allergies.id,
                allergies,
                patientId: state.patient?.id,
              };
              const newState: PatientData = {
                ...state,
                allergies: patientAllergy,
              };
              update(newState);
            }
          } else {
            notificationHandler(
              400,
              'Failed to Update Allergies',
              'bottomRight'
            );
          }
        })
        .catch((err) => {
          console.error(err);
          notificationHandler(500, 'Failed to Update Allergies', 'bottomRight');
        });
    } else if (patient && patient.id) {
      postPatientAllergy(patient.id, allergies)
        .then((r) => {
          if (r.status >= 200 && r.status <= 299 && r.id) {
            notificationHandler(r.status, 'Saved Allergies', 'bottomRight');

            const patientAllergy: PatientAllergy = {
              id: r.id,
              allergies,
              patientId: patient.id,
            };

            const newState: PatientData = {
              ...state,
              allergies: patientAllergy,
            };

            update(newState);
          } else {
            notificationHandler(400, 'Failed to Save Allergies', 'bottomRight');
          }
        })
        .catch((err) => {
          console.error(err);
          notificationHandler(500, 'Failed to Save Allergies', 'bottomRight');
        });
    } else {
      notificationHandler(500, 'Unknown Failure', 'bottomRight');
    }
    setLoading(false);
  };

  return (
    <>
      <Row align="middle">
        <Form layout="inline" form={form}>
          <Form.Item>
            <Input.Search
              addonBefore="Allergies"
              defaultValue={state.allergies?.allergies ?? ''}
              enterButton={
                <Button
                  icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
                  type="ghost"
                />
              }
              placeholder="None"
              maxLength={250}
              onSearch={onSearchHandler}
              size="large"
              style={{ width: '80vw' }}
            />
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}

export default PatientAllergies;
