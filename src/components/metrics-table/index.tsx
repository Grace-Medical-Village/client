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
import { ColumnFilterItem } from 'antd/lib/table/interface';

export default function NotesTable(): JSX.Element {
  const [data, set] = useState<PatientMetricTableRecord[]>([]);
  const [metricFilters, setMetricFilters] = useState<ColumnFilterItem[]>([]);
  const [dateFilters, setDateFilters] = useState<ColumnFilterItem[]>([]);
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

  useEffect(() => {
    buildFilters();
  }, [data]);

  const buildFilters = () => {
    const metric = new Set<string>();
    const date = new Set<string>();

    data.forEach((d) => {
      metric.add(d.metric);
      date.add(d.date);
    });

    const mf = buildColumnFilterItems(metric);
    const df = buildColumnFilterItems(date);

    setMetricFilters(mf);
    setDateFilters(df);
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

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      filters: metricFilters,
      onFilter: (value: any, record: PatientMetricTableRecord) => {
        return record.metric.indexOf(value) === 0;
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      filters: dateFilters,
      onFilter: (value: any, record: PatientMetricTableRecord) => {
        return record.date.indexOf(value) === 0;
      },
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
