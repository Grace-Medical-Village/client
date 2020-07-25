// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Button, Form, Input, Row, Typography } from 'antd';
import { Auth } from 'aws-amplify';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import '../styles/sign-in.css';

const { Title } = Typography;

function SignIn() {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      signIn();
    }
  }, [username, password]);

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
      if (user) {
        authCtx.update({ authenticated: true, username });
        history.push('/dashboard');
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const onFinish = ({ username, password }: any) => {
    setUsername(username);
    setPassword(password);
  };

  return (
    <>
      <Row justify="start">
        <Title level={4}>Please sign in</Title>
      </Row>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
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
