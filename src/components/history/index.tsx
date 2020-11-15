import React, { useContext, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import Conditions from '../conditions';
import PatientNotes from '../patient-notes';
import { NotesContext } from '../../context/notes';

const { Panel } = Collapse;

export default function History(): JSX.Element {
  const { state } = useContext(NotesContext);
  const [notesEnabled, setNotesEnabled] = useState(true);

  useEffect(() => {
    if (state.length > 0) setNotesEnabled(false);
    else setNotesEnabled(true);
  }, [state]);

  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Conditions" key="1">
          <Conditions />
        </Panel>
        <Panel header="Notes" key="2" disabled={notesEnabled}>
          <PatientNotes />
        </Panel>
      </Collapse>
    </>
  );
}
