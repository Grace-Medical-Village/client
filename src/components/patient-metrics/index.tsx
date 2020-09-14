import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Typography } from 'antd';
import MetricsBuilder from '../metrics-builder';
import MetricsTable from '../metrics-table';
import { metrics } from '../../services/patient';
import { PatientContext } from '../../context/patient';
import { get } from '../../services/api';

const { Title } = Typography;

export default function PatientMetrics() {
  const patientCtx = useContext(PatientContext);
  const [metricList, setMetricList] = useState([]);
  const [patientHistory, setPatientHistory] = useState({});
  const { id } = patientCtx.state;

  useEffect(() => {
    const m: any = [];
    metrics.forEach(({ key, disabled }) => {
      if (!disabled) m.push(key);
    });
    setMetricList(m);
  }, []);

  useEffect(() => getPatientMetrics(), [metricList]);

  let history = {
    a: [{ letter: 'A', number: 1 }],
    b: [{ letter: 'B', number: 1 }, { letter: 'bey' }],
  };
  useEffect(() => console.log(patientHistory), [patientHistory]);

  const { REACT_APP_PATIENT_API } = process.env;

  const getPatientMetrics = () => {
    metricList.forEach((metric: string) => {
      if (!REACT_APP_PATIENT_API)
        throw new Error('Patient API URL is undefined');

      const params = {
        id,
        key: metric,
      };
      get(REACT_APP_PATIENT_API, params).then((res) => {
        if (res.status === 200) {
          const { data } = res;
          const regex = new RegExp(
            /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
          );
          const { key } = data;
          let values: any = [];
          Object.keys(data).map((k: string) => {
            if (regex.test(k)) {
              let record = { date: k, value: data[k] };
              values.push(record);
            }
          });
          const history = patientHistory;
          const newMetric = { [key]: values };
          Object.assign(history, newMetric);
          setPatientHistory(history);
        }
      });
    });
  };

  return (
    <>
      <Row>
        <Title level={3}>Metrics</Title>
      </Row>
      <Row>
        <Col span={12}>
          <MetricsBuilder />
        </Col>
        <Col span={12}>
          <MetricsTable patientHistory={patientHistory} />
        </Col>
      </Row>
    </>
  );
}
