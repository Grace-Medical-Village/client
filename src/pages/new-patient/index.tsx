import React, { useContext, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Rate,
  Select,
  Switch,
} from 'antd';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

import { countries, languages } from '../../utils/patient/index';
import { monthDayYear, yearMonthDay } from '../../utils/dates/index';
import { Store } from 'antd/lib/form/interface';
import './styles.css';
import { getPatient, postPatient, requestSuccess } from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { PatientContext } from '../../context/patient';
import { NewPatient } from '../../utils/types';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function NewPatientForm(): JSX.Element {
  const [form] = Form.useForm();
  const history = useHistory();
  const [nativeLiteracyRating, setNativeLiteracyRating] = useState(3);
  const { update } = useContext(PatientContext);

  const nativeLiteracyRatings = [
    'Poor',
    'Below Average',
    'Average',
    'Above Average',
    'Excellent',
  ];

  // todo
  const onFinishFailed = () => null;
  const onReset = () => form.resetFields();

  async function onFinish(data: Store) {
    console.log(data);
    const birthdate: string = data.birthdate.format(yearMonthDay);
    const {
      firstName,
      lastName,
      gender,
      email,
      height,
      mobile,
      country,
      nativeLanguage,
      nativeLiteracy,
      smoker,
    } = data;

    const newPatient: NewPatient = {
      firstName,
      lastName,
      gender,
      email,
      height,
      mobile,
      country,
      nativeLanguage,
      nativeLiteracy,
      smoker,
      birthdate,
    };
    const res = await postPatient(newPatient);
    const description = 'Patient saved';
    if (requestSuccess(res.status) && res.id) {
      notificationHandler(res.status, description, 'bottomRight');
      onReset();
      setNewPatient(res.id);
    }
  }

  const setNewPatient = async (id: number) => {
    const result = await getPatient(id, true, true, true, true, true);
    if (!isEmpty(result.patient)) {
      localStorage.setItem('patientId', id.toString());
      update(result);
    }
    history.push('/dashboard');
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
        <Form.Item label="Mobile" name="mobile">
          <Input />
        </Form.Item>
        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[{ required: true, message: 'Birthdate is required.' }]}
        >
          <DatePicker format={monthDayYear} />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Gender is required.' }]}
        >
          <Radio.Group>
            <Radio.Button value="male">Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
            <Radio.Button value="other">Other</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Zip Code"
          name="zipCode5"
          rules={[{ required: true, message: 'Zip code is required.' }]}
        >
          <Input maxLength={5} />
        </Form.Item>
        <Form.Item
          initialValue="English"
          label="Native Language"
          name="nativeLanguage"
        >
          <Select
            optionFilterProp="children"
            placeholder="Select a person"
            showSearch
            style={{ textTransform: 'capitalize', width: 200 }}
          >
            {languages.map((language) => (
              <Option
                key={language}
                style={{ textTransform: 'capitalize' }}
                value={language}
              >
                {language}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Native Language Literacy" name="nativeLiteracy">
          <span>
            <Rate
              tooltips={nativeLiteracyRatings}
              onChange={(v) => setNativeLiteracyRating(v)}
              value={nativeLiteracyRating}
            />
            {nativeLiteracyRating ? (
              <span className="ant-rate-text">
                {nativeLiteracyRatings[nativeLiteracyRating - 1]}
              </span>
            ) : (
              ''
            )}
          </span>
        </Form.Item>
        <Form.Item
          initialValue="United States"
          label="Country of Origin"
          name="country"
        >
          <Select
            optionFilterProp="children"
            placeholder="Select a country"
            showSearch
            style={{ width: 200 }}
          >
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Smoker" name="smoker" valuePropName="checked">
          <Switch />
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

export default NewPatientForm;
