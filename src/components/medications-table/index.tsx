import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import {
  MedicationState,
  PatientData,
  PatientMedication,
  PatientMedicationTableRecord,
} from '../../utils/types';
import {
  monthDayYearFullDate,
  timestampFromDateString,
} from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { MedicationsContext } from '../../context/medications';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {
  deletePatientMedication,
  getMedicationCategories,
  getMedications,
} from '../../services/api';
import { notificationHandler } from '../../utils/ui';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientMedicationTableRecord[]>([]);
  const [nameFilters, setNameFilters] = useState<ColumnFilterItem[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<ColumnFilterItem[]>(
    []
  );
  const [searchText, setSearchText] = useState<React.Key | string>('');

  const [dateFilters, setDateFilters] = useState<ColumnFilterItem[]>([]);

  const medicationCtx = useContext(MedicationsContext);
  const { state, update } = useContext(PatientContext);

  useEffect(() => {
    const setMedications = async (): Promise<void> => {
      const categories = await getMedicationCategories();
      const medications = await getMedications();
      const data: MedicationState = {
        categories,
        medications,
      };
      medicationCtx.update(data);
    };
    if (medicationCtx?.state?.medications.length === 0) {
      setMedications()
        .then((r) => r)
        .catch((err) => console.error(err));
    }
  }, [medicationCtx]);

  useEffect(() => {
    const d: PatientMedicationTableRecord[] = [];
    if (state.medications && state.medications.length > 0) {
      state.medications.forEach((med: PatientMedication) => {
        const medication = medicationCtx?.state?.medications.filter(
          (m) => m.id === med.medicationId
        )[0];
        if (medication) {
          const m: PatientMedicationTableRecord = {
            id: med.medicationId,
            key: med.id,
            date: monthDayYearFullDate(med.createdAt.toString()),
            timestamp: timestampFromDateString(med.createdAt),
            name: medication.name,
            strength: medication.strength,
            category: medication.categoryName,
          };
          d.push(m);
        }
      });
    }
    set(d);
  }, [medicationCtx, state]);

  useEffect(() => {
    const name = new Set<string>();
    const category = new Set<string>();
    const date = new Set<string>();

    data.forEach((d) => {
      name.add(d.name);
      category.add(d.category);
      date.add(d.date);
    });

    const nf = buildColumnFilterItems(name);
    const cf = buildColumnFilterItems(category);
    const df = buildColumnFilterItems(date);

    setNameFilters(nf);
    setCategoryFilters(cf);
    setDateFilters(df);
  }, [data]);

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
    const { status } = await deletePatientMedication(id);
    const description = 'Medication deleted';
    notificationHandler(status, description, 'bottomRight');
    deleteMedicationFromContext(id);
  };

  const deleteMedicationFromContext = (id: number): void => {
    const medications: PatientMedication[] =
      state?.medications?.filter((med) => med.id !== id) ?? [];

    const updatedPatientState: PatientData = {
      ...state,
      medications,
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

  const columns = [
    {
      title: 'Medication',
      dataIndex: 'name',
      filters: nameFilters,
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
        record: PatientMedicationTableRecord
      ) =>
        record.name
          ? record.name.toLowerCase().includes(value.toString().toLowerCase())
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
      sorter: {
        compare: (
          a: PatientMedicationTableRecord,
          b: PatientMedicationTableRecord
        ) => {
          return a.name.toLowerCase() < b.name.toLowerCase() ? 0 : -1;
        },
        multiple: 3,
      },
    },
    {
      title: 'Strength',
      dataIndex: 'strength',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: categoryFilters,
      onFilter: (
        value: string | boolean | number,
        record: PatientMedicationTableRecord
      ) => {
        return record.category.indexOf(value.toString()) === 0;
      },
      sorter: {
        compare: (
          a: PatientMedicationTableRecord,
          b: PatientMedicationTableRecord
        ) => {
          return a.category.toLowerCase() < b.category.toLowerCase() ? 0 : -1;
        },
        multiple: 2,
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      filters: dateFilters,
      onFilter: (
        value: string | boolean | number,
        record: PatientMedicationTableRecord
      ) => {
        return record.date.indexOf(value.toString()) === 0;
      },
      sorter: {
        compare: (
          a: PatientMedicationTableRecord,
          b: PatientMedicationTableRecord
        ) => {
          return a.timestamp - b.timestamp;
        },
        multiple: 1,
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      // eslint-disable-next-line react/display-name
      render: (
        _: unknown,
        record: PatientMedicationTableRecord
      ): JSX.Element => {
        return (
          <Popconfirm
            title="Delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
