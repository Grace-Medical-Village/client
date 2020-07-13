import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import Analytics from './pages/analytics';
import NewPatient from './pages/new-patient';
import PatientDashboard from './pages/patient-dashboard';
import SignIn from './pages/sign-in';
import Error from './pages/error';

import Header from './components/header';
import Footer from './components/footer';

const { Content } = Layout;

function AuthenticatedApp() {
	return (
		<>
			<Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
				<Header />
				<Switch>
					<Content style={{ padding: '3rem' }}>
						<Row align='middle' justify='center'>
							<Col span={24}>
								<Route exact path='/' component={SignIn} />
								<Route exact path='/analytics' component={Analytics} />
								<Route exact path='/dashboard' component={PatientDashboard} />
								<Route exact path='/new-patient' component={NewPatient} />
								<Route path='/error' component={Error} />
								<Redirect to='error' />
							</Col>
						</Row>
					</Content>
				</Switch>
				<Footer />
			</Layout>
		</>
	);
}

export default AuthenticatedApp;
