import React, { useContext } from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { useHistory } from 'react-router-dom';

import { PatientContext } from '../../context/patient';
import { getItem } from '../../services/api';
import { monthDayYear, yearMonthDay } from '../../services/dates';
import { idGenerator } from '../../services/patient';
import { Store } from 'antd/lib/form/interface';
import { Item } from '../../services/types';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function PatientSearch(): JSX.Element {
  const patientCtx = useContext(PatientContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const onReset = () => form.resetFields();
  const onFinishFailed = () => null;
  const onFinish = (data: Store) => {
    const { firstName, lastName } = data;
    const birthdate = data.birthdate.format(yearMonthDay);
    const id = idGenerator(birthdate, firstName, lastName);
    const item: Item = {
      id,
      key: 'background',
    };

    getItem(item).then((body: any) => {
      if (Object.entries(body).length > 0) {
        patientCtx.update(body);
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
