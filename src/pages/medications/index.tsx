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
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
import './index.css';

function Medications(): JSX.Element {
  const { state, update } = useContext(MedicationsContext);
  const [data, set] = useState<MedicationTableRecord[]>([]);

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
    state.medications.forEach(({ id, name, strength, categoryName }) => {
      const medication = {
        key: id,
        id,
        name,
        strength,
        categoryName,
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Strength',
      dataIndex: 'strength',
      key: 'strength',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      filters: categoryFilter,
      onFilter: (value: any, record: any) =>
        record.categoryName.indexOf(value) === 0,
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
