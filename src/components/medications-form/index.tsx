import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { PatientContext } from '../../context/patient';
import {
  getMedicationCategories,
  getMedications,
  getPatientMedications,
  postPatientMedication,
  requestSuccess,
} from '../../services/api';
import { notificationHandler } from '../../utils/ui';
import { MedicationState, PatientData } from '../../utils/types';
import { MedicationsContext } from '../../context/medications';

export default function NotesForm(): JSX.Element {
  const [form] = useForm();
  const { state, update } = useContext(PatientContext);
  const medicationsCtx = useContext(MedicationsContext);
  const [activeCategory, setActiveCategory] = useState(-1);

  const layout = {
    wrapperCol: { span: 24 },
  };

  useEffect(() => {
    const setMedications = async (): Promise<void> => {
      const categories = await getMedicationCategories();
      const medications = await getMedications();
      const data: MedicationState = {
        categories,
        medications,
      };
      medicationsCtx.update(data);
    };
    if (medicationsCtx?.state?.medications.length === 0) setMedications();
  }, [medicationsCtx]);

  function onReset() {
    form.resetFields();
    setActiveCategory(-1);
  }

  async function onFinish(data: Store) {
    console.log(data);
    if (!data.medication || !state?.patient?.id)
      message.warn('Unable to save medication');
    else {
      const { status } = await postPatientMedication(
        state.patient.id,
        data.medication
      );
      const description = 'Medication saved';
      notificationHandler(status, description, 'bottomRight');
      if (requestSuccess(status)) fetchMedications(state.patient.id);
    }
  }

  async function fetchMedications(id: number) {
    const medications = await getPatientMedications(id);
    const data: PatientData = {
      ...state,
      medications,
    };
    update(data);
    onReset();
  }

  const handleCategoryChange = (id: number) => {
    setActiveCategory(id);
  };

  const handleMedicationChange = (id: number) => {
    const categoryId = getMedicationCategoryId(id);
    setActiveCategory(categoryId);
  };

  const getMedicationCategoryId = (medicationId: number): number => {
    const medication = medicationsCtx.state.medications.filter(
      (med) => med.id === medicationId
    );
    return medication ? medication[0].category_id : -1;
  };

  return (
    <Form
      {...layout}
      form={form}
      layout="vertical"
      name="medicationForm"
      onFinish={onFinish}
      style={{ marginTop: '0.5rem' }}
    >
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="category" noStyle>
            <Select
              filterOption={(input, option) =>
                option
                  ? option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  : false
              }
              onChange={handleCategoryChange}
              placeholder="Select category"
              showSearch
              style={{ width: '40vw' }}
            >
              {medicationsCtx.state.categories
                .filter((category) => {
                  if (activeCategory > -1)
                    return category.id === activeCategory;
                  else return category;
                })
                .sort()
                .map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="medication"
            noStyle
            rules={[{ required: true, message: 'Medication is required' }]}
          >
            <Select
              onChange={handleMedicationChange}
              placeholder="Select medication"
              style={{ width: '40vw' }}
            >
              {medicationsCtx.state.medications
                .filter((med) => {
                  if (activeCategory > -1)
                    return med.category_id === activeCategory;
                  else return med;
                })
                .sort()
                .map((med) => (
                  <Select.Option key={med.id} value={med.id}>
                    {med.name} {med.strength}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Input.Group>
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
