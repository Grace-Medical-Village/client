import React, { useContext, useState } from 'react';
import { Collapse, Divider, Radio, Typography } from 'antd';

import NoPatient from '../../components/no-patient';
import { PatientContext } from '../../context/patient';
import './styles.css';
import { ItemType } from '../../utils/types';
import MedicationsTable from '../../components/medications-table';
import MetricsTable from '../../components/metrics-table';
import NotesForm from '../../components/notes-form';
import NotesTable from '../../components/notes-table';
import PatientAbout from '../../components/patient-about';
import PatientConditions from '../../components/patient-conditions';
import { RadioChangeEvent } from 'antd/lib/radio';
import { capitalize } from 'lodash';
import MetricsForm from '../../components/metrics-form';
import MedicationsForm from '../../components/medications-form';

const { Title } = Typography;

export default function Dashboard(): JSX.Element {
  const { state } = useContext(PatientContext);
  const [formSelection, setFormSelection] = useState<ItemType>(ItemType.METRIC);
  const [tableSelection, setTableSelection] = useState<ItemType>(
    ItemType.METRIC
  );
  const [dataEntryComponent, setDataEntryComponent] = useState(<MetricsForm />);
  const [dataTableComponent, setDataTableComponent] = useState(
    <MetricsTable />
  );

  const entryOptions = [
    {
      label: capitalize(ItemType.MEDICATION),
      value: ItemType.MEDICATION,
    },
    {
      label: capitalize(ItemType.METRIC),
      value: ItemType.METRIC,
    },
    {
      label: capitalize(ItemType.NOTE),
      value: ItemType.NOTE,
    },
  ];

  function onDataFormChange(e: RadioChangeEvent) {
    const v = e.target.value as ItemType;
    setFormSelection(v);
    switch (v) {
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

  function onDataTableChange(e: RadioChangeEvent) {
    const v = e.target.value as ItemType;
    setTableSelection(v);
    switch (v) {
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

  const tableOptions = [
    {
      label: 'Medications',
      value: ItemType.MEDICATION,
      disabled: !!(state.medications && state.medications.length === 0),
    },
    {
      label: 'Metrics',
      value: ItemType.METRIC,
      disabled: !!(state.metrics && state.metrics.length === 0),
    },
    {
      label: 'Notes',
      value: ItemType.NOTE,
      disabled: !!(state.notes && state.notes.length === 0),
    },
  ];

  return (
    <>
      <div style={{ padding: '2rem' }}>
        {state?.patient?.id ? (
          <>
            <Title level={3}>
              {state?.patient?.firstName} {state?.patient?.lastName}
            </Title>
            <Collapse defaultActiveKey={['1', '2', '3']}>
              <Collapse.Panel header="About" key="1">
                <PatientAbout />
              </Collapse.Panel>
              <Collapse.Panel header="Conditions" key="2">
                <PatientConditions />
              </Collapse.Panel>
            </Collapse>
            <Divider />
            <Title level={4}>Data Entry</Title>
            <Radio.Group
              buttonStyle="solid"
              options={entryOptions}
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
              options={tableOptions}
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
