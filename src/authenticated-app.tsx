import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Error from './pages/error';
import Medications from './pages/medications';
import Patient from './pages/patient';

import Header from './components/header';
import Footer from './components/footer';

const { Content } = Layout;

function AuthenticatedApp(): JSX.Element {
  return (
    <>
      <Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
        <Header />
        <Content style={{ backgroundColor: 'white' }}>
          <Row align="middle" justify="center">
            <Col span={24}>
              <Switch>
                <Route exact path="/medications" component={Medications} />
                <Route exact path="/patient" component={Patient} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route component={Error} />
              </Switch>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default AuthenticatedApp;
