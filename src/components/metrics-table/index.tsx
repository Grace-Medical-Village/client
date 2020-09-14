import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

export default function MetricsTable({ patientHistory }: any) {
  const [data, set] = useState([{}]);

  useEffect(() => {
    let d = {};
    if (Object.entries(patientHistory).length !== 0) {
      patientHistory.map((m: any) => {
        console.log(m);
      });
    }
  }, [patientHistory]);

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
