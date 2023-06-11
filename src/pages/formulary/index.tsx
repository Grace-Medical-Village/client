import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import {
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { ColumnFilterItem, ColumnsType } from 'antd/lib/table/interface';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { MedicationsContext } from '../../context/medications';
import {
  deleteMedication,
  getMedicationCategories,
  getMedications,
  postMedication,
  putMedication,
  requestSuccess,
} from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import {
  Medication,
  MedicationState,
  MedicationTableRecord,
} from '../../utils/types';
import './styles.css';
import { capitalize } from 'lodash';
import { AuthContext } from '../../context/auth';
import { useHistory } from 'react-router-dom';

function Formulary(): JSX.Element {
  const { state, update } = useContext(MedicationsContext);
  const authContext = useContext(AuthContext);
  const { isAdmin } = authContext.state;
  const history = useHistory();
  const [data, set] = useState<MedicationTableRecord[]>([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchText, setSearchText] = useState<React.Key | string>('');
  const [archivedFilters, setArchivedFilters] = useState<ColumnFilterItem[]>(
    []
  );
  const [categoryFilters, setCategoryFilters] = useState<ColumnFilterItem[]>(
    []
  );

  useEffect(() => {
    validateAdmin();
  }, [isAdmin]);

  const validateAdmin = () => {
    if (!isAdmin) {
      history.push('/');
    }
  };

  useEffect(() => {
    const buildMedicationState = async (): Promise<MedicationState | void> => {
      setLoading(true);
      if (state.medications.length === 0 || state.categories.length === 0) {
        const categories = await getMedicationCategories();
        const medications = await getMedications();
        return {
          categories,
          medications,
        };
      }
    };
    buildMedicationState()
      .then((result) => {
        if (
          result &&
          result.categories.length > 0 &&
          result.medications.length > 0
        ) {
          update(result);
        } else {
          console.error(
            'Error: unable to fetch medications and/or medication categories'
          );
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [state, update]);

  useEffect(() => {
    const mtr: MedicationTableRecord[] = state.medications.map((med, idx) => {
      return {
        ...med,
        archived: capitalize(med.archived.toString()),
        key: idx,
      };
    });
    set(mtr);
  }, [state]);

  useEffect(() => {
    const a = new Set<string>();
    const category = new Set<string>();

    data.forEach((d) => {
      a.add(d.archived.toString());
      category.add(d.categoryName);
    });

    const af = buildColumnFilterItems(a);
    const cf = buildColumnFilterItems(category);

    setArchivedFilters(af);
    setCategoryFilters(cf);
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

  const onReset = () => form.resetFields();

  async function onFinish(data: Store) {
    const { name, strength, categoryId } = data;
    const { status } = await postMedication(name, strength, categoryId);
    const description = 'Medication saved';
    notificationHandler(status, description, 'bottomRight');
    if (requestSuccess(status)) {
      onReset();
      const { categories } = state;
      const medications = await getMedications();
      const data: MedicationState = {
        categories,
        medications,
      };
      update(data);
    }
  }

  const onDeleteMedication = async (id: number): Promise<void> => {
    const { status } = await deleteMedication(id);
    const description = 'Medication deleted';
    notificationHandler(status, description, 'topRight');
    deleteMedicationFromContext(id);
  };

  const onPutMedication = async (med: Medication): Promise<void> => {
    const { status } = await putMedication(med);
    const description = 'Medication updated';
    notificationHandler(status, description, 'topRight');
    updatedMedicationInContext(med);
  };

  const deleteMedicationFromContext = (id: number): void => {
    const medications: Medication[] = state.medications.filter(
      (medication) => medication.id !== id
    );
    const newMedicationState: MedicationState = {
      medications,
      categories: state.categories,
    };
    update(newMedicationState);
  };

  const updatedMedicationInContext = (med: Medication): void => {
    const medications: Medication[] = state.medications.map((medication) => {
      if (medication.id !== med.id) return medication;
      else return med;
    });

    const newMedicationState: MedicationState = {
      medications,
      categories: state.categories,
    };
    update(newMedicationState);
  };

  function showArchiveConfirm(
    med: MedicationTableRecord,
    archive: boolean,
    archiveAction: string
  ): void {
    const archivedMed: Medication = {
      id: med.id,
      name: med.name,
      strength: med.strength,
      categoryId: med.categoryId,
      categoryName: med.categoryName,
      archived: !(med.archived.toString().toLowerCase() === 'true'),
      createdAt: med.createdAt,
      modifiedAt: med.modifiedAt,
    };

    Modal.confirm({
      title: `Are you sure you want to ${archiveAction.toLowerCase()} this medication?
        You will no longer be able to offer it to patients.`,
      icon: <ExclamationCircleOutlined />,
      content: `${med.name} ${med.strength}`,
      okText: archiveAction,
      okType: 'ghost',
      cancelText: 'Cancel',
      onOk() {
        onPutMedication(archivedMed)
          .then((r) => r)
          .catch((err) => console.error(err));
      },
    });
  }

  function showDeleteConfirm(med: MedicationTableRecord) {
    Modal.confirm({
      title: `Are you sure you want to delete this medication? 
        It will remove all records for patients that have this medication.`,
      icon: <ExclamationCircleOutlined />,
      content: `${med.name} ${med.strength}`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDeleteMedication(med.id)
          .then((r) => r)
          .catch((err) => console.error(err));
      },
    });
  }

  const columns: ColumnsType<MedicationTableRecord> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 400,
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
      onFilter: (value, record) =>
        record.name
          ? record.name
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
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
      title: 'Strength',
      dataIndex: 'strength',
      key: 'strength',
      width: 250,
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      filters: categoryFilters,
      onFilter: (
        value: string | number | boolean,
        record: MedicationTableRecord
      ) => record.categoryName.indexOf(value.toString()) === 0,
      sorter: {
        compare: (a: MedicationTableRecord, b: MedicationTableRecord) => {
          return a.categoryName.toLowerCase() > b.categoryName.toLowerCase()
            ? 0
            : -1;
        },
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Archived',
      dataIndex: 'archived',
      key: 'archived',
      width: 50,
      filters: archivedFilters,
      onFilter: (
        value: string | number | boolean,
        record: MedicationTableRecord
      ) =>
        record.archived.toString().toLowerCase() ===
        value.toString().toLowerCase(),
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'action',
      width: 250,
      // eslint-disable-next-line react/display-name
      render: (record: MedicationTableRecord): JSX.Element => {
        const currentlyArchived =
          record.archived.toString().toLowerCase() === 'false';
        const archiveAction = currentlyArchived ? 'Archive' : 'Activate';
        return (
          <>
            <Button disabled type="link">
              Edit
            </Button>
            <Button
              onClick={() =>
                showArchiveConfirm(record, currentlyArchived, archiveAction)
              }
              type="link"
            >
              {archiveAction}
            </Button>
            <Button onClick={() => showDeleteConfirm(record)} type="link">
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 50 }}
          rowClassName="editable-row"
        />
      </Form>
      <Button
        block
        onClick={() => setShowDrawer(true)}
        style={{
          marginLeft: 8,
          marginBottom: 16,
        }}
        type="primary"
      >
        <PlusOutlined />
        Add Medication
      </Button>
      <Drawer
        title="Add a Medication"
        width={720}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter a name' }]}
              >
                <Input placeholder="Enter medication name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="strength"
                label="Strength"
                rules={[{ required: false }]}
              >
                <Input placeholder="Enter medication strength" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[
                  { required: true, message: 'Please select a category' },
                ]}
              >
                <Select placeholder="Select a category">
                  {state.categories.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              onClick={() => setShowDrawer(false)}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Formulary;
