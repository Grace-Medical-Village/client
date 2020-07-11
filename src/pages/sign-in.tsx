import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useForm } from 'react-hook-form'; TODO

const { Title } = Typography;

type FormData = {
	username: string;
	password: string;
};

function SignIn() {
	let history = useHistory();
	const [form] = Form.useForm();
	const [, forceUpdate] = useState();

	useEffect(() => {
		forceUpdate({});
	}, []);

	const onFinish = (values: any) => {
		// TODO - Handle Auth
		history.push('/dashboard');
	};

	return (
		<>
			<Row justify='start'>
				<Title level={4}>Please sign in</Title>
			</Row>
			<Form
				form={form}
				name='horizontal_login'
				layout='inline'
				onFinish={onFinish}
			>
				<Form.Item
					name='username'
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item shouldUpdate={true}>
					{() => (
						<Button
							type='primary'
							htmlType='submit'
							disabled={!form.isFieldsTouched(true)}
						>
							Log in
						</Button>
					)}
				</Form.Item>
			</Form>
		</>
	);
}

export default SignIn;
