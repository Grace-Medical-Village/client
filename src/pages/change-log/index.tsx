import React from 'react';
import { Collapse, Typography } from 'antd';
import { Change } from './types';
import './styles.css';

function ChangeLog(): JSX.Element {
  const { Panel } = Collapse;

  const changes: Change[] = [
    {
      dateRange: 'Upcoming',
      medicalTeam: ['Touchpad issue'],
      devTeam: [
        'Monitoring & Surveillance',
        'Performance Improvements',
        'Test Suite',
      ],
    },
    {
      dateRange: 'This Week',
      medicalTeam: [
        'Allergy tracking',
        'Date range for patient count',
        'List of MAP Patients in Analytics',
        'Last Menstrual Period Date Metric',
        'Blood Pressure Line Graph with Time Range for Patients',
        'Blood Sugar Line Graph with Time Range for Patients',
        "Make 'Strength' column empty if it's not needed",
      ],
      devTeam: [],
    },
    {
      dateRange: 'July 17 - 24, 2021',
      medicalTeam: [
        'Added Amharic to Language List',
        'Blood Pressure Metric Max Value is 500 (was 300 before)',
        'Added space between metric value and unit of measure in metric table',
        'Pain Metric added (range 0-10)',
        'PulseOx Metric added (range 50-100)',
        'Unique Patients in Analytics',
        'MAP Patients in Analytics',
        'Fixed Invalid Date Error for Safari Users',
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
              <Typography.Paragraph>
                <ul>
                  {change.medicalTeam.map((description, idx) => (
                    <li key={idx}>
                      <Typography.Text key={idx}>{description}</Typography.Text>
                    </li>
                  ))}
                </ul>
              </Typography.Paragraph>
              <Typography.Title level={5}>Dev Team</Typography.Title>
              <Typography.Paragraph>
                <ul>
                  {change.devTeam.map((description, idx) => (
                    <li key={idx}>
                      <Typography.Text key={idx.toString()}>
                        {description}
                      </Typography.Text>
                    </li>
                  ))}
                </ul>
              </Typography.Paragraph>
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  );
}

export default ChangeLog;
