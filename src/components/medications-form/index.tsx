import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { PatientContext } from '../../context/patient';
import {
  getMedicationCategories,
  getMedications,
  postPatientMedication,
  requestSuccess,
} from '../../services/api';
import { messageUserResult } from '../../utils/ui';
import { MedicationState, PatientMedication } from '../../utils/types';
import { MedicationsContext } from '../../context/medications';

export default function MedicationsForm(): JSX.Element {
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
    if (medicationsCtx?.state?.medications.length === 0) {
      setMedications()
        .then((r) => r)
        .catch((err) => console.error(err));
    }
  }, [medicationsCtx]);

  function onReset() {
    form.resetFields();
    setActiveCategory(-1);
  }

  async function onFinish(data: Store) {
    if (state?.patient?.id && data?.medication) {
      const patientId = state.patient.id;
      const medicationId = data.medication;
      const {
        id = null,
        status,
        createdAt = null,
        modifiedAt = null,
      } = await postPatientMedication(patientId, medicationId);
      const success = requestSuccess(status);
      handleSaveMedicationResult(
        success,
        id,
        patientId,
        medicationId,
        createdAt,
        modifiedAt
      );
    }
  }

  function handleSaveMedicationResult(
    success: boolean,
    id: number | null,
    patientId: number,
    medicationId: number,
    createdAt: string | null,
    modifiedAt: string | null
  ) {
    const successMessage = 'Medication saved';
    const failureMessage = 'Failed to save medication';
    messageUserResult(success, successMessage, failureMessage);
    if (id && createdAt && modifiedAt) {
      addMedicationToContext(
        id,
        patientId,
        medicationId,
        createdAt,
        modifiedAt
      );
    }
  }

  function addMedicationToContext(
    id: number,
    patientId: number,
    medicationId: number,
    createdAt: string,
    modifiedAt: string
  ) {
    const pm: PatientMedication = {
      id,
      medicationId,
      patientId,
      createdAt,
      modifiedAt,
    };

    const existingState = state.medications ?? [];
    const newState: PatientMedication[] = [pm, ...existingState];
    update({
      ...state,
      medications: newState,
    });
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
    return medication ? medication[0].categoryId : -1;
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
                    return med.categoryId === activeCategory;
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
