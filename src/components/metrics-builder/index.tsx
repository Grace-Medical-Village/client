import React, { useState, useContext, useEffect } from 'react';
import { Form, Select, InputNumber, Button, Row, message } from 'antd';

import { MetricsContext } from '../../context/metrics';
import { PatientContext } from '../../context/patient';
import { todayAsYearMonthDay } from '../../services/date';
import { allMetrics, postMetric } from '../../services/metrics';
import { Store } from 'antd/lib/form/interface';
import {
  MetricItem,
  MetricBuilderOption,
  PostMetricItem,
} from '../../services/metrics/types';
const { Option } = Select;

const layout = {
  wrapperCol: { span: 12 },
};

const noMetric = {
  key: 'noMetric',
  name: '',
  disabled: true,
  max: 0,
  min: 0,
  step: 0,
  type: '',
};

export default function MetricsBuilder(): JSX.Element {
  const metricsCtx = useContext(MetricsContext);
  const patientCtx = useContext(PatientContext);
  const { metrics } = metricsCtx.state;
  const { id } = patientCtx.state;

  const [metric, set] = useState<MetricBuilderOption>(noMetric);
  const [buttonText, setButtonText] = useState<string>('Submit');

  const [form] = Form.useForm();

  const date = todayAsYearMonthDay(new Date());

  const onChange = (metricKey: string) => {
    const m: MetricBuilderOption = allMetrics.filter(
      ({ key }) => metricKey === key
    )[0];
    set(m);
  };

  useEffect(() => {
    const o = metrics.filter(
      (m: any) => m.date === date && m.metric === metric
    );
    if (o.length >= 1) setButtonText('Update');
    else setButtonText('Submit');
  }, [metrics]);

  const onReset = () => {
    form.resetFields();
    setButtonText('Submit');
  };
  const onFinish = (data: Store) => {
    const { metricName, metricValue } = data;
    if (!metricName) message.warn('Select a Metric');
    else if (!metricValue) message.warn(`Provide a Value for ${metric.name}`);

    const postItem: PostMetricItem = {
      id: id,
      key: metricName,
      [date]: metricValue,
    };

    const postSuccess = postMetric(postItem);
    if (postSuccess) {
      const metricItem: MetricItem = {
        id: id,
        key: metricName,
        date,
        value: metricValue,
      };

      addMetricToState(metricItem);
      onReset();
    }
  };

  function addMetricToState(item: MetricItem): void {
    const oldState = metricsCtx.state.metrics;
    const newState: MetricItem[] = [...oldState, item];
    metricsCtx.update({ metrics: newState });
  }

  return (
    <>
      <Form {...layout} form={form} name="metricForm" onFinish={onFinish}>
        <Form.Item name="metricName">
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
