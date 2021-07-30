import React, { useEffect, useState } from 'react';
import {
  Popover,
  Typography,
  Button,
  Form,
  DatePicker,
  Statistic,
  Row,
  Col,
  Space,
  notification,
  Divider,
  Card,
} from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import {
  getMapPatientCount,
  getMapPatientCountByDate,
  getPatientCount,
  getPatientCountByDate,
} from '../../services/api';
import { addDay, monthDayYear, yearMonthDay } from '../../utils/dates';
import './styles.css';
import MapPatients from '../../components/map-patients';

const { RangePicker } = DatePicker;

function Analytics(): JSX.Element {
  const [form] = Form.useForm();
  const [patientCount, setPatientCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mapPatientCount, setMapPatientCount] = useState(0);

  useEffect(() => {
    const buildAnalytics = async (): Promise<void> => {
      setLoading(true);
      const patientCountResult = await getPatientCount();
      if (patientCountResult > 0) {
        setPatientCount(patientCountResult);
      }
      const mapPatientCountResult = await getMapPatientCount();
      if (mapPatientCountResult > 0) {
        setMapPatientCount(mapPatientCountResult);
      }
    };

    buildAnalytics()
      .then((r) => r)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function onFinish(data: Store): Promise<void> {
    const { dateRange } = data;
    let startDate: string | null = null;
    let endDate: string | null = null;

    if (dateRange && dateRange.length === 2) {
      startDate = dateRange[0].format(yearMonthDay);
      endDate = addDay(dateRange[1].format(yearMonthDay), 1);
    }

    if (startDate && endDate) {
      await buildAnalyticsByDate(startDate, endDate);
    }
  }

  const buildAnalyticsByDate = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    setLoading(true);
    const endDatePlusOneDay = addDay(endDate, 1);
    const patientCountResult = await getPatientCountByDate(
      startDate,
      endDatePlusOneDay
    );
    setPatientCount(patientCountResult);
    if (patientCountResult > 0) {
      notification['success']({
        message: 'Patients Found',
        placement: 'bottomRight',
      });
    } else {
      notification['warning']({
        message: 'No Patients Found',
        placement: 'bottomRight',
      });
    }
    const mapPatientCountResult = await getMapPatientCountByDate(
      startDate,
      endDate
    );
    setMapPatientCount(mapPatientCountResult);
    setLoading(false);
    if (mapPatientCountResult > 0) {
      notification['success']({
        message: 'MAP Patients Found',
        placement: 'bottomRight',
      });
    } else {
      notification['warning']({
        message: 'No MAP Patients Found',
        placement: 'bottomRight',
      });
    }
  };

  const mapCalculationExplanation = (
    <span>
      <Typography.Text>Using the </Typography.Text>
      <Typography.Link href="https://www.map.org/domestic">
        MAP website
      </Typography.Link>
      <Typography.Text>
        {' '}
        as guidance, we count all patients with Asthma, Hypertension, Diabetes,
        or High Cholesterol
      </Typography.Text>
    </span>
  );

  return (
    <>
      <div className="analytics">
        <Row gutter={16}>
          <Divider orientation="left">Patient Overview</Divider>
        </Row>
        <Row>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Patients"
                value={patientCount}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6} style={{ paddingLeft: '0.5rem' }}>
            <Card>
              <Statistic
                title={
                  <>
                    <Space>
                      Map Patients
                      <Popover
                        content={mapCalculationExplanation}
                        title="MAP Patient Count Calculation"
                        trigger="hover"
                      >
                        <Button
                          icon={<ExclamationOutlined />}
                          shape="circle"
                          size="small"
                        />
                      </Popover>
                    </Space>
                  </>
                }
                value={mapPatientCount}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Form className="analytics-form" form={form} onFinish={onFinish}>
            <Form.Item label="Date Range" name="dateRange">
              <RangePicker format={monthDayYear} />
            </Form.Item>
            <Form.Item>
              <Button className="submit-btn" type="ghost" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row gutter={16}>
          <Divider orientation="left">MAP Patients</Divider>
          <MapPatients />
        </Row>
      </div>
    </>
  );
}

export default Analytics;
