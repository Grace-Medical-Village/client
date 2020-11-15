import React, { useContext, useState } from 'react';
import { Divider, Radio, Typography } from 'antd';

import PatientBackground from '../../components/patient-background';
import PatientMetrics from '../../components/patient-metrics';
import NoPatient from '../../components/no-patient';
import History from '../../components/history';
import NoteForm from '../../components/note-form';
import { BackgroundContext } from '../../context/background';
import './styles.css';
import { DashboardBackground } from '../../utils/types';

const { Title } = Typography;

export default function Dashboard(): JSX.Element {
  const { state } = useContext(BackgroundContext);
  const [selection, setOption] = useState('notes');
  const [component, setComponent] = useState(<NoteForm />);

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
    { label: 'Note', value: 'notes' },
    { label: 'Metrics', value: 'metrics' },
    { label: 'Medication', value: 'medication', disabled: true },
  ];

  // todo type
  function onChange(e: any) {
    const { value } = e.target;
    setOption(value);
    switch (value) {
      case 'notes':
        setComponent(<NoteForm />);
        break;
      case 'metrics':
        setComponent(<PatientMetrics />);
        break;
    }
  }

  return (
    <>
      <div style={{ padding: '2rem' }}>
        {id ? (
          <>
            <PatientBackground {...patientBackground} />
            <Divider />
            <Title level={4}>Patient History</Title>
            <History />
            <Divider />
            <Title level={4}>Patient Data</Title>
            <Radio.Group
              buttonStyle="solid"
              options={options}
              onChange={onChange}
              optionType="button"
              style={{ marginBottom: '1rem' }}
              value={selection}
            />
            {component}
          </>
        ) : (
          <NoPatient />
        )}
      </div>
    </>
  );
}
