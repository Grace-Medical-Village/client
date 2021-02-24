import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { PatientContext } from '../../context/patient';
import {
  getMetrics,
  getPatientMetrics,
  postPatientMetric,
  requestSuccess,
} from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { PatientData } from '../../utils/types';
import { MetricsContext } from '../../context/metrics';

export default function NotesForm(): JSX.Element {
  const [form] = useForm();
  const { state, update } = useContext(PatientContext);
  const metricsCtx = useContext(MetricsContext);
  const [label, setLabel] = useState('');

  const layout = {
    wrapperCol: { span: 24 },
  };

  useEffect(() => {
    const setMetrics = async (): Promise<void> => {
      const data = await getMetrics();
      metricsCtx.update(data);
    };
    if (metricsCtx.state.length === 0) setMetrics();
  }, [metricsCtx]);

  function onReset() {
    form.resetFields();
  }

  async function onFinish(data: Store) {
    if (!data.id || !data.value || !state?.patient?.id)
      message.warn('Unable to save metric');
    else {
      const { status } = await postPatientMetric(
        state.patient.id,
        data.id,
        data.value
      );
      const description = 'Metric saved';
      notificationHandler(status, description, 'bottomRight');
      if (requestSuccess(status)) fetchMetrics(state.patient.id);
    }
  }

  async function fetchMetrics(id: number) {
    const metrics = await getPatientMetrics(id);
    const data: PatientData = {
      ...state,
      metrics,
    };
    update(data);
    onReset();
  }

  const handleMetricChange = (id: number) => {
    const metrics = metricsCtx.state.filter((metric) => metric.id === id);
    if (metrics.length === 1) {
      setLabel(metrics[0].uom);
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      layout="vertical"
      name="metricForm"
      onFinish={onFinish}
      style={{ marginTop: '0.5rem' }}
    >
      <Input.Group compact>
        <Form.Item
          name="id"
          noStyle
          rules={[{ required: true, message: 'Metric is required' }]}
        >
          <Select
            onChange={handleMetricChange}
            placeholder="Select metric"
            style={{ width: '30%' }}
          >
            {metricsCtx.state.map((metric) => (
              <Select.Option key={metric.id} value={metric.id}>
                {metric.metric_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="value"
          noStyle
          rules={[{ required: true, message: 'Value is required' }]}
        >
          <Input style={{ width: '30%' }} placeholder="Input value" />
        </Form.Item>
        <span style={{ paddingLeft: '4px' }}>
          {label.length > 0 ? label : null}
        </span>
      </Input.Group>
      <Form.Item>
        <Row style={{ paddingTop: '1rem' }}>
          <Button
            htmlType="submit"
            style={{ marginRight: '0.5rem' }}
            type="primary"
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}
