import { Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ConditionsContext } from '../../context/conditions';

export default function PatientConditions(): JSX.Element {
  const { state, update } = useContext(ConditionsContext);

  useEffect(() => {
    useEffect(() => {
      const buildConditionState = async () => {
        if (state.length === 0) {
          const conditions = await getConditions();
          if (conditions.length > 0) update(conditions);
        }
      };
      buildConditionState();
  }, [state, update]);

  function handleChange(e) {
    console.log(e);
  }

  return (
    <Select
      defaultValue={state}
      mode="tags"
      onChange={handleChange}
      placeholder="Please select"
      size="large"
      style={{ width: '100%' }}
    >
      {s}
    </Select>
  );
}
