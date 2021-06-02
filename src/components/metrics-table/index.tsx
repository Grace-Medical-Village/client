import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import {
  Metric,
  PatientMetric,
  PatientMetricTableRecord,
} from '../../utils/types';
import { monthDayYearFullDate } from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { MetricsContext } from '../../context/metrics';
import { getMetrics } from '../../services/api';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientMetricTableRecord[]>([]);
  const metricCtx = useContext(MetricsContext);
  const patientCtx = useContext(PatientContext);

  useEffect(() => {
    const buildMetricState = async () => {
      if (metricCtx.state.length === 0) {
        const metrics = await getMetrics();
        if (metrics.length > 0) metricCtx.update(metrics);
      }
    };
    buildMetricState();
  }, [metricCtx]);

  useEffect(() => {
    const d: PatientMetricTableRecord[] = [];

    const getMetric = (id: number): Metric =>
      metricCtx?.state?.filter((metric) => metric.id === id)[0];

    if (patientCtx?.state?.metrics) {
      patientCtx?.state?.metrics.forEach((patientMetric: PatientMetric) => {
        const metric = getMetric(patientMetric.metricId);
        if (metric) {
          const m: PatientMetricTableRecord = {
            id: patientMetric.metricId,
            key: patientMetric.id,
            date: monthDayYearFullDate(patientMetric.createdAt.toString()),
            metric: metric.metricName,
            value: `${patientMetric.value} ${metric.uom}`,
          };
          d.push(m);
        }
      });
    }
    set(d);
  }, [metricCtx, patientCtx]);

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
