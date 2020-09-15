import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';

import { MetricsContext } from '../../context/metrics';
import { MetricItem, TableMetric } from '../../services/metrics/types';

export default function MetricsTable(): JSX.Element {
  const [data, set] = useState<TableMetric[]>([]);
  const metricsCtx = useContext(MetricsContext);
  const { metrics } = metricsCtx.state;

  useEffect(() => {
    console.log(metrics);
    metrics.forEach((m: MetricItem) => console.log(m));
  }, [metrics]);

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'name',
      key: 'name',
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
