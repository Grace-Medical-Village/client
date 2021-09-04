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
        'Blood Pressure Line Graph with Time Range for Patients',
        'Blood Sugar Line Graph with Time Range for Patients',
        'Touchpad/scrollbar issue: note this will not work in Firefox or Internet Explorer',
        'Multi-metric upload',
        'Add metrics retroactively',
        'Format metrics entered',
        'Merge patient records',
        'Fasting vs. non-fasting metric entry',
      ],
      devTeam: [
        'Date validation',
        'Monitoring & Surveillance',
        'Performance Improvements',
        'Test Suite',
      ],
    },
    {
      dateRange: 'August 21 - September 3, 2021',
      medicalTeam: [
        'Added new conditions: Abdominal Pain, Anemia, COPD, Hyperthyroidism, Prediabetes, Skin Condition, Obesity',
        'Made conditions sorted A-Z',
        'Changed from "None" to "NKDA" for allergies',
        'Changed Max Value for Blood Sugar to 400',
        'Reformat date entry as MM/DD/YYYY',
        'Made Save button stand out more for patient allergies',
        'Added ability to archive patients',
        'Save alternative languages',
      ],
      devTeam: [''],
    },
    {
      dateRange: 'August 1 - August 20, 2021',
      medicalTeam: [
        'Fixed bug for saving medications with strength value',
        'Swapped calendar with standard input for birthdays',
        "Make 'Strength' column empty if it's not needed",
      ],
      devTeam: [
        'Removed map from patient table',
        'Set medication strength to null where 0',
      ],
    },
    {
      dateRange: 'July 25 - August 1 2021',
      medicalTeam: [
        'Allergy tracking',
        'Date range for patient count',
        'List of MAP Patients in Analytics',
        'Last Menstrual Period Date Metric',
        'Added Loading Indicators to Tables',
        'Minor style improvements',
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
