import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';

import { MetricsContext } from '../../context/metrics';
import { MetricId, MetricsTableRecord } from '../../utils/types';
import { metricNames } from '../../utils/metrics';
import { monthDayYearFullDate } from '../../utils/dates';

export default function MetricsTable(): JSX.Element {
  const [data, set] = useState<MetricsTableRecord[]>([]);
  const { state } = useContext(MetricsContext);

  useEffect(() => {
    const d: MetricsTableRecord[] = [];
    Object.keys(state).forEach((date: string) =>
      // todo -> MetricEntry
      Object.entries(state[date]).forEach((v: any) => {
        const n = v[0] as MetricId;
        const m: MetricsTableRecord = {
          key: `${date}_${v[0]}_${v[1]}`,
          date: monthDayYearFullDate(date),
          metric: metricNames[n],
          value: v[1],
        };
        d.push(m);
      })
    );
    set(d);
  }, [state]);

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
