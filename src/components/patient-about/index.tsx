import React, { useContext } from 'react';
import { Descriptions, Row } from 'antd';

import { getAge, monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { capitalize } from 'lodash';

export default function PatientAbout(): JSX.Element {
  const { state } = useContext(PatientContext);
  const check = '✅';
  const redX = '❌';
  const selectCheckbox = (b: boolean): string => (b ? check : redX);

  const data = [
    {
      title: 'Age',
      value: state?.patient?.birthdate
        ? getAge(state.patient.birthdate)
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
      title: 'Native Language',
      value: capitalize(state?.patient?.nativeLanguage) ?? 'N/A',
    },
    {
      title: 'Map',
      value: selectCheckbox(Boolean(state?.patient?.map)) ?? 'N/A',
    },
    {
      title: 'Smoker',
      value: selectCheckbox(Boolean(state?.patient?.smoker)) ?? 'N/A',
    },
  ];

  return (
    <>
      <Row>
        <Descriptions bordered>
          {data.map(({ title, value }) => (
            <Descriptions.Item key={title} label={title}>
              {value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Row>
    </>
  );
}
