import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { NotesContext } from '../../context/notes';
import { NoteItem, NotesTableRecord } from '../../utils/types';
import { monthDayYearFullDate } from '../../utils/dates';
import { noteTypes } from '../../utils/notes';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<NotesTableRecord[]>([]);
  const { state } = useContext(NotesContext);

  useEffect(() => {
    console.log(state);
    const d: NotesTableRecord[] = [];
    state.forEach((item: NoteItem) => {
      console.log(item);
      const m: NotesTableRecord = {
        key: item.createdAt.toString(),
        date: monthDayYearFullDate(item.createdAt.toString()),
        note: item.note,
        noteType: noteTypes[item.noteType] ?? 'General', // todo
        staff: item.staff,
      };
      d.push(m);
    });
    set(d);
  }, [state]);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'noteType',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Staff',
      dataIndex: 'staff',
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
