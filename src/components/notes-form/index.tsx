import React, { useContext } from 'react';
import { Button, Form, Input, message, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { ItemType, NoteItem, NoteBuilder } from '../../utils/types';
import { postItem } from '../../services/api';
import { useId } from '../../hooks';
import { NotesContext } from '../../context/notes';

const { TextArea } = Input;
const { Option } = Select;

export default function NotesForm(): JSX.Element {
  const { state, update } = useContext(NotesContext);
  const [form] = useForm();
  const id = useId();

  const layout = {
    wrapperCol: { span: 24 },
  };

  function onReset() {
    form.resetFields();
  }

  const noteBuilder: NoteBuilder = (note, noteType) => {
    const timestamp = Date.now();
    return {
      id,
      key: `note-${timestamp}`,
      type: ItemType.NOTE,
      staff: 'n/a', // TODO
      note: note.trim(),
      noteType,
      createdAt: timestamp,
      modifiedAt: timestamp,
    };
  };

  function onFinish(data: Store) {
    const { note, noteType } = data;
    if (!note) message.warn('Note is empty');
    const item: NoteItem = noteBuilder(note, noteType);
    postItem(item)
      .then((success: boolean): void => {
        if (success) {
          message.success('Note Saved');
          update([...state, item]);
          onReset();
        } else message.warn('Unable to Save Note');
      })
      .catch((e: Error): void => {
        console.error(e);
        message.warn('Unable to Connect to Server');
      });
  }

  return (
    <Form
      {...layout}
      form={form}
      layout="vertical"
      name="noteForm"
      onFinish={onFinish}
      style={{ marginTop: '1rem' }}
    >
      <Form.Item name="noteType">
        <Select defaultValue="general">
          <Option value="general">General Note</Option>
          <Option value="chronicCondition">Chronic Condition</Option>
        </Select>
      </Form.Item>
      <Form.Item name="note" style={{ margin: 0 }}>
        <TextArea
          autoSize={{ minRows: 2, maxRows: 5 }}
          placeholder="Take a note about the patient"
          showCount={true}
          maxLength={500}
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
