import React, { useContext, useEffect } from 'react';

import { Col, Layout, Row } from 'antd';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Formulary from './pages/formulary';
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
    const fetchPatient = async (): Promise<PatientData | void> => {
      const patientId: string = localStorage.getItem('patientId') + '';
      if (isEmpty(state) && !isNaN(Number(patientId))) {
        return await getPatient(Number.parseInt(patientId));
      }
    };
    fetchPatient()
      .then((result) => {
        if (result && result.patient && !isEmpty(result.patient)) {
          update(result);
        }
      })
      .catch((err) => console.error(err)); // TODO
  }, [state, update]);

  return (
    <>
      <Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
        <Header />
        <Content style={{ backgroundColor: 'white' }}>
          <Row align="middle" justify="center">
            <Col span={24}>
              <Switch>
                <Route exact path="/medications" component={Formulary} />
                <Route exact path="/patient" component={Patient} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/" component={Patient} />
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
