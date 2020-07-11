import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';

import SignIn from './pages/sign-in';

function UnauthenticatedApp() {
	return (
		<div>
			<Switch>
				<Layout.Content className='layout'>
					<Row justify='center'>
						<Col span={6} />
						<Col span={12}>
							<Route path='/' component={SignIn} />
						</Col>
						<Col span={6} />
					</Row>
				</Layout.Content>
			</Switch>
		</div>
	);
}

export default UnauthenticatedApp;
