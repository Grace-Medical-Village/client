import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Analytics from './pages/analytics/analytics.component';
import NewPatient from './pages/new-patient/new-patient.component';
import PatientDashboard from './pages/patient-dashboard/patient-dashboard.component';
import SignIn from './pages/sign-in/sign-in.component';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import './App.scss';

function App() {
	return (
		<div>
			<Header />
			<div>
				<Switch>
					<Route path='/' component={SignIn} />
					<Route exact path='/analytics' component={Analytics} />
					<Route exact path='/dashboard' component={PatientDashboard} />
					<Route exact path='/new-patient' component={NewPatient} />
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
