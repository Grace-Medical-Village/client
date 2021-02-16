import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { message, Button, Form, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { ConditionsContext } from '../../context/conditions';
import { MedicationsContext } from '../../context/medications';
import {
  getConditions,
  getMedicationCategories,
  getMedications,
} from '../../services/api';
import './styles.css';
import { MedicationState } from '../../utils/types';

const { Title } = Typography;

function SignIn(): JSX.Element {
  const authContext = useContext(AuthContext);
  const conditionsContext = useContext(ConditionsContext);
  const medicationsContext = useContext(MedicationsContext);
  const history = useHistory();

  async function signIn(usernameEntered: string, passwordEntered: string) {
    try {
      const user = await Auth.signIn(usernameEntered, passwordEntered);
      authContext.update({ authenticated: true, username: user.username });
      setData();
      history.push('/patient');
    } catch (e) {
      console.error(e);
      message.error('Login Credentials are Incorrect');
    }
  }

  function setData() {
    setMedicationsContext();
    setConditions(); // todo
    // setMetrics(); // todo
  }

  const setMedicationsContext = async (): Promise<void> => {
    const categories = await getMedicationCategories();
    const medications = await getMedications();
    const data: MedicationState = {
      categories,
      medications,
    };
    medicationsContext.update(data);
  };

  const setConditions = async (): Promise<void> => {
    const data = await getConditions();
    conditionsContext.update(data);
  };

  function onFinish({ username, password }: any) {
    signIn(username, password);
  }

  return (
    <>
      <Row justify="start">
        <Title level={4}>Sign In</Title>
      </Row>
      <Form
        name="loginForm"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Input your Username' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Input your Password' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignIn;
