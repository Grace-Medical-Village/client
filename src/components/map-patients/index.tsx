import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MapPatientTableRecord } from '../../utils/types';
import { getMapPatients, getMapPatientsByDate } from '../../services/api';
import { getAge, monthDayYearFullDate } from '../../utils/dates';

type Props = {
  endDate: string;
  startDate: string;
};
export default function MapPatients({
  endDate,
  startDate,
}: Props): JSX.Element {
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
        set([]);
      }
    };

    buildMapPatientTable()
      .then((r) => r)
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        set([]);
      }
    };

    const buildMapPatientTableByDate = async () => {
      setLoading(true);
      const mapPatients = await getMapPatientsByDate(startDate, endDate);
      if (mapPatients?.length > 0) {
        const tableRecords = mapPatients
          .sort((a, b) =>
            a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
          )
          .map((patient, idx) => {
            console.log(patient);
            return {
              key: idx,
              ...patient,
              age: patient.birthdate ? getAge(patient.birthdate) : 'N/A',
              patientSince: monthDayYearFullDate(patient.createdAt),
            };
          });
        set(tableRecords);
      } else {
        set([]);
      }
    };

    if (endDate && startDate) {
      buildMapPatientTableByDate()
        .then((r) => r)
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
        });
    } else {
      buildMapPatientTable()
        .then((r) => r)
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [startDate, endDate]);

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
