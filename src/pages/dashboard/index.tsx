import React, { useContext } from 'react';
import { Divider } from 'antd';

import PatientBackground from '../../components/patient-background';
import NoPatient from '../../components/no-patient';
import History from '../../components/history';
import NoteForm from '../../components/note-form';
import { BackgroundContext } from '../../context/background';
import './styles.css';
import { DashboardBackground } from '../../services/types';

export default function Dashboard(): JSX.Element {
  const backgroundCtx = useContext(BackgroundContext);

  const {
    birthdate,
    country,
    firstName,
    gender,
    id,
    nativeLanguage,
    lastName,
  } = backgroundCtx.state;

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
