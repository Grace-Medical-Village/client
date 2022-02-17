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
import { PatientMetric, Metric } from '../../utils/types';

export default function NotesForm(): JSX.Element {
  const [form] = useForm();
  const [m, setMetric] = useState<Metric | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { state, update } = useContext(PatientContext);
  const metricsCtx = useContext(MetricsContext);

  const layout = {
    wrapperCol: { span: 24 },
  };

  useEffect(() => {
    const setMetrics = async (): Promise<void> => {
      const data = await getMetrics();
      metricsCtx.update(data);
    };
    if (metricsCtx.state.length === 0)
      setMetrics()
        .then((r) => r)
        .catch((err) => console.error(err));
  }, [metricsCtx]);

  function onReset() {
    form.resetFields();
    setDisabled(true);
  }

  async function onFinish(data: Store) {
    if (state?.patient?.id && data?.id && data?.value) {
      const patientId = state.patient.id;
      const metricId = data.id;
      const value = data.value;
      const comment = data?.comment ?? null;
      const {
        status,
        id = null,
        error = null,
        createdAt = null,
        modifiedAt = null,
      } = await postPatientMetric(patientId, metricId, value, comment);
      console.log(error);
      const success = requestSuccess(status);
      handleSaveMetricResult(
        success,
        id,
        patientId,
        metricId,
        value,
        comment,
        createdAt,
        modifiedAt,
        error
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
    modifiedAt: string | null,
    error: string | null
  ) {
    const successMessage = 'Metric saved';
    const failureMessage = error ? error : 'Failed to save metric';
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
    metricsCtx.state.forEach((metric) => {
      if (metric.id === id) {
        setMetric(metric);
      }
    });
    setDisabled(false);
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
            style={{ width: '25%' }}
          >
            {metricsCtx.state
              .filter((metric) => !(metric?.archived ?? false))
              .sort((a, b) =>
                a.metricName
                  .toLowerCase()
                  .localeCompare(b.metricName.toLowerCase())
              )
              .map((metric) => (
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
          {m && !disabled ? (
            <Input
              maxLength={10}
              placeholder={m.format}
              style={{ marginLeft: '0.5rem', width: '25%' }}
              suffix={m.uom}
            />
          ) : (
            <Input disabled style={{ marginLeft: '0.5rem', width: '25%' }} />
          )}
        </Form.Item>
        <Form.Item
          name="comment"
          style={{ marginLeft: '0.5rem', width: '35%' }}
        >
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            maxLength={140}
            placeholder="Comments"
            showCount={true}
          />
        </Form.Item>
      </Input.Group>
      <Form.Item>
        <Row>
          <Button
            ghost
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
