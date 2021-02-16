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

import { BackgroundContext } from '../../context/background';
import { countries, languages, idGenerator } from '../../utils/patient/index';
import { monthDayYear, yearMonthDay } from '../../utils/dates/index';
import { Store } from 'antd/lib/form/interface';
import './styles.css';
import { clearStorage } from '../../utils/data';
import {
  ItemType,
  PatientBackground,
  PatientSearchItem,
} from '../../utils/types';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function NewPatientForm(): JSX.Element {
  const { update } = useContext(BackgroundContext);
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
    const id = idGenerator(data.birthdate, data.firstName, data.lastName);
    const birthdate = data.birthdate.format(yearMonthDay);
    const time = Date.now();
    if (!data.mobile) delete data.mobile;
    console.log(data);
    const backgroundData = buildBackgroundData(id, birthdate, time, data);
    const searchData = buildSearchData(id, birthdate, time, data);
    postNewPatient(backgroundData, searchData);
  }

  const buildBackgroundData = (
    id: string,
    birthdate: string,
    time: number,
    data: Store
  ): PatientBackground => {
    const backgroundData: PatientBackground = {
      id,
      key: ItemType.BACKGROUND,
      type: ItemType.BACKGROUND,
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

  const buildSearchData = (
    id: string,
    birthdate: string,
    time: number,
    data: Store
  ): PatientSearchItem => {
    const searchData: PatientSearchItem = {
      id: birthdate,
      key: id,
      type: ItemType.PATIENT_SEARCH,
      birthdate,
      firstName: data.firstName,
      gender: data.gender,
      lastName: data.lastName,
      nativeLanguage: data.nativeLanguage,
      createdAt: time,
      modifiedAt: time,
    };

    if (data.mobile) searchData.mobile = data.mobile;

    return searchData;
  };

  // TODO refactor as promise.all
  // todo type
  function postNewPatient(
    backgroundData: PatientBackground,
    searchData: PatientSearchItem
  ): void {
    console.log(searchData);
    // todo -> could be a batch write... but choosing speed instead of elegance
    const savedPatientBackground = false;
    const savedPatientSearch = false;
    // todo -> catches
    // postItem(backgroundData).then((success: boolean) => {
    // savedPatientBackground = success;
    // });
    // postItem(searchData).then((success: boolean) => {
    // savedPatientSearch = success;
    // });
    if (savedPatientBackground && savedPatientSearch) {
      clearStorage();
      setPatient(backgroundData);
      message.success('Success: Record Saved');
    } else message.error('Error: Failed to Save Record');
  }

  // todo type
  function setPatient(data: any) {
    update({
      ...data,
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
