import React, { useContext, useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import {
  Metric,
  PatientData,
  PatientMetric,
  PatientMetricTableRecord,
} from '../../utils/types';
import {
  monthDayYearFullDate,
  timestampFromDateString,
} from '../../utils/dates';
import { PatientContext } from '../../context/patient';
import { MetricsContext } from '../../context/metrics';
import { deletePatientMetric, getMetrics } from '../../services/api';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { notificationHandler } from '../../utils/ui';

export default function MetricsTable(): JSX.Element {
  const [data, set] = useState<PatientMetricTableRecord[]>([]);
  const [metricFilters, setMetricFilters] = useState<ColumnFilterItem[]>([]);
  const [dateFilters, setDateFilters] = useState<ColumnFilterItem[]>([]);
  const [loading, setLoading] = useState(false);
  const metricCtx = useContext(MetricsContext);
  const { state, update } = useContext(PatientContext);

  const buildMetricTableValue = (value: string, uom: string | null): string => {
    const re = new RegExp('(\\d{4})-(\\d{2})-(\\d{2})');
    let result = value;
    if (re.test(value)) {
      result = monthDayYearFullDate(value);
    } else if (value && uom) {
      result = `${value} ${uom}`;
    }
    return result;
  };

  useEffect(() => {
    const buildMetricState = async () => {
      setLoading(true);
      if (metricCtx.state.length === 0) {
        const metrics = await getMetrics();
        if (metrics.length > 0) metricCtx.update(metrics);
      }
    };
    buildMetricState()
      .then((r) => r)
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [metricCtx]);

  useEffect(() => {
    const d: PatientMetricTableRecord[] = [];

    const getMetric = (id: number): Metric =>
      metricCtx?.state?.filter((metric) => metric.id === id)[0];

    if (state?.metrics) {
      state?.metrics.forEach((patientMetric: PatientMetric) => {
        const metric = getMetric(patientMetric.metricId);
        if (metric) {
          const value = buildMetricTableValue(patientMetric.value, metric.uom);
          const m: PatientMetricTableRecord = {
            id: patientMetric.metricId,
            key: patientMetric.id,
            date: monthDayYearFullDate(patientMetric.createdAt),
            timestamp: timestampFromDateString(patientMetric.createdAt),
            metric: metric.metricName,
            value,
            comment: patientMetric?.comment ?? '',
          };
          d.push(m);
        }
      });
    }
    set(d);
  }, [metricCtx, state]);

  useEffect(() => {
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
  }, [data]);

  const handleDelete = async (id: number): Promise<void> => {
    const { status } = await deletePatientMetric(id);
    const description = 'Metric deleted';
    notificationHandler(status, description, 'bottomRight');
    deleteMetricFromContext(id);
  };

  // const handleEdit = async (id: number): Promise<void> => {
  // TODO
  // const { status } = await putPatientMetric(id);
  // const description = 'Metric deleted';
  // TODO -> remove 400
  // notificationHandler(400, description, 'bottomRight');
  // deleteMetricFromContext(id);
  // };

  const deleteMetricFromContext = (id: number): void => {
    const metrics: PatientMetric[] =
      state?.metrics?.filter((metric) => metric.id !== id) ?? [];
    const updatedPatientState: PatientData = {
      ...state,
      metrics,
    };
    update(updatedPatientState);
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
      onFilter: (value: unknown, record: PatientMetricTableRecord) => {
        return typeof value === 'string'
          ? record.metric.indexOf(value) === 0
          : false;
      },
      sorter: {
        compare: (a: PatientMetricTableRecord, b: PatientMetricTableRecord) => {
          return a.metric.toLowerCase() < b.metric.toLowerCase() ? 0 : -1;
        },
        multiple: 2,
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      filters: dateFilters,
      onFilter: (value: unknown, record: PatientMetricTableRecord) => {
        return typeof value === 'string'
          ? record.date.indexOf(value) === 0
          : false;
      },
      sorter: {
        compare: (a: PatientMetricTableRecord, b: PatientMetricTableRecord) => {
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
        record: PatientMetricTableRecord
      ): JSX.Element | null =>
        data.length >= 1 ? (
          // TODO -> popconfirm?
          // <Popconfirm title="Edit?" onConfirm={() => handleEdit(record.key)}>
          <Button disabled type="link">
            Edit
          </Button>
        ) : // </Popconfirm>
        null,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      // eslint-disable-next-line react/display-name
      render: (
        _: unknown,
        record: PatientMetricTableRecord
      ): JSX.Element | null =>
        data.length >= 1 ? (
          <Popconfirm
            title="Delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} />;
}
