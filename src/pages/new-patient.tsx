import React from 'react';
import {
	Button,
	DatePicker,
	Form,
	Input,
	Radio,
	Row,
	Typography,
	Select,
} from 'antd';

import { countries, languages } from '../assets/patient.data';

const { Option } = Select;
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
	function onChange(value: any) {
		console.log(`selected ${value}`);
	}

	// TODO
	function onBlur() {
		console.log('blur');
	}

	// TODO
	function onFocus() {
		console.log('focus');
	}

	// TODO
	function onSearch(val: any) {
		console.log('search:', val);
	}
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
					label='Hispanic'
					name='hispanic'
					rules={[{ required: true, message: 'Ethnicity is required.' }]}
				>
					<Radio.Group>
						<Radio.Button value='yes'>Yes</Radio.Button>
						<Radio.Button value='no'>No</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label='Zip Code'
					name='zipCode5'
					rules={[{ required: true, message: 'Zip code is required.' }]}
				>
					<Input maxLength={5} />
				</Form.Item>
				<Form.Item
					initialValue='English'
					label='Primary Language'
					name='primaryLanguage'
				>
					<Select
						optionFilterProp='children'
						onChange={onChange}
						onFocus={onFocus}
						onBlur={onBlur}
						onSearch={onSearch}
						placeholder='Select a person'
						showSearch
						style={{ textTransform: 'capitalize', width: 200 }}
						// filterOption={(input, option) =>
						// option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						// }
					>
						{languages.map((language) => (
							<Option
								key={language}
								style={{ textTransform: 'capitalize' }}
								value={language}
							>
								{language}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					initialValue='United States'
					label='Country of Origin'
					name='country'
				>
					<Select
						optionFilterProp='children'
						onChange={onChange}
						onFocus={onFocus}
						onBlur={onBlur}
						onSearch={onSearch}
						placeholder='Select a country'
						showSearch
						style={{ width: 200 }}
						// filterOption={(input, option) =>
						// option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						// }
					>
						{countries.map((country) => (
							<Option key={country} value={country}>
								{country}
							</Option>
						))}
					</Select>
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
