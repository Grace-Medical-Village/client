import { Collapse, Descriptions, Typography } from 'antd';
import React from 'react';
import Conditions from '../conditions';

const { Panel } = Collapse;
const { Item } = Descriptions;
const { Title } = Typography;

export default function History(): JSX.Element {
  return (
    <>
      <Title level={5}>Patient History</Title>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Conditions" key="1">
          <Conditions />
        </Panel>
        <Panel header="Past Notes" key="2">
          <Collapse>
            <Panel header="August 5, 2020" key="20200805">
              <Descriptions layout="vertical" bordered>
                <Item label="Physician">Dr. Bradley</Item>
                <Item label="Notes">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, corporis.
                </Item>
              </Descriptions>
            </Panel>
            <Panel header="June 1, 2020" key="20200601">
              <Descriptions layout="vertical" bordered>
                <Item label="Physician">Dr. Yao</Item>
                <Item label="Notes">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                  perspiciatis unde in ut fuga deleniti maxime amet, itaque
                  fugiat vel cupiditate aliquam quasi, pariatur voluptas ullam
                  aperiam quae, iste et?
                </Item>
              </Descriptions>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </>
  );
}
