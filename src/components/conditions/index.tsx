import React, { useContext, useEffect } from 'react';
import { message, Select } from 'antd';
import {
  Condition,
  CONDITIONS,
  ConditionItem,
  Item,
  ItemType,
} from '../../utils/types';
import { useId } from '../../hooks';
import { getItem, postItem } from '../../services/api';
import { ConditionsContext } from '../../context/conditions';

const { Option } = Select;

export default function Conditions(): JSX.Element {
  const id = useId();
  const { state, update } = useContext(ConditionsContext);

  useEffect(() => {
    const getConditions = () => {
      const item: Item = {
        id,
        key: ItemType.CONDITION,
      };
      // todo type
      getItem(item).then((res: any) => {
        saveExistingConditions(res as ConditionItem); // todo
      });
    };

    const saveExistingConditions = (r: ConditionItem): void => {
      update(CONDITIONS.filter((c) => r[c] === true));
    };

    if (state.length === 0) getConditions();
  }, [id, state, update]);

  function handleChange(e: Condition[]) {
    const item: ConditionItem = {
      id,
      key: ItemType.CONDITION,
      type: ItemType.CONDITION,
    };
    e.forEach((c: Condition) => {
      item[c] = true;
    });
    postItem(item)
      .then((success: boolean): void => {
        if (success) {
          message.success('Record Saved');
          update(e);
        } else message.warn('Record Not Saved');
      })
      .catch((e: Error): void => {
        console.error(e);
        message.warn('Unable to Connect to Server');
      });
  }

  // todo map through options
  return (
    <Select
      defaultValue={state}
      mode="tags"
      onChange={handleChange}
      placeholder="Please select"
      size="large"
      style={{ width: '100%' }}
    >
      <Option key="diabetes" value="diabetes">
        Diabetes
      </Option>
      <Option key="highCholesterol" value="highCholesterol">
        High Cholesterol
      </Option>
      <Option key="hypertension" value="hypertension">
        Hypertension
      </Option>
    </Select>
  );
}
