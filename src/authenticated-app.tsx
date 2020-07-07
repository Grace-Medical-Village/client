import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Analytics from './pages/analytics';
import NewPatient from './pages/new-patient';
import PatientDashboard from './pages/patient-dashboard';
import SignIn from './pages/sign-in';

import Header from './components/header';
import Footer from './components/footer';

function AuthenticatedApp() {
	return (
		<div>
			<Layout.Header>
				<Header />
			</Layout.Header>
			<div>
				<Switch>
					<Layout.Content className='layout'>
						<Row justify='center'>
							<Col span={24}>
								<Route exact path='/' component={SignIn} />
								<Route exact path='/analytics' component={Analytics} />
								<Route exact path='/dashboard' component={PatientDashboard} />
								<Route exact path='/new-patient' component={NewPatient} />
								<Route exact path='/welcome' component={SignIn} />
							</Col>
						</Row>
					</Layout.Content>
				</Switch>
			</div>
			<Layout.Footer>
				<Footer />
			</Layout.Footer>
		</div>
	);
}

export default AuthenticatedApp;
