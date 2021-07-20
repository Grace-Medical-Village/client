import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  IdcardOutlined,
  LineChartOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { AuthContext, defaultAuthState } from '../../context/auth';
import logo from '../../assets/gmv-logo-white-heart.png';
import './styles.css';
import { clearStorage } from '../../utils/data';
import { PatientContext } from '../../context/patient';

const { SubMenu } = Menu;
const { Title } = Typography;

function Header(): JSX.Element {
  const [menuSelection, setMenuSelection] = useState('dashboard');
  const authContext = useContext(AuthContext);
  const { authenticated } = authContext.state;
  const { state } = useContext(PatientContext);
  const history = useHistory();
  const location = useLocation();

  const handleClick: MenuClickEventHandler = (event) => {
    const { key } = event;
    if (key === 'log-out') {
      signOut()
        .then((r) => r)
        .catch((err) => console.error(err));

      history.push('/');
    } else {
      console.log(key);
      history.push(key);
    }
  };

  useEffect(() => {
    setMenuSelection(location.pathname.substring(1));
  }, [location]);

  async function signOut() {
    try {
      clearState();
      await Auth.signOut();
    } catch (error) {
      console.error('error signing out: ', error);
    }
  }

  function clearState() {
    resetAuth();
    clearStorage();
  }

  function resetAuth() {
    authContext.update(defaultAuthState);
  }

  return (
    <Layout.Header className="header">
      <img alt="GMVC Logo" className="header-logo" src={logo} />
      {authenticated ? (
        <Menu
          className="header-menu"
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[menuSelection]}
          theme="dark"
        >
          <Menu.Item key="dashboard" icon={<IdcardOutlined />}>
            {state.patient
              ? `${state.patient.firstName} ${state.patient.lastName}`
              : 'Dashboard'}
          </Menu.Item>
          <Menu.Item key="patient" icon={<UserAddOutlined />}>
            Patient
          </Menu.Item>
          <Menu.Item key="medications" icon={<MedicineBoxOutlined />}>
            Formulary
          </Menu.Item>
          <Menu.Item key="analytics" icon={<LineChartOutlined />}>
            Analytics
          </Menu.Item>
          <SubMenu
            key="submenu"
            className="header-settings"
            icon={<SettingOutlined />}
            title="Settings"
          >
            <Menu.Item key="change-log">Change Log</Menu.Item>
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
