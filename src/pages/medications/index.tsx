import { Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { MedicationsContext } from '../../context/medications';
import { Medication } from '../../utils/types';

function Medications(): JSX.Element {
  const { state } = useContext(MedicationsContext);
  const [data, set] = useState<Medication[]>([]);

  useEffect(() => {
    set(state);
  }, [state]);

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Strength',
  //     dataIndex: 'strength',
  //     key: 'strength',
  //   },
  //   {
  //     title: 'Category',
  //     dataIndex: 'category_name',
  //     key: 'category_name',
  //   },
  // ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Strength',
      dataIndex: 'strength',
      key: 'strength',
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
      filters: [
        {
          text: 'Pain',
          value: 'Pain',
        },
      ],
    },
  ];

  // const onChange = (pagination, filters, sorter, extra) => {
  // console.log('params', pagination, filters, sorter, extra);
  // };
  //
  return (
    <>
      <h1>Medications Component</h1>
      <Table dataSource={data} columns={columns} />
    </>
  );
}

export default Medications;
