import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { PatientContext } from '../../context/patient';
import {
  getMetrics,
  postPatientMetric,
  requestSuccess,
} from '../../services/api';
import { messageUserResult } from '../../utils/ui';
import { MetricsContext } from '../../context/metrics';
import { PatientMetric } from '../../utils/types';

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
    if (state?.patient?.id && data?.id && data?.value) {
      const patientId = state.patient.id;
      const metricId = data.id;
      const value = data.value;
      const comment = data?.comment ?? null;
      const {
        id = null,
        status,
        createdAt = null,
        modifiedAt = null,
      } = await postPatientMetric(patientId, metricId, value, comment);
      const success = requestSuccess(status);
      handleSaveMetricResult(
        success,
        id,
        patientId,
        metricId,
        value,
        comment,
        createdAt,
        modifiedAt
      );
    }
  }

  function handleSaveMetricResult(
    success: boolean,
    id: number | null,
    patientId: number,
    metricId: number,
    value: string,
    comment: string | null,
    createdAt: string | null,
    modifiedAt: string | null
  ) {
    const successMessage = 'Metric saved';
    const failureMessage = 'Failed to save metric';
    messageUserResult(success, successMessage, failureMessage);
    if (id && createdAt && modifiedAt) {
      addMetricToContext(
        id,
        patientId,
        metricId,
        value,
        comment,
        createdAt,
        modifiedAt
      );
    }
  }

  function addMetricToContext(
    id: number,
    patientId: number,
    metricId: number,
    value: string,
    comment: string | null,
    createdAt: string,
    modifiedAt: string
  ) {
    const pm: PatientMetric = {
      id,
      metricId,
      value,
      comment,
      patientId,
      createdAt,
      modifiedAt,
    };

    const existingState = state.metrics ?? [];
    const newState: PatientMetric[] = [pm, ...existingState];
    update({
      ...state,
      metrics: newState,
    });
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
                {metric.metricName}
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
        <Form.Item name="comment" style={{ margin: 0 }}>
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            placeholder=""
            showCount={true}
            maxLength={140}
          />
        </Form.Item>
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
