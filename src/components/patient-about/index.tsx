import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Descriptions,
  Drawer,
  Form,
  Input,
  Radio,
  Rate,
  Row,
  Select,
  Space,
  Switch,
} from 'antd';
import { capitalize } from 'lodash';

import {
  dateToMonthDayYear,
  getAge,
  monthDayYear,
  monthDayYearFullDate,
  toIso8601DateFromDate,
} from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import {
  PatientBackground,
  PatientData,
  PatientMetric,
} from '../../utils/types';
import {
  countries,
  languages,
  nativeLiteracyRatings,
} from '../../utils/patient';
import { Store } from 'antd/lib/form/interface';
import { putPatient } from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import MaskedInput from 'antd-mask-input';
import { mobileCleaner } from '../../utils/data';

const { Option } = Select;

export default function PatientAbout(): JSX.Element {
  const [data, setData] = useState<AboutDescriptionData[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [nativeLiteracyRating, setNativeLiteracyRating] = useState(0);
  const [otherLanguageSelected, setOtherLanguageSelected] = useState(false);
  const { state, update } = useContext(PatientContext);
  const [form] = Form.useForm();

  const getMostRecentMetricDate = useCallback(() => {
    let result = 'N/A';
    const metrics: PatientMetric[] = state?.metrics ?? [];
    const pm: PatientMetric | null =
      metrics.length > 0
        ? metrics.reduce(
            (x, y): PatientMetric => (x.createdAt > y.createdAt ? x : y)
          )
        : null;

    if (pm && pm?.createdAt) result = monthDayYearFullDate(pm.createdAt);

    return result;
  }, [state]);

  useEffect(() => {
    setNativeLiteracyRating(state?.patient?.nativeLiteracy ?? 0);
    if (
      state?.patient?.nativeLanguage === 'other' ||
      languages.filter((lang) => lang === state?.patient?.nativeLanguage)
        .length === 0
    ) {
      setOtherLanguageSelected(true);
    }

    const d: AboutDescriptionData[] = [
      {
        title: 'Age',
        value: state?.patient?.birthdate
          ? getAge(state.patient.birthdate).toString()
          : 'N/A',
      },
      {
        title: 'Birthday',
        value: state?.patient?.birthdate
          ? monthDayYearFullDate(state.patient.birthdate)
          : 'N/A',
      },
      {
        title: 'Gender',
        value: state?.patient?.gender
          ? capitalize(state.patient.gender)
          : 'N/A',
      },
      {
        title: 'Last Visit',
        value: getMostRecentMetricDate(),
      },
      {
        title: 'Native Language',
        value: state?.patient?.nativeLanguage
          ? capitalize(state.patient.nativeLanguage.toString())
          : 'N/A',
      },
      {
        title: 'Smoker',
        value: state?.patient?.smoker ? 'True' : 'False',
      },
    ];
    setData(d);
  }, [state, getMostRecentMetricDate]);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    setShowDrawer(true);
  };

  const handleLanguageChange = (value: string) => {
    if (value.toLowerCase() === 'other') setOtherLanguageSelected(true);
    else setOtherLanguageSelected(false);
  };

  async function onFinish(data: Store) {
    const {
      firstName,
      lastName,
      birthdate,
      gender,
      mobile,
      country,
      nativeLanguage,
      otherLanguage,
      smoker,
      zipCode5,
    } = data;

    const birthdateFormatted = toIso8601DateFromDate(new Date(birthdate));
    const language = otherLanguage ? capitalize(otherLanguage) : nativeLanguage;
    const mobileFormatted = mobile ? mobile.replace(mobileCleaner, '') : '';

    const patient: PatientBackground = {
      firstName,
      lastName,
      gender,
      mobile: mobileFormatted,
      country,
      nativeLanguage: language,
      nativeLiteracy: nativeLiteracyRating,
      zipCode5,
      smoker,
      birthdate: birthdateFormatted,
    };
    if (state.patient?.id) {
      const res = await putPatient(state.patient.id, patient);
      if (res.status === 200) {
        notificationHandler(res.status, 'Patient Updated', 'bottomRight');
        updatePatientCtx(state.patient.id, patient);
      } else if (res.status === 409) {
        notificationHandler(
          res.status,
          'Patient Already Exists',
          'bottomRight'
        );
      }
    }
  }

  const updatePatientCtx = (id: number, patient: PatientBackground): void => {
    const updatedPatient: PatientData = {
      ...state,
      patient: {
        id,
        ...patient,
      },
    };
    update(updatedPatient);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  type AboutDescriptionData = {
    title: string;
    value: string;
  };

  return (
    <>
      <Row>
        <Space direction="vertical">
          <Descriptions bordered>
            {data.map(({ title, value }) => {
              return (
                <Descriptions.Item key={title} label={title}>
                  {value}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
          <Button block ghost onClick={(e) => handleClick(e)} type="primary">
            Edit
          </Button>
        </Space>
      </Row>
      <Drawer
        title="Modify Patient"
        width={720}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            initialValue={state.patient?.firstName}
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'First name is required.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={state.patient?.lastName}
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Last name is required.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={state.patient?.mobile}
            label="Mobile"
            name="mobile"
          >
            <MaskedInput
              mask="(111) 111-1111"
              name="mobile"
              placeholderChar="X"
            />
          </Form.Item>
          <Form.Item
            initialValue={
              state.patient?.birthdate
                ? dateToMonthDayYear(state.patient.birthdate)
                : ''
            }
            label="Birthdate"
            name="birthdate"
            rules={[{ required: true, message: 'Birthdate is required.' }]}
          >
            <MaskedInput
              mask="11/11/1111"
              name="birthdate"
              placeholder={monthDayYear}
              placeholderChar="X"
            />
          </Form.Item>
          <Form.Item
            initialValue={state.patient?.gender}
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
            initialValue={state.patient?.zipCode5}
            label="Zip Code"
            name="zipCode5"
            rules={[{ required: true, message: 'Zip code is required.' }]}
          >
            <MaskedInput mask="11111" name="zipCode5" placeholderChar="X" />
          </Form.Item>
          <Form.Item
            initialValue={
              languages.filter((lang) => lang === state.patient?.nativeLanguage)
                .length === 1
                ? state.patient?.nativeLanguage
                : 'other'
            }
            label="Native Language"
            name="nativeLanguage"
          >
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
          </Form.Item>
          {otherLanguageSelected ? (
            <Form.Item
              initialValue={
                languages.filter(
                  (lang) => lang === state.patient?.nativeLanguage
                ).length === 0
                  ? state.patient?.nativeLanguage
                  : null
              }
              label="Other Language"
              name="otherLanguage"
            >
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
            initialValue={state.patient?.country}
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
          <Form.Item
            initialValue={state.patient?.smoker ?? false}
            label="Smoker"
            name="smoker"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => setShowDrawer(false)}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
