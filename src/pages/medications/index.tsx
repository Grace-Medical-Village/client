/* eslint-disable react/prop-types */
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
  Table,
} from 'antd';
import {
  ExclamationCircleOutlined,
  PlusOutlined,
  // SearchOutlined,
} from '@ant-design/icons';
import { MedicationsContext } from '../../context/medications';
import {
  deleteMedication,
  getMedicationCategories,
  getMedications,
  postMedication,
  requestSuccess,
} from '../../services/api';
import {
  CategoryFilter,
  MedicationTableRecord,
  MedicationState,
} from '../../utils/types';
import { Store } from 'antd/lib/form/interface';
import { notificationHandler } from '../../utils/ui';
// import { FilterDropdownProps } from 'antd/lib/table/interface';
import './index.css';

function Medications(): JSX.Element {
  const { state, update } = useContext(MedicationsContext);
  const [data, set] = useState<MedicationTableRecord[]>([]);
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const [editingKey, setEditingKey] = useState('');

  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter[]>([]);

  useEffect(() => {
    const buildMedicationState = async () => {
      if (state.medications.length === 0 || state.categories.length === 0) {
        const categories = await getMedicationCategories();
        const medications = await getMedications();
        const data: MedicationState = {
          categories,
          medications,
        };
        update(data);
      }
    };
    buildMedicationState();
  }, [state, update]);

  useEffect(() => {
    const d: MedicationTableRecord[] = [];
    state.medications.forEach(({ id, name, strength, category_name }) => {
      const medication = {
        key: id,
        id,
        name,
        strength,
        category_name,
      };
      d.push(medication);
    });
    set(d);

    const categories: string[] = state.categories
      .map((category) => category.name)
      .sort();

    const c: CategoryFilter[] = [];
    categories.forEach((name) => c.push({ text: name, value: name }));
    setCategoryFilter(c);
  }, [state]);

  // ADD MEDICATION
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

  // DELETE MEDICATION
  const onDeleteMedication = async (id: string | number) => {
    const { status } = await deleteMedication(id);
    const description = 'Medication deleted';
    notificationHandler(status, description, 'topRight');
    deleteMedicationFromContext(+id);
  };

  const deleteMedicationFromContext = (id: number) => {
    const medications = state.medications.filter(
      (medication) => medication.id !== id
    );
    const newMedicationState = {
      medications,
      categories: state.categories,
    };
    update(newMedicationState);
  };

  function showDeleteConfirm(
    id: string | number,
    medicineName: string,
    medicineStrength: string
  ) {
    Modal.confirm({
      title: 'Are you sure you want to delete this medication?',
      icon: <ExclamationCircleOutlined />,
      content: `${medicineName} ${medicineStrength}`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDeleteMedication(id);
      },
    });
  }

  // SEARCH
  // const getColumnSearchProps = (dataIndex: string) => ({
  //   // eslint-disable-next-line react/display-name
  //   filterDropdown: (f: FilterDropdownProps) => (
  //     // { setSelectedKeys,
  //     // selectedKeys,
  //     // confirm,
  //     // clearFilters, }
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={(node) => {
  //           searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={f.selectedKeys[0]}
  //         onChange={(e) =>
  //           f.setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(f.selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(f.selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => handleSearchReset(f.clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({ closeDropdown: false });
  //             setSearchText(f.selectedKeys[0].toString());
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   // eslint-disable-next-line react/display-name
  //   filterIcon: (filtered: boolean) => (
  //     <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  //   ),
  //   onFilter: (
  //     value: string,
  //     record: { [x: string]: { toString: () => string } }
  //   ) =>
  //     record[dataIndex]
  //       ? record[dataIndex]
  //           .toString()
  //           .toLowerCase()
  //           .includes(value.toLowerCase())
  //       : '',
  //   onFilterDropdownVisibleChange: (visible: boolean) => {
  //     if (visible) setTimeout(() => searchInput.select(), 100);
  //   },
  //   render: (text: string) => text,
  // });

  // const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleSearchReset = (clearFilters: any) => {
  //   clearFilters();
  //   setSearchText('');
  // };

  // EDIT
  // https://ant-design.gitee.io/components/table/#components-table-demo-drag-sorting-handler
  // const isEditing = (record: Item) => record.key === editingKey;
  // const edit = (record: Partial<Item> & { key: React.Key }) => {
  //   form.setFieldsValue({ name: '', age: '', address: '', ...record });
  //   setEditingKey(record.key);
  // };
  // const cancel = () => {
  //   setEditingKey('');
  // };
  // const save = async (key: React.Key) => {
  //   try {
  //     const row = (await form.validateFields()) as Item;

  //     const newData = [...data];
  //     const index = newData.findIndex((item) => key === item.key);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //       // todo
  //       // setData(newData);
  //       setEditingKey('');
  //     } else {
  //       newData.push(row);
  //       // todo
  //       // setData(newData);
  //       setEditingKey('');
  //     }
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Strength',
      dataIndex: 'strength',
      key: 'strength',
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
      filters: categoryFilter,
      onFilter: (value: any, record: any) =>
        record.category_name.indexOf(value) === 0,
      // sorter: (a: any, b: any) =>
      //   a.category_name.length - b.category_name.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (record: any) => (
        <Button
          onClick={() =>
            showDeleteConfirm(record.id, record.name, record.strength)
          }
          type="link"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table
          bordered
          columns={columns}
          dataSource={data}
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

export default Medications;
