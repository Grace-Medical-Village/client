import React, { useContext, useState } from 'react';
import { Divider, Radio, Typography } from 'antd';

import MedicationsForm from '../../components/medications-form';
import MedicationsTable from '../../components/medications-table';
import MetricsForm from '../../components/metrics-form';
import MetricsTable from '../../components/metrics-table';
import NoPatient from '../../components/no-patient';
import NotesForm from '../../components/notes-form';
import NotesTable from '../../components/notes-table';
import PatientOverview from '../../components/patient-overview';
import { BackgroundContext } from '../../context/background';
import './styles.css';
import { ItemType } from '../../utils/types';

const { Title } = Typography;

export default function Dashboard(): JSX.Element {
  const { state } = useContext(BackgroundContext);
  const [formSelection, setFormSelection] = useState(ItemType.NOTE);
  const [tableSelection, setTableSelection] = useState(ItemType.NOTE);
  const [dataEntryComponent, setDataEntryComponent] = useState(<NotesForm />);
  const [dataTableComponent, setDataTableComponent] = useState(<NotesTable />);

  const { firstName, id, lastName } = state;

  const options = [
    { label: 'Note', value: ItemType.NOTE },
    { label: 'Metrics', value: ItemType.METRIC },
    { label: 'Medication', value: ItemType.MEDICATION },
  ];

  // todo type
  function onDataFormChange(e: any) {
    const { value } = e.target ?? ItemType.NOTE;
    setFormSelection(value);
    switch (value) {
      case ItemType.MEDICATION:
        setDataEntryComponent(<MedicationsForm />);
        break;
      case ItemType.METRIC:
        setDataEntryComponent(<MetricsForm />);
        break;
      case ItemType.NOTE:
        setDataEntryComponent(<NotesForm />);
        break;
    }
  }

  function onDataTableChange(e: any) {
    const { value } = e.target ?? ItemType.NOTE;
    setTableSelection(value);
    switch (value) {
      case ItemType.MEDICATION:
        setDataTableComponent(<MedicationsTable />);
        break;
      case ItemType.METRIC:
        setDataTableComponent(<MetricsTable />);
        break;
      case ItemType.NOTE:
        setDataTableComponent(<NotesTable />);
        break;
    }
  }

  return (
    <>
      <div style={{ padding: '2rem' }}>
        {id ? (
          <>
            <Title level={3}>
              {firstName} {lastName}
            </Title>
            <PatientOverview />
            <Divider />
            <Title level={4}>Data Entry</Title>
            <Radio.Group
              buttonStyle="solid"
              options={options}
              onChange={onDataFormChange}
              optionType="button"
              style={{ marginBottom: '1rem' }}
              value={formSelection}
            />
            {dataEntryComponent}
            <Divider />
            <Title level={4}>Data Analysis</Title>
            <Radio.Group
              buttonStyle="solid"
              options={options}
              onChange={onDataTableChange}
              optionType="button"
              style={{ marginBottom: '1rem' }}
              value={tableSelection}
            />
            {dataTableComponent}
          </>
        ) : (
          <NoPatient />
        )}
      </div>
    </>
  );
}
