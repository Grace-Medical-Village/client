import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { PatientNoteTableRecord, PatientNote } from '../../utils/types';
import { monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientNoteTableRecord[]>([]);
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

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
