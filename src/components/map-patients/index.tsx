import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MapPatientTableRecord } from '../../utils/types';
import { getMapPatients } from '../../services/api';
import { notificationHandler } from '../../utils/ui';

export default function MapPatients(): JSX.Element {
  const [data, set] = useState<MapPatientTableRecord[]>([]);

  useEffect(() => {
    const buildMapPatientTable = async () => {
      const mapPatients = await getMapPatients();

      if (mapPatients?.length > 0) {
        const tableRecords = mapPatients
          .sort((a, b) =>
            a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
          )
          .map((patient, idx) => {
            return {
              ...patient,
              key: idx,
            };
          });
        set(tableRecords);
      } else {
        notificationHandler(404, 'No Patients Found', 'bottomRight');
      }
    };

    buildMapPatientTable()
      .then((r) => r)
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Birthdate',
      dataIndex: 'birthdate',
    },
    {
      title: 'Patient Since',
      dataIndex: 'createdAt',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
