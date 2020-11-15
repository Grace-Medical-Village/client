import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  IdcardOutlined,
  LineChartOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../context/auth';
import { BackgroundContext } from '../../context/background';
import logo from '../../assets/gmv-logo-white-heart.png';
import './styles.css';
import { Auth } from 'aws-amplify';
import { clearStorage } from '../../utils/data';

const { SubMenu } = Menu;
const { Title } = Typography;

function Header(): JSX.Element {
  const [menuSelection, setMenuSelection] = useState('dashboard');
  const auth = useContext(AuthContext);
  const { state } = useContext(BackgroundContext);
  const { firstName, lastName } = state;
  const { authenticated } = auth.state;
  const history = useHistory();
  const location = useLocation();

  const handleClick = (event: any) => {
    const { key } = event;
    if (key === 'log-out') {
      signOut();
      clearStorage();
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
      await Auth.signOut();
      auth.update({
        authenticated: false,
        username: '',
      });
    } catch (error) {
      console.error('error signing out: ', error);
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
            {firstName && lastName ? `${firstName} ${lastName}` : 'Dashboard'}
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
            <Menu.Item key="log-out">Logout</Menu.Item>
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
