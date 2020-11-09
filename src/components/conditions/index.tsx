import React, { useEffect, useState } from 'react';
import { message, Select } from 'antd';
import { Condition, ConditionItem, Item, ItemType } from '../../services/types';
import { useId } from '../../hooks';
import { getItem, postItem } from '../../services/api';
// import { CONDITIONS } from '../../services/conditions';

const { Option } = Select;

// todo - refactor to load data from chronicConditions
// todo -> GET conditions and set as default value
export default function Conditions(): JSX.Element {
  const id = useId();
  const [conditions, set] = useState<Condition[]>([]);
  useEffect(() => {
    const item: Item = { id, key: 'conditions' };
    getItem(item).then((res: any) => {
      if (res?.statusCode === 200) {
        Object.keys(res).map((k: string) => {
          console.log(k);
          // if (&& res[k]) {
          // const state: Condition[] = [...conditions];
          // state.push(k);
          // set(state);
          // }
        });
      }
    });
  }, []);

  // todo type
  function handleChange(e: Condition[]) {
    console.log(e);
    const item: ConditionItem = {
      id,
      key: 'conditions',
      type: ItemType.CONDITION,
    };
    e.map((c: Condition) => {
      item[c] = true;
    });
    postItem(item)
      .then((success: boolean): void => {
        if (success) {
          message.success('Record Saved');
        } else message.warn('Record Not Saved');
      })
      .catch((e: Error): void => {
        console.error(e);
        message.warn('Unable to Connect to Server');
      });
  }

  return (
    <Select
      defaultValue={conditions}
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
