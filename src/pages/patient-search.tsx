import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

const tailLayout = {
	wrapperCol: { offset: 6, span: 14 },
};

function PatientSearch() {
	const [form] = Form.useForm();

	// TODO
	const onFinish = () => console.log('TODO');
	// TODO
	const onFinishFailed = () => console.log('TODO');

	return (
		<>
			<Form
				{...layout}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item label='Last Name' name='lastName'>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default PatientSearch;
