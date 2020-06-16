import React, { useState } from 'react';
// import { withRouter } from 'react-dom';
import { Menu } from 'antd';
import {
	IdcardOutlined,
	LineChartOutlined,
	UserAddOutlined,
} from '@ant-design/icons';

// import './header.styles.scss';

function Header() {
	const [menuSelection, setMenuSelection] = useState('newPatient');

	const handleClick = (e: any) => {
		const { key } = e;
		setMenuSelection(key);
		// history.push('key');
	};

	return (
		<Menu
			mode='horizontal'
			onClick={handleClick}
			selectedKeys={[menuSelection]}
			theme='dark'
		>
			<Menu.Item key='new-patient' icon={<UserAddOutlined />}>
				New Patient
			</Menu.Item>
			<Menu.Item key='dashboard' icon={<IdcardOutlined />}>
				Patient Dashboard
			</Menu.Item>
			<Menu.Item key='analytics' icon={<LineChartOutlined />} disabled>
				Analytics
			</Menu.Item>
			<Menu.Item key='sign-in'>Log In</Menu.Item>
		</Menu>
	);
}

export default withRouter(Header);
