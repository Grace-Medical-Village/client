import React, { useContext } from 'react';
import PatientOverview from '../../components/patient-overview';
// import NoPatient from '../../components/no-patient'; TODO
import NoPatient from '../../components/temp-patient';
import { PatientContext } from '../../context/patient';

import './styles.css';

function PatientDashboard() {
  const { state } = useContext(PatientContext);
  const {
    birthdate,
    country,
    firstName,
    gender,
    id,
    language,
    lastName,
  } = state;

  const patientBackground = {
    birthdate,
    country,
    firstName,
    gender,
    id,
    language,
    lastName,
  };

  return id ? <PatientOverview {...patientBackground} /> : <NoPatient />;
}

export default PatientDashboard;
