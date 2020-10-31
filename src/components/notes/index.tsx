import React from 'react';
import NoteForm from '../note-form';
import StaffNotes from '../staff-notes';

export default function Notes(): JSX.Element {
  return (
    <>
      <StaffNotes />
      <NoteForm />
    </>
  );
}
