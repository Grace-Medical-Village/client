import React, { useContext } from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { useHistory } from 'react-router-dom';

import { PatientContext } from '../../context/patient';
import { get } from '../../services/api';
import { monthDayYear, yearMonthDay } from '../../services/date';
import { idGenerator } from '../../services/patient';
import { Store } from 'antd/lib/form/interface';
import { PatientId } from './types';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function PatientSearch() {
  const patientCtx = useContext(PatientContext);
  const [form] = Form.useForm();
  let history = useHistory();

  const { REACT_APP_DEFAULT_KEY, REACT_APP_PATIENT_API } = process.env;

  const onReset = () => form.resetFields();
  const onFinishFailed = () => null;
  const onFinish = (data: Store) => {
    if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

    const { firstName, lastName } = data;
    const birthdate = data.birthdate.format(yearMonthDay);
    const id = idGenerator(birthdate, firstName, lastName);
    const params: PatientId = {
      id,
      key: REACT_APP_DEFAULT_KEY ?? 'general',
    };

    // TODO - Refactor
    get(REACT_APP_PATIENT_API, params).then((res) => {
      if (res.status === 200) {
        const {
          birthdate,
          country,
          email,
          firstName,
          gender,
          id,
          key,
          language,
          lastName,
          literacy,
          zipCode5,
        } = res.data;

        patientCtx.update({
          birthdate,
          country,
          email,
          firstName,
          gender,
          id,
          key,
          language,
          lastName,
          literacy,
          zipCode5,
        });
        message.success('Patient Found');
        history.push('/dashboard');
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
