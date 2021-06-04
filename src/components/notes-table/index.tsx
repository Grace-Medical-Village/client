import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { PatientNoteTableRecord, PatientNote } from '../../utils/types';
import { monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { ColumnFilterItem } from 'antd/lib/table/interface';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientNoteTableRecord[]>([]);
  const [dateFilters, setDateFilters] = useState<ColumnFilterItem[]>([]);
  const { state } = useContext(PatientContext);

  useEffect(() => {
    const d: PatientNoteTableRecord[] = [];
    if (state?.notes) {
      state?.notes?.forEach((note: PatientNote) => {
        const m: PatientNoteTableRecord = {
          id: note.id,
          key: note.id,
          date: monthDayYearFullDate(note.createdAt.toString()),
          note: note.note,
        };
        d.push(m);
      });
    }
    set(d);
  }, [state]);

  useEffect(() => {
    buildFilters();
  }, [data]);

  const buildFilters = () => {
    const date = new Set<string>();

    data.forEach((d) => {
      date.add(d.date);
    });

    const df = buildColumnFilterItems(date);

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
      title: 'Date',
      dataIndex: 'date',
      filters: dateFilters,
      onFilter: (value: any, record: PatientNoteTableRecord) => {
        return record.date.indexOf(value) === 0;
      },
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
