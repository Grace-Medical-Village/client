import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  Medication,
  PatientMedication,
  PatientMedicationTableRecord,
} from '../../utils/types';
import { monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { MedicationsContext } from '../../context/medications';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientMedicationTableRecord[]>([]);
  const medicationCtx = useContext(MedicationsContext);
  const { state } = useContext(PatientContext);

  useEffect(() => {
    const d: PatientMedicationTableRecord[] = [];

    const getMedication = (medicationId: number): Medication => {
      return medicationCtx?.state?.medications.filter(
        (med) => med.id === medicationId
      )[0];
    };

    if (state?.medications) {
      state.medications.forEach((med: PatientMedication) => {
        const medication = getMedication(med.medicationId);
        console.log(med);
        if (medication) {
          const m: PatientMedicationTableRecord = {
            id: med.medicationId,
            key: med.id,
            date: monthDayYearFullDate(med.createdAt.toString()),
            name: medication.name,
            strength: medication.strength,
            category: medication.categoryName,
          };
          d.push(m);
        }
      });
    }
    set(d);
  }, [state, medicationCtx]);

  const columns = [
    {
      title: 'Medication',
      dataIndex: 'name',
    },
    {
      title: 'Strength',
      dataIndex: 'strength',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
