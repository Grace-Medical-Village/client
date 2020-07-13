import React from 'react';
import { Button, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';

const { Title } = Typography;

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

const tailLayout = {
	wrapperCol: { offset: 6, span: 14 },
};

function NewPatientForm() {
	const [form] = Form.useForm();
	const dateFormat = 'M/D/YYYY';

	// TODO
	const onFinish = () => console.log('TODO');
	const onFinishFailed = () => console.log('TODO');

	return (
		<>
			<Row justify='center'>
				<Title level={3}>New Patient Form</Title>
			</Row>
			<Form
				{...layout}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='First Name'
					name='firstName'
					rules={[{ required: true, message: 'First name is required.' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Last Name'
					name='lastName'
					rules={[{ required: true, message: 'Last name is required.' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Date of Birth'
					name='dateOfBirth'
					rules={[{ required: true, message: 'Date of birth is required.' }]}
				>
					<DatePicker format={dateFormat} />
				</Form.Item>
				<Form.Item
					label='Gender'
					name='gender'
					rules={[{ required: true, message: 'Gender is required.' }]}
				>
					<Radio.Group>
						<Radio.Button value='male'>Male</Radio.Button>
						<Radio.Button value='female'>Female</Radio.Button>
						<Radio.Button value='other'>Other</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label='Zip Code'
					name='zipCode5'
					rules={[{ required: true, message: 'Zip code is required.' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item label='Country of Origin' name='country'>
					<Input disabled />
				</Form.Item>
				<Form.Item label='Primary Language' name='primaryLanguage'>
					<Input disabled />
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

export default NewPatientForm;
