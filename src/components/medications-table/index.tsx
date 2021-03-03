import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  Medication,
  MedicationState,
  PatientMedication,
  PatientMedicationTableRecord,
} from '../../utils/types';
import { monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { MedicationsContext } from '../../context/medications';
import { getMedicationCategories, getMedications } from '../../services/api';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientMedicationTableRecord[]>([]);
  const medicationCtx = useContext(MedicationsContext);
  const patientCtx = useContext(PatientContext);

  useEffect(() => {
    const buildMedicationState = async () => {
      if (
        medicationCtx.state.medications.length === 0 ||
        medicationCtx.state.categories.length === 0
      ) {
        const categories = await getMedicationCategories();
        const medications = await getMedications();
        const data: MedicationState = {
          categories,
          medications,
        };
        medicationCtx.update(data);
      }
    };
    buildMedicationState();
  }, [medicationCtx]);

  useEffect(() => {
    const d: PatientMedicationTableRecord[] = [];

    const getMedication = (id: number): Medication =>
      medicationCtx?.state?.medications.filter((med) => med.id === id)[0];

    if (patientCtx?.state?.medications) {
      patientCtx?.state?.medications.forEach((med: PatientMedication) => {
        const medication = getMedication(med.medication_id);
        if (medication) {
          const m: PatientMedicationTableRecord = {
            id: med.medication_id,
            key: med.id,
            date: monthDayYearFullDate(med.created_at.toString()),
            name: medication.name,
            strength: medication.strength,
            category: medication.category_name,
          };
          d.push(m);
        }
      });
    }
    set(d);
  }, [patientCtx, medicationCtx]);

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
