import React, { useContext } from 'react';
import { Divider } from 'antd';

import PatientBackground from '../../components/patient-background';
import PatientMetrics from '../../components/patient-metrics';
import NoPatient from '../../components/no-patient';
import { PatientContext } from '../../context/patient';
import './styles.css';

function PatientDashboard() {
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

  const patientBackground = {
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
            <PatientMetrics />
          </>
        ) : (
          <NoPatient />
        )}
      </div>
    </>
  );
}

export default PatientDashboard;
