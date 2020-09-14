import React, { useState, useContext } from 'react';
import { Form, Select, InputNumber, Button, Row, message } from 'antd';

import { PatientContext } from '../../context/patient';
import { post } from '../../services/api';
import { todayAsYearMonthDay } from '../../services/date';
import { metrics } from '../../services/patient';
import { Store } from 'antd/lib/form/interface';
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

export default function MetricsBuilder() {
  const patientCtx = useContext(PatientContext);
  const { id } = patientCtx.state;
  const [metric, set] = useState(noMetric);
  const [form] = Form.useForm();

  const { REACT_APP_PATIENT_API } = process.env;

  const onChange = (metricKey: string) => {
    const m: any = metrics.filter(({ key }) => metricKey === key)[0];
    set(m);
  };
  const onReset = () => form.resetFields();
  const onFinish = (data: Store) => {
    const { metricName, metricValue } = data;
    console.log(data);
    saveRecord(metricName, metricValue);
  };

  const saveRecord = (metricName: string, metricValue: number) => {
    if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

    const date = todayAsYearMonthDay(new Date());
    const data = {
      id: id,
      key: metricName,
      [date]: metricValue,
    };
    if (metricName && metricValue) {
      post(REACT_APP_PATIENT_API, data).then((status) => {
        // TODO Refactor
        const postSuccess: boolean = status === 200;
        if (postSuccess) {
          message.success('Metric Saved');
          onReset();
        } else {
          message.error('Unable to Save Metric');
        }
      });
    } else if (!metricName) {
      message.warn('Select a Metric');
    } else if (!metricValue) {
      message.warn(`Provide a Value for ${metric.name}`);
    }
  };

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
            {metrics
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
              Submit
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
