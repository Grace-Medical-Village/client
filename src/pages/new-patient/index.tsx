import React, { useContext } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';

import { post } from '../../services/api';
import { PatientContext } from '../../context/patient';
import {
  countries,
  languages,
  idGenerator,
} from '../../services/patient/index';
import { monthDayYear, yearMonthDay } from '../../services/date/index';
import './styles.css';
import { Store } from 'antd/lib/form/interface';

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

  const { REACT_APP_DEFAULT_KEY, REACT_APP_PATIENT_API } = process.env;

  const onChange = (value: any) => console.log(`TODO ${value}`);
  const onBlur = () => console.log('TODO');
  const onFocus = () => console.log('TODO');
  const onSearch = (val: any) => console.log('TODO:', val);

  const onFinish = (data: Store) => {
    if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');
    data.birthdate = data.birthdate.format(yearMonthDay);
    data.id = idGenerator(data.birthdate, data.firstName, data.lastName);
    data.key = REACT_APP_DEFAULT_KEY ?? 'general';

    // TODO - Refactor
    post(REACT_APP_PATIENT_API, data).then((status) => {
      if (status === 200) {
        const {
          birthdate,
          country,
          firstName,
          gender,
          id,
          key,
          language,
          lastName,
          zipCode5,
        } = data;

        patientCtx.update({
          birthdate,
          country,
          firstName,
          gender,
          id,
          key,
          language,
          lastName,
          zipCode5,
        });
      }
    });
  };
  const onFinishFailed = () => console.log('TODO');

  const onReset = () => form.resetFields();

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
          label="Hispanic"
          name="hispanic"
          rules={[{ required: true, message: 'Ethnicity is required.' }]}
        >
          <Radio.Group>
            <Radio.Button value="yes">Yes</Radio.Button>
            <Radio.Button value="no">No</Radio.Button>
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
          label="Primary Language"
          name="language"
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
