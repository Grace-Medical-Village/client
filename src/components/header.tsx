import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
	IdcardOutlined,
	LineChartOutlined,
	UserAddOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../context/auth-context';

function Header() {
	const [menuSelection, setMenuSelection] = useState('dashboard');
	const auth = useContext(AuthContext);
	let history = useHistory();

	const handleClick = (e: any) => {
		const { key } = e;
		if (key === 'log-out') {
			auth.update({
				authenticated: false,
				username: '',
			});
			history.push('/');
		} else {
			setMenuSelection(key);
			history.push(key);
		}
	};

	return (
		<Layout.Header>
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
				<Menu.Item key='log-out' style={{ float: 'right' }}>
					Log Out
				</Menu.Item>
			</Menu>
		</Layout.Header>
	);
}

export default Header;
