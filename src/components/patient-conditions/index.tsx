import { Select } from 'antd';
import { difference, filter } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { ConditionsContext } from '../../context/conditions';
import { PatientContext } from '../../context/patient';
import {
  deletePatientCondition,
  getConditions,
  postPatientCondition,
  requestSuccess,
} from '../../services/api';
import { stringArrayToNumberArray } from '../../utils/data';
import { Condition, PatientCondition } from '../../utils/types';
import { notificationHandler } from '../../utils/ui';

export default function PatientConditions(): JSX.Element {
  const { state, update } = useContext(ConditionsContext);
  const patientCtx = useContext(PatientContext);
  const [existingConditions, setExistingConditions] = useState<string[]>([]);

  useEffect(() => {
    const buildConditionState = async () => {
      if (state.length === 0) {
        const conditions = await getConditions();
        update(conditions);
      }
    };
    buildConditionState();
  }, [state, update]);

  function handleChange(conditionIds: string[]) {
    const ids = stringArrayToNumberArray(conditionIds);
    const previousIds = getConditionIds();
    const idsToPost = difference(ids, previousIds);
    const idsToDelete = difference(previousIds, ids);
    const patientId = patientCtx?.state?.patient?.id ?? null;
    if (patientId) handleConditionsUpdate(patientId, idsToPost, idsToDelete);
  }

  function handleConditionsUpdate(
    patientId: number,
    idsToPost: number[],
    idsToDelete: number[]
  ) {
    if (idsToPost.length > 0) postPatientConditions(patientId, idsToPost);
    if (idsToDelete.length > 0) deletePatientConditions(patientId, idsToDelete);
  }

  async function postPatientConditions(
    patientId: number,
    ids: number[]
  ): Promise<void> {
    let success = true;
    Promise.all(
      ids.map(async (id) => {
        const { status } = await postPatientCondition(patientId, id);
        if (!requestSuccess(status)) success = false;
      })
    );
    if (success) {
      const description = 'Condition saved';
      notificationHandler(200, description, 'bottomRight');
    } else {
      const description = 'Failed to save condition';
      notificationHandler(400, description, 'bottomRight');
    }
  }

  async function deletePatientConditions(
    patientId: number,
    ids: number[]
  ): Promise<void> {
    let success = true;
    Promise.all(
      ids.map(async (id) => {
        const { status } = await deletePatientCondition(patientId, id);
        if (!requestSuccess(status)) success = false;
      })
    );
    if (success) {
      const description = 'Condition deleted';
      notificationHandler(200, description, 'bottomRight');
    } else {
      const description = 'Failed to delete condition';
      notificationHandler(400, description, 'bottomRight');
    }
  }

  const getConditionIds = (): number[] => {
    const conditionIds: number[] = [];
    if (patientCtx?.state?.conditions) {
      patientCtx.state.conditions.forEach((c) => {
        conditionIds.push(c.condition_id);
      });
    }
    return conditionIds;
  };

  return (
    <Select
      defaultValue={
        patientCtx?.state?.conditions
          ?.map((c) => c.condition_id.toString())
          .sort() ?? []
      }
      mode="tags"
      onChange={handleChange}
      placeholder="Please select"
      showSearch
      size="large"
      style={{ width: '100%' }}
    >
      {state.map((c) => (
        <Select.Option key={c.id} value={c.id.toString()}>
          {c.condition_name}
        </Select.Option>
      ))}
    </Select>
  );
}
