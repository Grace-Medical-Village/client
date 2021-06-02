import React, { useContext } from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { PatientContext } from '../../context/patient';
import { postPatientNote, requestSuccess } from '../../services/api';
import { messageUserResult } from '../../utils/ui';
import { PatientNote } from '../../utils/types';

export default function NotesForm(): JSX.Element {
  const [form] = useForm();
  const { state, update } = useContext(PatientContext);

  const layout = {
    wrapperCol: { span: 24 },
  };

  function onReset() {
    form.resetFields();
  }

  async function onFinish(data: Store) {
    const formattedNote = data?.note?.trim() ?? null;
    if (!formattedNote || formattedNote.length === 0) {
      message.warn('Note is empty');
    } else if (!state?.patient?.id) message.warn('No patient selected');
    else {
      const {
        id = null,
        status,
        createdAt = null,
        modifiedAt = null,
      } = await postPatientNote(state.patient.id, formattedNote);
      const success = requestSuccess(status);
      handleSaveNoteResult(success, id, formattedNote, createdAt, modifiedAt);
    }
  }

  function handleSaveNoteResult(
    success: boolean,
    id: number | null,
    note: string,
    createdAt: string | null,
    modifiedAt: string | null
  ) {
    const successMessage = 'Note saved';
    const failureMessage = 'Failed to save note';
    messageUserResult(success, successMessage, failureMessage);
    if (id && createdAt && modifiedAt)
      addNoteToContext(id, note, createdAt, modifiedAt);
  }

  function addNoteToContext(
    id: number,
    note: string,
    createdAt: string,
    modifiedAt: string
  ) {
    if (state?.patient?.id) {
      const pn: PatientNote = {
        id,
        note,
        patientId: state.patient.id,
        createdAt,
        modifiedAt,
      };

      const existingState = state.notes ?? [];
      const newState: PatientNote[] = [pn, ...existingState];
      update({
        ...state,
        notes: newState,
      });
      onReset();
    }
  }

  return (
    <Form
      {...layout}
      form={form}
      layout="vertical"
      name="noteForm"
      onFinish={onFinish}
      style={{ marginTop: '0.5rem' }}
    >
      <Form.Item name="note" style={{ margin: 0 }}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 5 }}
          placeholder="Take a note about the patient"
          showCount={true}
          maxLength={500}
        />
      </Form.Item>
      <Form.Item>
        <Row style={{ paddingTop: '1rem' }}>
          <Button
            htmlType="submit"
            style={{ marginRight: '0.5rem' }}
            type="primary"
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}
