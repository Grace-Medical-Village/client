import React, { useContext, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Rate,
  Select,
  message,
} from 'antd';

import { post } from '../../services/api';
import { PatientContext } from '../../context/patient';
import {
  countries,
  languages,
  idGenerator,
} from '../../services/patient/index';
import { monthDayYear, yearMonthDay } from '../../services/date/index';
import { Store } from 'antd/lib/form/interface';
import { NewPatient } from './types';
import './styles.css';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function NewPatientForm() {
  const patientCtx = useContext(PatientContext);
  const [form] = Form.useForm();
  const [nativeLiteracyRating, setNativeLiteracyRating] = useState(3);

  const { REACT_APP_DEFAULT_KEY, REACT_APP_PATIENT_API } = process.env;
  const nativeLiteracyRatings = [
    'Poor',
    'Below Average',
    'Average',
    'Above Average',
    'Excellent',
  ];

  // TODO
  const onChange = () => null;
  const onBlur = () => null;
  const onFocus = () => null;
  const onSearch = () => null;
  const onFinishFailed = () => null;
  const onReset = () => form.resetFields();

  function onFinish(data: Store) {
    data.birthdate = data.birthdate.format(yearMonthDay);
    data.id = idGenerator(data.birthdate, data.firstName, data.lastName);
    data.key = REACT_APP_DEFAULT_KEY ?? 'general';
    postNewPatient(data);
  }
  function postNewPatient(data: any): void {
    if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

    post(REACT_APP_PATIENT_API, data).then((status) => {
      // TODO Refactor
      const postSuccess: boolean = status === 200;
      if (postSuccess) {
        setPatient(data);
        message.success('New Patient Added');
      } else {
        message.error('Unable to Add New Patient');
      }
    });
  }

  function setPatient(data: NewPatient) {
    const {
      birthdate,
      country,
      email,
      firstName,
      gender,
      id,
      key,
      language,
      literacy,
      lastName,
      zipCode5,
    } = data;

    patientCtx.update({
      birthdate,
      country,
      email,
      firstName,
      gender,
      id,
      key,
      language,
      literacy,
      lastName,
      zipCode5,
    });
  }

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
        <Form.Item label="Email" name="email">
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
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
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
        <Form.Item
          label="Native Language Literacy Rating"
          name="nativeLiteracy"
        >
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
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
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
