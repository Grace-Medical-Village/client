import React, { useEffect, useState } from 'react';
import { Statistic } from 'antd';

import { PatientBackground } from './types';
import { getAge } from '../../services/date';
import { capitalize } from '../../services/patient';

import './styles.css';

function PatientOverview({
  birthdate,
  country,
  firstName,
  gender,
  id,
  language,
  lastName,
}: PatientBackground) {
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (id) {
      setAge(getAge(birthdate));
    }
  }, [birthdate, id]);

  return (
    <>
      <div className="patient-flex">TODO</div>
    </>
  );
}

export default PatientOverview;
