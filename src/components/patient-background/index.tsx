import React from 'react';
import {
  Col,
  Row,
  Statistic,
  Typography,
} from 'antd';

const { Title } = Typography;

export default function PatientBackground(props: any) {
  return (
        <Row>
          <Title level={3}>Background</Title>
        </Row>
        // <Row>
          {/* {props.map((stat: PatientStat, index: number) => { */}
            // const { title, value }: PatientStat = stat;
            // return (
              // <Col key={index} span={4}>
                {/* <Statistic title={title} value={value} /> */}
              {/* </Col> */}
            // );
          // })}
        {/* </Row> */}
  );
}