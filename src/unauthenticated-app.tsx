import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import SignIn from './pages/sign-in';

function UnauthenticatedApp() {
	return (
		<>
			<Switch>
				<Layout.Content>
					<Row align='middle' justify='center' style={{ height: '100vh' }}>
						<Col span={6} />
						<Col span={12}>
							<Route path='/' component={SignIn} />
						</Col>
						<Col span={6} />
					</Row>
				</Layout.Content>
			</Switch>
		</>
	);
}

export default UnauthenticatedApp;
