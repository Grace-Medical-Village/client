import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import NewPatient from './pages/new-patient';
import PatientDashboard from './pages/patient-dashboard';
import Error from './pages/error';

import Header from './components/header';
import Footer from './components/footer';

const { Content } = Layout;

function AuthenticatedApp() {
	return (
		<>
			<Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
				<Header />
				<Content style={{ padding: '3rem' }}>
					<Row align='middle' justify='center'>
						<Col span={24}>
							<Switch>
								<Route exact path='/' component={PatientDashboard} />
								<Route exact path='/dashboard' component={PatientDashboard} />
								<Route exact path='/new-patient' component={NewPatient} />
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
