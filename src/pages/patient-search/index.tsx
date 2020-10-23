import React, { useContext } from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { useHistory } from 'react-router-dom';

// import { MetricsContext } from '../../context/metrics';
import { PatientContext } from '../../context/patient';
import { get } from '../../services/api';
import { monthDayYear, yearMonthDay } from '../../services/dates';
import { idGenerator } from '../../services/patient';
import { Store } from 'antd/lib/form/interface';
// import { getMetrics } from '../../services/metrics';
// import { MetricObject } from '../../services/metrics/types';
import { PatientGeneralDetails } from '../../services/patient/types';
import { Item } from '../../services/api/types';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function PatientSearch(): JSX.Element {
  // const metricsCtx = useContext(MetricsContext);
  const patientCtx = useContext(PatientContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const { REACT_APP_DEFAULT_KEY, REACT_APP_PATIENT_API } = process.env;

  const onReset = () => form.resetFields();
  const onFinishFailed = () => null;
  const onFinish = (data: Store) => {
    if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

    const { firstName, lastName } = data;
    const birthdate = data.birthdate.format(yearMonthDay);
    const id = idGenerator(birthdate, firstName, lastName);
    const item: Item = {
      id,
      key: REACT_APP_DEFAULT_KEY ?? 'general',
    };

    get(REACT_APP_PATIENT_API, item).then((res) => {
      if (res.status === 200) {
        patientCtx.update(res.data as PatientGeneralDetails);
        // getMetrics(id).then((res: MetricObject | void) => {
        //   if (res) metricsCtx.update(res);
        // });
        message.success('Patient Found');
        history.push('/dashboard');
      } else {
        message.warn('Unable to Find Patient');
      }
    });
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'First name is required.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Last name is required.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[{ required: true, message: 'Birthdate is required.' }]}
        >
          <DatePicker format={monthDayYear} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button className="submit-btn" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default PatientSearch;
