// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext } from 'react';
import { Button, Form, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import '../styles/sign-in.css';

const { Title } = Typography;

type FormData = {
	username: string;
	password: string;
};

function SignIn() {
	const authCtx = useContext(AuthContext);
	let history = useHistory();

	const onFinish = (values: any) => {
		authCtx.update({ authenticated: true, username: 'Brett' });
		// TODO
		if (values.username && values.password) history.push('/dashboard');
	};

	return (
		<>
			<Row justify='start'>
				<Title level={4}>Please sign in</Title>
			</Row>
			<Form
				name='normal_login'
				className='login-form'
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name='username'
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default SignIn;
