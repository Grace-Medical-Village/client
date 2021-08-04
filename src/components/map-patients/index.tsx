import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MapPatientTableRecord } from '../../utils/types';
import { getMapPatients } from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { getAge, monthDayYearFullDate } from '../../utils/dates';

export default function MapPatients(): JSX.Element {
  const [data, set] = useState<MapPatientTableRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buildMapPatientTable = async () => {
      setLoading(true);
      const mapPatients = await getMapPatients();
      if (mapPatients?.length > 0) {
        const tableRecords = mapPatients
          .sort((a, b) =>
            a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
          )
          .map((patient, idx) => {
            return {
              key: idx,
              ...patient,
              age: patient.birthdate ? getAge(patient.birthdate) : 'N/A',
              patientSince: monthDayYearFullDate(patient.createdAt),
            };
          });
        set(tableRecords);
      } else {
        notificationHandler(404, 'No Patients Found', 'bottomRight');
      }
    };

    buildMapPatientTable()
      .then((r) => r)
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Patient Since',
      dataIndex: 'patientSince',
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      loading={loading}
      style={{ width: '80vw' }}
    />
  );
}
