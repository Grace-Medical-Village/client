import React, { useContext, useState } from 'react';
import { Button, Form, Input, Radio, Rate, Select, Switch } from 'antd';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';
import MaskedInput from 'antd-mask-input';

import {
  countries,
  languages,
  nativeLiteracyRatings,
} from '../../utils/patient';
import './styles.css';
import { getPatient, postPatient, requestSuccess } from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { PatientContext } from '../../context/patient';
import { PatientBackground } from '../../utils/types';
import { mobileCleaner } from '../../utils/data';
import { monthDayYear, toIso8601DateFromDate } from '../../utils/dates';

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
  const [nativeLiteracyRating, setNativeLiteracyRating] = useState(0);
  const [otherLanguageSelected, setOtherLanguageSelected] = useState(false);
  const { update } = useContext(PatientContext);

  const handleLanguageChange = (value: string) => {
    if (value.toLowerCase() === 'other') setOtherLanguageSelected(true);
    else setOtherLanguageSelected(false);
  };

  const onFinishFailed = () => null; // todo
  const onReset = () => form.resetFields();

  async function onFinish(data: Store) {
    const {
      firstName,
      lastName,
      birthdate,
      gender,
      email,
      mobile,
      country,
      nativeLanguage,
      otherLanguage,
      smoker,
      zipCode5,
    } = data;

    const birthdateFormatted = toIso8601DateFromDate(new Date(birthdate));
    const language = otherLanguage ? otherLanguage : nativeLanguage;
    const mobileFormatted = mobile ? mobile.replace(mobileCleaner, '') : '';

    const newPatient: PatientBackground = {
      firstName,
      lastName,
      gender,
      email,
      mobile: mobileFormatted,
      country,
      nativeLanguage: language,
      nativeLiteracy: nativeLiteracyRating,
      smoker,
      birthdate: birthdateFormatted,
      zipCode5,
    };
    const res = await postPatient(newPatient);
    if (requestSuccess(res.status)) {
      notificationHandler(res.status, 'Patient Saved', 'bottomRight');
      // onReset();
      if (res.id) {
        setNewPatient(res.id)
          .then(() => null)
          .catch((err) => console.error(err));
      }
    } else if (res.status === 409) {
      notificationHandler(res.status, 'Patient Already Exists', 'bottomRight');
    } else {
      notificationHandler(res.status, 'Unknown Error', 'bottomRight');
    }
  }

  const setNewPatient = async (id: number) => {
    const result = await getPatient(id);
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
          <MaskedInput
            mask="(111) 111-1111"
            name="mobile"
            placeholderChar="X"
          />
        </Form.Item>
        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[{ required: true, message: 'Birthdate is required.' }]}
        >
          <MaskedInput
            mask="11/11/1111"
            placeholder={monthDayYear}
            placeholderChar="X"
          />
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
          <MaskedInput mask="11111" name="zipCode5" placeholderChar="X" />
        </Form.Item>
        <Form.Item
          initialValue="English"
          label="Native Language"
          name="nativeLanguage"
        >
          <span>
            <Select
              onChange={handleLanguageChange}
              optionFilterProp="children"
              placeholder="Select a Language"
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
          </span>
        </Form.Item>
        {otherLanguageSelected ? (
          <Form.Item label="Other Language" name="otherLanguage">
            <Input maxLength={30} placeholder="Other Language" />
          </Form.Item>
        ) : null}
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
