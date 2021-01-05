import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Descriptions } from 'antd';
import { NotesContext } from '../../context/notes';
import { getItems } from '../../services/api';
import { useId } from '../../hooks';
import { ItemType } from '../../utils/types';
import { getYearMonthDay } from '../../utils/dates';

const { Panel } = Collapse;
const { Item } = Descriptions;

export default function PatientNotes(): JSX.Element {
  const id = useId();
  const [sortedNotes, sort] = useState({});
  const { state, update } = useContext(NotesContext);

  // create mock data structure and map through to build the collapse
  useEffect(() => {
    const organizeNotes = (): void => {
      const organizedNotesByDate = {};
      state.forEach((v) => {
        const date = getYearMonthDay(v.createdAt);
        console.log(v);
      });
    };
    const getNotes = () => {
      getItems({ id }).then((res: any) => {
        // todo types
        const notes = res.filter((item: any) => item.type === ItemType.NOTE);
        update(notes);
        organizeNotes();
      });
    };

    if (state.length === 0) getNotes();
  }, [id, state, update]);

  return (
    <Collapse>
      {state.length > 0
        ? state.map((item) => (
            <Panel
              header={`${
                item.createdAt
                  ? new Date(+item.createdAt).toLocaleDateString()
                  : 'Date Unavailable'
              }`}
              key={`${item.createdAt}`}
            >
              <Descriptions layout="vertical" bordered>
                <Item label="Staff">{item.staff}</Item>
                <Item label="Notes">{item.note}</Item>
              </Descriptions>
            </Panel>
          ))
        : null}
    </Collapse>
  );
}
