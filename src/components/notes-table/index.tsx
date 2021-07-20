import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Typography,
} from 'antd';
import {
  PatientNoteTableRecord,
  PatientNote,
  PatientData,
} from '../../utils/types';
import {
  monthDayYearFullDate,
  timestampFromDateString,
} from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { deletePatientNote, putPatientNote } from '../../services/api';
import { notificationHandler } from '../../utils/ui';

interface EditableNoteProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  children: React.ReactNode;
}

const EditableNote = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}: EditableNoteProps) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}`,
            },
          ]}
        >
          <Input.TextArea maxLength={500} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function NotesTable(): JSX.Element {
  const [form] = Form.useForm();
  const [data, set] = useState<PatientNoteTableRecord[]>([]);
  const [dateFilters, setDateFilters] = useState<ColumnFilterItem[]>([]);
  const [searchText, setSearchText] = useState<React.Key | string>('');
  const [editingKey, setEditingKey] = useState('');
  const { state, update } = useContext(PatientContext);

  useEffect(() => {
    const d: PatientNoteTableRecord[] = [];
    if (state?.notes) {
      state?.notes?.forEach((note: PatientNote) => {
        const m: PatientNoteTableRecord = {
          id: note.id,
          key: note.id,
          date: monthDayYearFullDate(note.createdAt.toString()),
          timestamp: timestampFromDateString(note.createdAt),
          note: note.note,
        };
        d.push(m);
      });
    }
    set(d);
  }, [state]);

  useEffect(() => {
    const date = new Set<string>();

    data.forEach((d) => {
      date.add(d.date);
    });

    const df = buildColumnFilterItems(date);

    setDateFilters(df);
  }, [data]);

  const isEditing = (record: PatientNoteTableRecord): boolean => {
    return record.key.toString() === editingKey;
  };

  const edit = (
    record: Partial<PatientNoteTableRecord> & { key: React.Key }
  ) => {
    form.setFieldsValue({ note: '', ...record });
    setEditingKey(record.key.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const buildColumnFilterItems = (s: Set<string>): ColumnFilterItem[] => {
    return Array.from(s)
      .sort()
      .map((i) => {
        return {
          text: i,
          value: i,
        };
      }) as ColumnFilterItem[];
  };

  const handleDelete = async (id: number): Promise<void> => {
    const { status } = await deletePatientNote(id);
    const description = 'Note deleted';
    notificationHandler(status, description, 'bottomRight');
    deleteNoteFromContext(id);
  };

  const deleteNoteFromContext = (id: number): void => {
    const notes: PatientNote[] =
      state?.notes?.filter((note) => note.id !== id) ?? [];
    const updatedPatientState: PatientData = {
      ...state,
      notes,
    };
    update(updatedPatientState);
  };

  const handleReset = (clearFilters: (() => void) | undefined): void => {
    if (clearFilters) clearFilters();
    setSearchText('');
  };

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: () => void
  ): void => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as PatientNoteTableRecord;
      const { status } = await putPatientNote(+id, row);
      const description = 'Note updated';
      notificationHandler(status, description, 'bottomRight');
      updateNoteContext(+id, row.note);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const updateNoteContext = (id: number, note: string): void => {
    const notes: PatientNote[] =
      state?.notes?.map((patientNote) => {
        if (patientNote.id === id) {
          const updatedNote: PatientNote = {
            ...patientNote,
            note,
          };
          return updatedNote;
        } else return patientNote;
      }) ?? [];

    const updatedPatientState: PatientData = {
      ...state,
      notes,
    };
    update(updatedPatientState);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      editable: false,
      filters: dateFilters,
      onFilter: (
        value: string | number | boolean,
        record: PatientNoteTableRecord
      ) => {
        return record.date.indexOf(value.toString()) === 0;
      },
      sorter: {
        compare: (a: PatientNoteTableRecord, b: PatientNoteTableRecord) => {
          return a.timestamp - b.timestamp;
        },
      },
    },
    {
      title: 'Note',
      dataIndex: 'note',
      editable: true,
      // eslint-disable-next-line react/display-name
      filterDropdown: ({
        clearFilters,
        confirm,
        selectedKeys,
        setSelectedKeys,
      }: FilterDropdownProps) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              placeholder="Search"
              style={{ marginBottom: 8, display: 'block' }}
              value={selectedKeys[0]}
            />
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => handleSearch(selectedKeys, confirm)}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: <SearchOutlined />,
      onFilter: (
        value: string | boolean | number,
        record: PatientNoteTableRecord
      ) =>
        record.note
          ? record.note.toLowerCase().includes(value.toString().toLowerCase())
          : false,
      // eslint-disable-next-line react/display-name
      render: (text: string) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText.toString()]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      // eslint-disable-next-line react/display-name
      render: (_: unknown, record: PatientNoteTableRecord): JSX.Element => {
        return isEditing(record) ? (
          <>
            <span>
              <Button
                onClick={() => save(record.key)}
                style={{ marginRight: 8 }}
                type="link"
              >
                Save
              </Button>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Button type="link">Cancel</Button>
              </Popconfirm>
            </span>
          </>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: PatientNoteTableRecord) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        components={{
          body: {
            cell: EditableNote,
          },
        }}
        dataSource={data}
      />
    </Form>
  );
}
