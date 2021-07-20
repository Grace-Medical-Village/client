import React from 'react';
import { Collapse, Typography } from 'antd';
import { Change } from './types';
import './styles.css';

function ChangeLog(): JSX.Element {
  const { Panel } = Collapse;

  const changes: Change[] = [
    {
      dateRange: 'Next Week',
      medicalTeam: [
        'Blood Pressure Line Graph with Time Range for Patients',
        'Blood Sugar Line Graph with Time Range for Patients',
        'Clean up Metric Value in Patient Tables',
        'Dev team needs feedback from medical team on allergy display',
      ],
      devTeam: [
        'Backend Test Suite',
        'Cron to Improve Performance on Saturdays',
        'Error Boundaries',
        'Lazy Loading',
      ],
    },
    {
      dateRange: '7/19/2021 - 7/25/2021',
      medicalTeam: [
        'Added Amharic to Language List',
        'Blood Pressure Metric Max Value is 500 (was 300 before)',
        'Pain Metric added (range 0-10)',
        'PulseOx Metric added (range 50-100)',
        'Unique Patients in Analytics (no date range)',
        'MAP Patients in Analytics (no date range)',
      ],
      devTeam: [
        'Analytics API',
        'Change Log',
        'Health Check API',
        'TypeScript Cleanup',
      ],
    },
  ];

  return (
    <>
      <div className="change-log">
        <Typography.Title level={2}>Change Log</Typography.Title>
        <Typography.Title level={5}>
          See below the latest changes to the application
        </Typography.Title>
        <Collapse>
          {changes.map((change, idx) => (
            <Panel header={change.dateRange} key={idx}>
              <Typography.Title level={5}>Medical Team</Typography.Title>
              {change.medicalTeam.map((description, idx) => (
                <Typography.Text key={idx}>{description}</Typography.Text>
              ))}
              <Typography.Title level={5}>Dev Team</Typography.Title>
              {change.devTeam.map((description, idx) => (
                <Typography.Text key={idx.toString()}>
                  {description}
                </Typography.Text>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
}

export default ChangeLog;
