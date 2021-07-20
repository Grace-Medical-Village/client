import React, { useEffect, useState } from 'react';
import { Popover, Typography, Button } from 'antd';
import { getMapPatientCount, getPatientCount } from '../../services/api';
import './styles.css';

function Analytics(): JSX.Element {
  const [patientCount, setPatientCount] = useState(0);
  const [mapPatientCount, setMapPatientCount] = useState(0);

  useEffect(() => {
    const buildAnalytics = async (): Promise<void> => {
      const patientCountResult = await getPatientCount();
      if (patientCountResult > 0) {
        setPatientCount(patientCountResult);
      }
      const mapPatientCountResult = await getMapPatientCount();
      if (mapPatientCountResult > 0) {
        setMapPatientCount(mapPatientCountResult);
      }
    };

    buildAnalytics()
      .then((r) => r)
      .catch((err) => console.error(err));
  }, []);

  const mapCalculationExplanation = (
    <span>
      <Typography.Text>Using the </Typography.Text>
      <Typography.Link href="https://www.map.org/domestic">
        MAP website
      </Typography.Link>
      <Typography.Text>
        {' '}
        as guidance, we count all patients with Asthma, Hypertension, Diabetes,
        or High Cholesterol
      </Typography.Text>
    </span>
  );

  return (
    <>
      <div className="analytics">
        <Typography.Title level={3}>
          Total Patients: {patientCount}
        </Typography.Title>

        <Typography.Title level={3}>
          MAP Patients: {mapPatientCount}
        </Typography.Title>
        <Popover
          content={mapCalculationExplanation}
          title="MAP Patient Count Calculation"
          trigger="hover"
        >
          <Button>How is this calculated?</Button>
        </Popover>
      </div>
    </>
  );
}

export default Analytics;
