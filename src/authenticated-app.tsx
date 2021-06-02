import React, { useContext, useEffect } from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Error from './pages/error';
import Medications from './pages/medications';
import Patient from './pages/patient';

import Header from './components/header';
import Footer from './components/footer';
import { PatientContext } from './context/patient';
import { getPatient } from './services/api';
import { isEmpty } from 'lodash';
import { PatientData } from './utils/types';

const { Content } = Layout;

function AuthenticatedApp(): JSX.Element {
  const { state, update } = useContext(PatientContext);

  useEffect(() => {
    const fetchPatient = async () => {
      const patientId: string = localStorage.getItem('patientId') + '';
      if (isEmpty(state) && !isNaN(Number(patientId))) {
        const res: PatientData = await getPatient(Number.parseInt(patientId));
        if (!isEmpty(res.patient)) update(res);
      }
    };
    fetchPatient();
  }, [state, update]);

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
