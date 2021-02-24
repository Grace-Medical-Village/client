import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, DatePicker, Radio, Input, Card, Empty } from 'antd';

import {
  monthDayYear,
  monthDayYearFullDate,
  toIso8601DateFromDate,
} from '../../utils/dates';
import { Store } from 'antd/lib/form/interface';
import {
  getPatient,
  getPatientsByBirthdate,
  getPatientsByName,
} from '../../services/api';
import { PatientSearchResult } from '../../utils/types';
import { capitalize, isEmpty } from 'lodash';
import { PatientContext } from '../../context/patient';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

function PatientSearch(): JSX.Element {
  const { state, update } = useContext(PatientContext);
  const [form] = Form.useForm();
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const [searching, setSearching] = useState(false);
  const [patientFound, setPatientFound] = useState(false);
  const [patientSelected, setPatientSelected] = useState(false);
  const [patientSearchResult, setPatientSearchResult] = useState<
    PatientSearchResult[]
  >([]);

  useEffect(() => {
    if (patientSelected && state?.patient?.id) {
      localStorage.setItem('patientId', state.patient.id.toString());
      history.push('/dashboard');
    }
  }, [state, history, patientSelected]);

  const onChange = () => {
    setToggle(!toggle);
  };
  const onReset = () => form.resetFields();
  const onFinishFailed = () => null;
  const onFinish = (data: Store) => {
    if (toggle) searchPatientsByName(data.name);
    else searchPatientsByBirthdate(data.birthdate);
  };

  const searchPatientsByName = async (name: string) => {
    setSearching(true);
    const searchResult = await getPatientsByName(name);
    if (searchResult.length > 0) {
      setPatientSearchResult(
        searchResult.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
      );
      setPatientFound(true);
    }
  };

  const searchPatientsByBirthdate = async (date: Date) => {
    setSearching(true);
    const searchResult = await getPatientsByBirthdate(
      toIso8601DateFromDate(date)
    );
    if (searchResult.length > 0) {
      setPatientSearchResult(
        searchResult.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
      );
      setPatientFound(true);
    }
  };

  const selectPatient = async (id: number) => {
    const result = await getPatient(id, true, true, true, true, true);
    if (!isEmpty(result.patient)) {
      update(result);
      setPatientSelected(true);
    }
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        initialValues={{ searchType: 'nameSearch' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Search By" name="searchType">
          <Radio.Group onChange={onChange}>
            <Radio.Button value="nameSearch">Name</Radio.Button>
            <Radio.Button value="birthdaySearch">Birthday</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {toggle ? (
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name is required.' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            label="Date of Birth"
            name="birthdate"
            rules={[{ required: true, message: 'Birthdate is required.' }]}
          >
            <DatePicker format={monthDayYear} />
          </Form.Item>
        )}
        <Form.Item {...tailLayout}>
          <Button className="submit-btn" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      {searching ? (
        <Card title="Patients Found">
          {patientSearchResult.length > 0 ? (
            patientSearchResult.map((res, i) => {
              const fullName = `${res.first_name} ${res.last_name}`;
              return (
                <Card
                  extra={
                    <a onClick={() => selectPatient(res.id)}>Select Patient</a>
                  }
                  key={i}
                  style={{ marginTop: i > 0 ? 16 : 0 }}
                  title={fullName}
                  type="inner"
                >
                  {res.birthdate ? (
                    <p>Date of Birth: {monthDayYearFullDate(res.birthdate)}</p>
                  ) : null}
                  {res.gender ? <p>Gender: {capitalize(res.gender)}</p> : null}
                  {res.mobile ? <p>Mobile: {res.mobile}</p> : null}
                </Card>
              );
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Card>
      ) : null}
    </>
  );
}

export default PatientSearch;
