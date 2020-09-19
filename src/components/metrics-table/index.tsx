import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';

import { MetricsContext } from '../../context/metrics';
import {
  MetricId,
  MetricName,
  TableMetric,
} from '../../services/metrics/types';

export default function MetricsTable(): JSX.Element {
  const [data, set] = useState<TableMetric[]>([]);
  const { state } = useContext(MetricsContext);

  useEffect(() => {
    const regex = new RegExp(
      /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    );

    const tableData: TableMetric[] = [];

    // state is behind...
    Object.keys(state).forEach((metricId: string): void => {
      Object.entries(state[metricId]).forEach(
        (entry: (string | number | boolean)[]): void => {
          if (regex.test(entry[0].toString())) {
            const row: TableMetric = {
              date: entry[0].toString(),
              key: `${entry[0]}${entry[1]}${metricId}`,
              metric: metricId as MetricName,
              metricId: metricId as MetricId,
              value: entry[1],
            };
            tableData.push(row);
          }
        }
      );
    });
    set(tableData);
  }, [state]);

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
