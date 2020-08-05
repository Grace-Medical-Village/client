import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Layout, Menu, Typography } from 'antd';
import {
  IdcardOutlined,
  LineChartOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../context/auth-context';
import logo from '../assets/gmv-logo-white-heart.png';
import '../styles/header.css';

const { SubMenu } = Menu;
const { Title } = Typography;

function Header() {
  const [menuSelection, setMenuSelection] = useState('dashboard');
  const auth = useContext(AuthContext);
  const { authenticated } = auth.state;
  let history = useHistory();
  let location = useLocation();

  const handleClick = (e: any) => {
    const { key } = e;
    if (key === 'log-out') {
      signOut();
      history.push('/');
    } else {
      history.push(key);
    }
  };

  useEffect(() => {
    setMenuSelection(location.pathname.substring(1));
  }, [location]);

  async function signOut() {
    try {
      await true; // TODO
      auth.update({
        authenticated: false,
        username: '',
      });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <Layout.Header className="header">
      <img alt="GMV Logo" className="header-logo" src={logo} />
      {authenticated ? (
        <Menu
          className="header-menu"
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[menuSelection]}
          theme="dark"
        >
          <Menu.Item key="dashboard" icon={<IdcardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="patient" icon={<UserAddOutlined />}>
            Patient
          </Menu.Item>
          <Menu.Item key="analytics" icon={<LineChartOutlined />} disabled>
            Analytics
          </Menu.Item>
          <SubMenu
            className="header-settings"
            icon={<SettingOutlined />}
            title="Settings"
          >
            <Menu.Item key="faq">FAQ</Menu.Item>
            <Menu.Item key="log-out">Log Out</Menu.Item>
          </SubMenu>
        </Menu>
      ) : (
        <Title level={3} style={{ color: 'white', lineHeight: 0, margin: 0 }}>
          Welcome to Grace Medical Village!
        </Title>
      )}
    </Layout.Header>
  );
}

export default Header;
