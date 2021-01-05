import React, { useContext, useState } from 'react';
import { Divider, Radio, Typography } from 'antd';

import PatientBackground from '../../components/patient-background';
import PatientMetrics from '../../components/patient-metrics';
import NoPatient from '../../components/no-patient';
import History from '../../components/history';
import NoteForm from '../../components/note-form';
import { BackgroundContext } from '../../context/background';
import './styles.css';
import { DashboardBackground, ItemType } from '../../utils/types';

const { Title } = Typography;

export default function Dashboard(): JSX.Element {
  const { state } = useContext(BackgroundContext);
  const [selection, setOption] = useState(ItemType.NOTE);
  const [dataEntryComponent, setDataEntryComponent] = useState(<NoteForm />);

  const {
    birthdate,
    country,
    firstName,
    gender,
    id,
    nativeLanguage,
    lastName,
  } = state;

  const patientBackground: DashboardBackground = {
    birthdate,
    country,
    firstName,
    gender,
    nativeLanguage,
    lastName,
  };

  const options = [
    { label: 'Note', value: ItemType.NOTE },
    { label: 'Metrics', value: ItemType.METRIC },
    { label: 'Medication', value: ItemType.MEDICATION, disabled: true },
  ];

  // todo type
  function onChange(e: any) {
    const { value } = e.target ?? ItemType.NOTE;
    setOption(value);
    switch (value) {
      case ItemType.NOTE:
        setDataEntryComponent(<NoteForm />);
        break;
      case ItemType.METRIC:
        setDataEntryComponent(<PatientMetrics />);
        break;
    }
  }

  return (
    <>
      <div style={{ padding: '2rem' }}>
        {id ? (
          <>
            <Title level={4}>
              {firstName} {lastName}
            </Title>
            <PatientBackground {...patientBackground} />
            <History />
            <Divider />
            <Title level={4}>Data Entry</Title>
            <Radio.Group
              buttonStyle="solid"
              options={options}
              onChange={onChange}
              optionType="button"
              style={{ marginBottom: '1rem' }}
              value={selection}
            />
            {dataEntryComponent}
            <Divider />
            <Title level={4}>Data Analysis</Title>
          </>
        ) : (
          <NoPatient />
        )}
      </div>
    </>
  );
}
