import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Rate, Select } from 'antd';

import { countries, languages } from '../../utils/patient/index';
import { monthDayYear, yearMonthDay } from '../../utils/dates/index';
import { Store } from 'antd/lib/form/interface';
import './styles.css';

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
  const [nativeLiteracyRating, setNativeLiteracyRating] = useState(3);

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

  function onFinish(data: Store) {
    const birthdate = data.birthdate.format(yearMonthDay);
    const time = Date.now();
    if (!data.mobile) delete data.mobile;
    console.log(data);
    const patient = buildPatient(birthdate, time, data);
    console.log(patient);
    // TODO -> POST PATIENT
    // TODO -> SET LOCAL STORAGE
    // TODO -> PUSH TO DASHBOARD
    // postNewPatient(patient);
  }

  // TODO TYPE
  const buildPatient = (birthdate: string, time: number, data: Store) => {
    const backgroundData: any = {
      birthdate,
      country: data.country,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      nativeLanguage: data.nativeLanguage,
      nativeLiteracy: data.nativeLiteracy,
      zipCode5: data.zipCode5,
      createdAt: time,
      modifiedAt: time,
    };
    if (data.mobile) backgroundData.mobile = data.mobile;

    return backgroundData;
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
