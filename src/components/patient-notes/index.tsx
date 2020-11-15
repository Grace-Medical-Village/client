import React, { useContext, useEffect } from 'react';
import { Collapse, Descriptions } from 'antd';
import { NotesContext } from '../../context/notes';
import { getItems } from '../../services/api';
import { useId } from '../../hooks';
import { ItemType } from '../../utils/types';

const { Panel } = Collapse;
const { Item } = Descriptions;

export default function PatientNotes(): JSX.Element {
  const id = useId();
  const { state, update } = useContext(NotesContext);

  useEffect(() => {
    const getNotes = () => {
      getItems({ id }).then((res: any) => {
        // todo types
        const notes = res.filter((item: any) => item.type === ItemType.NOTE);
        update(notes);
      });
    };
    if (state.length === 0) getNotes();
    console.log(state);
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
