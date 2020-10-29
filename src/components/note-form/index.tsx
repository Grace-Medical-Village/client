import React from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { Auth } from 'aws-amplify';
import { PatientNote } from '../../services/types';
import { postItem } from '../../services/api';

const { TextArea } = Input;

export default function NoteForm(): JSX.Element {
  const [form] = useForm();

  const layout = {
    wrapperCol: { span: 12 },
  };

  function onReset() {
    form.resetFields();
  }

  function onFinish(data: Store) {
    const { patientNote } = data;
    if (!patientNote) {
      message.warn('Note is empty');
    }
    const item: PatientNote = {
      id: 'todo',
      key: 'todo',
      type: 'note',
      staff: 'Dr. Waldman',
      note: patientNote,
      createdAt: Date.now(),
    }
    postItem(item)
    // post Item to backend
    // on success update context
    // on failure notify handler error
  }

  return (
    <Form {...layout} form={form} name="noteForm" onFinish={onFinish}>
      <Form.Item name="patientNote">
        <TextArea
          autoSize={{ minRows: 2, maxRows: 5 }}
          placeholder="Take a note about the patient"
          showCount={true}
          maxLength={360}
        />
      </Form.Item>
      <Form.Item>
        <Row>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '0.5rem' }}
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
