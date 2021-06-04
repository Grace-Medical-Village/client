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
import { ColumnFilterItem } from 'antd/lib/table/interface';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientMedicationTableRecord[]>([]);
  const [nameFilters, setNameFilters] = useState<ColumnFilterItem[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<ColumnFilterItem[]>(
    []
  );
  const [dateFilters, setDateFilters] = useState<ColumnFilterItem[]>([]);
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

  useEffect(() => {
    buildFilters();
  }, [data]);

  const buildFilters = () => {
    const name = new Set<string>();
    const category = new Set<string>();
    const date = new Set<string>();

    data.forEach((d) => {
      name.add(d.name);
      category.add(d.category);
      date.add(d.date);
    });

    const nf = buildColumnFilterItems(name);
    const cf = buildColumnFilterItems(category);
    const df = buildColumnFilterItems(date);

    setNameFilters(nf);
    setCategoryFilters(cf);
    setDateFilters(df);
  };

  const buildColumnFilterItems = (s: Set<string>): ColumnFilterItem[] => {
    return Array.from(s)
      .sort()
      .map((i) => {
        return {
          text: i,
          value: i,
        };
      }) as ColumnFilterItem[];
  };

  const columns = [
    {
      title: 'Medication',
      dataIndex: 'name',
      filters: nameFilters,
      onFilter: (value: any, record: PatientMedicationTableRecord) => {
        return record.name.indexOf(value) === 0;
      },
    },
    {
      title: 'Strength',
      dataIndex: 'strength',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: categoryFilters,
      onFilter: (value: any, record: PatientMedicationTableRecord) => {
        return record.category.indexOf(value) === 0;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      filters: dateFilters,
      onFilter: (value: any, record: PatientMedicationTableRecord) => {
        return record.date.indexOf(value) === 0;
      },
      // sorter: (a: unknown, b: unknown) => {
      // console.log(a);
      // if (typeof b === 'number') console.log(new Date(b).getTime());
      // return a;
      // },
      // sortDirections: ['descend'],
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
