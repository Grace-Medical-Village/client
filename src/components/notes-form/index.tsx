import React, { useContext } from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { PatientContext } from '../../context/patient';
import {
  getPatientNotes,
  postPatientNote,
  requestSuccess,
} from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { PatientData } from '../../utils/types';

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
    const { note } = data;
    if (!note) message.warn('Note is empty');
    if (!state?.patient?.id) message.warn('No patient selected');
    else {
      const { status } = await postPatientNote(state.patient.id, note);
      const description = 'Note saved';
      notificationHandler(status, description, 'bottomRight');
      if (requestSuccess(status)) fetchNotes(state.patient.id);
    }
  }

  async function fetchNotes(id: number) {
    const notes = await getPatientNotes(id);
    const data: PatientData = {
      ...state,
      notes,
    };
    update(data);
    onReset();
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
