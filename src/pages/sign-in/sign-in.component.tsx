import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
// import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useForm } from 'react-hook-form'; TODO

const { Title } = Typography;

type FormData = {
	username: string;
	password: string;
};

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function SignIn() {
	let history = useHistory();
	// const { register, setValue, handleSubmit, errors } = useForm<FormData>();
	//
	// const onSubmit = handleSubmit(({ username, password }) => {
	// console.log(username, password);
	// });

	const onFinish = (values: any) => {
		console.log('Success:', values);
		history.push('/dashboard');
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<div>
				<Title level={2}>Welcome to Grace Medical Village</Title>
			</div>
			<Form
				{...layout}
				name='basic'
				initialValues={{ remember: true }}
				layout='horizontal'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Username'
					name='username'
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default SignIn;
