import { Select, Space, Col, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ConditionsContext } from '../../context/conditions';
import { PatientContext } from '../../context/patient';
import {
  deletePatientCondition,
  getConditions,
  postPatientCondition,
  requestSuccess,
} from '../../services/api';
import { messageUserResult } from '../../utils/ui';
import { LabeledValue } from 'antd/es/select';
import { PatientCondition } from '../../utils/types';
import PatientAllergies from '../patient-allergies';

export default function PatientConditions(): JSX.Element {
  const { state, update } = useContext(ConditionsContext);
  const patientCtx = useContext(PatientContext);

  useEffect(() => {
    const buildConditionState = async () => {
      if (state.length === 0) {
        const conditions = await getConditions();
        update(conditions);
      }
    };
    buildConditionState()
      .then((r) => r)
      .catch((err) => console.error(err));
  }, [state, update]);

  const handleOnSelect = async (
    v: string | number | LabeledValue
  ): Promise<void> => {
    let success = false;
    if (patientCtx?.state?.patient?.id) {
      const conditionId = Number(v);
      const patientId = patientCtx.state.patient.id;
      const { id, status } = await postPatientCondition(patientId, conditionId);
      success = requestSuccess(status);
      if (success)
        addConditionToPatientContext(patientId, conditionId, Number(id));
    }
    const successMessage = 'Saved condition';
    const failureMessage = 'Unable to save condition';
    messageUserResult(success, successMessage, failureMessage);
  };

  const handleOnDeselect = async (
    v: string | number | LabeledValue
  ): Promise<void> => {
    const conditionId = Number(v);
    const id = getIdFromContext(conditionId);
    let success = false;
    if (id) {
      const { status } = await deletePatientCondition(id);
      success = requestSuccess(status);
      if (success) deleteConditionFromPatientContext(id);
    }

    const successMessage = 'Deleted condition';
    const failureMessage = 'Unable to delete condition';
    messageUserResult(success, successMessage, failureMessage);
  };

  const addConditionToPatientContext = (
    patientId: number,
    conditionId: number,
    id: number
  ) => {
    const pc: PatientCondition = {
      patientId,
      conditionId,
      id,
    };

    const existingState = patientCtx.state.conditions ?? [];
    const newState: PatientCondition[] = [pc, ...existingState];
    patientCtx.update({
      ...patientCtx.state,
      conditions: newState,
    });
  };

  const deleteConditionFromPatientContext = (id: number) => {
    const existingState = patientCtx.state.conditions ?? [];
    const newState = existingState.filter(
      (pc: PatientCondition) => pc.id !== id
    );
    patientCtx.update({
      ...patientCtx.state,
      conditions: newState,
    });
  };

  const getIdFromContext = (conditionId: number): number | null => {
    const { conditions = [] } = patientCtx?.state;
    const patientCondition = conditions.filter(
      (pc: PatientCondition) => pc.conditionId === conditionId
    );
    return patientCondition[0].id ?? null;
  };

  return (
    <>
      <Space direction="vertical" size="large">
        <Row>
          <Col span={24}>
            <Select
              defaultValue={
                patientCtx?.state?.conditions
                  ?.map((c) => c.conditionId.toString())
                  .sort() ?? []
              }
              mode="tags"
              onDeselect={handleOnDeselect}
              onSelect={handleOnSelect}
              placeholder="Select Conditions"
              showSearch
              size="large"
              style={{ width: '80vw' }}
            >
              {state.map((c) => (
                <Select.Option key={c.id} value={c.id.toString()}>
                  {c.conditionName}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <PatientAllergies />
      </Space>
    </>
  );
}
