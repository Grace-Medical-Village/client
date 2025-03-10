import React from 'react';
import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import SignIn from './pages/sign-in';

const { Content } = Layout;

function UnauthenticatedApp(): JSX.Element {
  return (
    <>
      <Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
        <Header />
        <Content>
          <Row align="middle" justify="center" style={{ minHeight: '80vh' }}>
            <Col span={6} />
            <Col span={12}>
              <Switch>
                <Route path="/" component={SignIn} />
              </Switch>
            </Col>
            <Col span={6} />
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default UnauthenticatedApp;
