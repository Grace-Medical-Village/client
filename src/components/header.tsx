import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import {
	IdcardOutlined,
	LineChartOutlined,
	UserAddOutlined,
} from '@ant-design/icons';

function Header() {
	const [menuSelection, setMenuSelection] = useState('dashboard');
	let history = useHistory();

	const handleClick = (e: any) => {
		const { key } = e;
		setMenuSelection(key);
		history.push(key);
	};

	return (
		<nav>
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
				<Menu.Item key='welcome'>Sign Out</Menu.Item>
			</Menu>
		</nav>
	);
}

export default withRouter(Header);
