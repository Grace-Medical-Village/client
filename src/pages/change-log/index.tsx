import React from 'react';
import { Collapse, Typography } from 'antd';
import { Change } from './types';
import './styles.css';

function ChangeLog(): JSX.Element {
  const { Panel } = Collapse;

  const changes: Change[] = [
    {
      dateRange: 'Upcoming',
      medicalTeam: [
        'Finish date range functionality for Analytics',
        'Last Menstrual Period Date Metric',
        'List of MAP Patients in Analytics - let dev team know if there is specific data needed',
        'Blood Pressure Line Graph with Time Range for Patients',
        'Blood Sugar Line Graph with Time Range for Patients',
        'Dev team needs feedback from medical team on allergy display',
        'Touchpad issue',
      ],
      devTeam: [
        'Monitoring & Surveillance',
        'Performance Improvements',
        'Test Suite',
      ],
    },
    {
      dateRange: 'This Week',
      medicalTeam: [
        'Added Amharic to Language List',
        'Blood Pressure Metric Max Value is 500 (was 300 before)',
        'Added space between metric value and unit of measure in metric table',
        'Pain Metric added (range 0-10)',
        'PulseOx Metric added (range 50-100)',
        "Unable to reproduce 'Invalid Date' error for Metrics Table. Confirmed that dates are saving properly in the database. Need additional intel to reproduce",
        'Unique Patients in Analytics',
        'MAP Patients in Analytics',
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
