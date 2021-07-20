import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
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

import {
  getAge,
  monthDayYear,
  monthDayYearFullDate,
  yearMonthDay,
} from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { capitalize } from 'lodash';
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
import moment from 'moment';
import { putPatient } from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import MaskedInput from 'antd-mask-input';
import { mobileCleaner } from '../../utils/data';

const { Option } = Select;

export default function PatientAbout(): JSX.Element {
  const [data, setData] = useState<AboutDescriptionData[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [nativeLiteracyRating, setNativeLiteracyRating] = useState(0);
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
        value: capitalize(state?.patient?.gender) ?? 'N/A',
      },
      {
        title: 'Last Visit',
        value: getMostRecentMetricDate(),
      },
      {
        title: 'Native Language',
        value: capitalize(state?.patient?.nativeLanguage) ?? 'N/A',
      },
      {
        title: 'Smoker',
        value: capitalize(state?.patient?.smoker.toString()) ?? 'N/A',
      },
    ];
    setData(d);
  }, [state, getMostRecentMetricDate]);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    setShowDrawer(true);
  };

  async function onFinish(data: Store) {
    const birthdate: string = data.birthdate.format(yearMonthDay);
    const {
      firstName,
      lastName,
      gender,
      map,
      mobile = '',
      country,
      nativeLanguage,
      smoker,
      zipCode5,
    } = data;

    const mobileCleaned = mobile.replace(mobileCleaner, '');

    const patient: PatientBackground = {
      firstName,
      lastName,
      gender,
      map,
      mobile: mobileCleaned,
      country,
      nativeLanguage,
      nativeLiteracy: nativeLiteracyRating,
      zipCode5,
      smoker,
      birthdate,
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
            initialValue={moment(state.patient?.birthdate, 'YYYY-MM-DD')}
            label="Birthdate"
            name="birthdate"
            rules={[{ required: true, message: 'Birthdate is required.' }]}
          >
            <DatePicker format={monthDayYear} placeholder={monthDayYear} />
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
            initialValue={state.patient?.nativeLanguage}
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
