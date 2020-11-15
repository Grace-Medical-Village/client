import React, { useState, useContext } from 'react';
import { Form, Select, InputNumber, Button, Row, message } from 'antd';

import { MetricsContext } from '../../context/metrics';
import { todayAsYearMonthDay } from '../../utils/dates';
import { Store } from 'antd/lib/form/interface';
import {
  ItemType,
  MetricItem,
  MetricName,
  MetricOption,
} from '../../utils/types';
import { useId } from '../../hooks';
import { postItem } from '../../services/api';
import { allMetrics } from '../../utils/metrics';

const { Option } = Select;

const layout = {
  wrapperCol: { span: 12 },
};

const noMetric = {
  id: null,
  key: 'noMetric',
  name: '',
  disabled: true,
  max: 0,
  min: 0,
  step: 0,
  type: '',
};

export default function MetricForm(): JSX.Element {
  const { state, update } = useContext(MetricsContext);
  const id = useId();

  const [metric, set] = useState<MetricOption>(noMetric);
  const [buttonText, setButtonText] = useState<string>('Submit');

  const [form] = Form.useForm();

  const onChange = (metricKey: string) => {
    const m: MetricOption = allMetrics.filter(
      ({ key }) => metricKey === key
    )[0];
    set(m);
  };

  const onReset = () => {
    form.resetFields();
    setButtonText('Submit');
  };

  const onFinish = (data: Store) => {
    const { metricId, metricValue } = data;
    if (!metricId) {
      message.warn('Select a Metric');
      throw new Error('Metric Name Required');
    } else if (!metricValue) {
      message.warn(`Provide a Value for ${metric.name}`);
      throw new Error('Metric Value Required');
    }
    console.log(data);

    const metricItem = {
      id,
      key: `${ItemType.METRIC}_${todayAsYearMonthDay()}`,
      type: ItemType.METRIC,
      [metricId]: metricValue,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    } as MetricItem; // todo use : MetricItem fix

    // postItem(metricItem).then((success) => {
    //   if (success) {
    //     const newState: any = { ...state };
    //     newState[metricId] = { ...newState[metricName], ...metricItem };
    //     update(newState);
    //     console.log(state);
    //     onReset();
    //   }
    // });
  };

  return (
    <>
      <Form {...layout} form={form} name="metricForm" onFinish={onFinish}>
        <Form.Item name="metricId">
          <Select
            onChange={onChange}
            optionFilterProp="children"
            placeholder="Select a Metric"
            showSearch
          >
            {allMetrics
              .filter((m) => m.disabled === false)
              .map(({ key, name }) => (
                <Option key={key} value={key}>
                  {name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Form.Item name="metricValue" noStyle>
            <InputNumber
              disabled={metric.disabled}
              max={metric.max}
              min={metric.min}
              step={metric.step}
            />
          </Form.Item>
          <span className="ant-form-text">{` ${metric.type}`}</span>
        </Form.Item>
        <Form.Item>
          <Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '0.5rem' }}
            >
              {buttonText}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
