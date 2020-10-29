import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Patient from './pages/patient';
import PatientDashboard from './pages/patient-dashboard';
import Error from './pages/error';

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
                <Route exact path="/patient" component={Patient} />
                <Route exact path="/dashboard" component={PatientDashboard} />
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
