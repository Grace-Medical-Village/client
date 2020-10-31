import React, { useContext } from 'react';
import { Divider } from 'antd';

import PatientBackground from '../../components/patient-background';
import NoPatient from '../../components/no-patient';
import History from '../../components/history';
import NoteForm from '../../components/note-form';
import { PatientContext } from '../../context/patient';
import './styles.css';
import { DashboardBackground } from '../../services/types';

export default function Dashboard(): JSX.Element {
  const patientCtx = useContext(PatientContext);

  const {
    birthdate,
    country,
    firstName,
    gender,
    id,
    nativeLanguage,
    lastName,
  } = patientCtx.state;

  const patientBackground: DashboardBackground = {
    birthdate,
    country,
    firstName,
    gender,
    nativeLanguage,
    lastName,
  };

  return (
    <>
      <div style={{ padding: '2rem' }}>
        {id ? (
          <>
            <PatientBackground {...patientBackground} />
            <Divider />
            <History />
            <NoteForm />
          </>
        ) : (
          <NoPatient />
        )}
      </div>
    </>
  );
}
