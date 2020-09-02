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
      <div className="patient-flex">
        <Statistic title="Name" value={`${firstName} ${lastName}`} />
        <Statistic title="Age" value={age} />
        <Statistic title="Gender" value={capitalize(gender)} />
        <Statistic title="Language" value={capitalize(language)} />
        <Statistic title="Country" value={country} />
      </div>
    </>
  );
}

export default PatientOverview;
