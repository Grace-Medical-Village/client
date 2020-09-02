import React, { useContext, useState } from 'react';
import { Button, Form, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.css';

const { Title } = Typography;

function SignIn() {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  async function signIn() {
    try {
      const user = await true; // TODO
      console.log(username, password);
      if (user) {
        authCtx.update({ authenticated: true, username });
        history.push('/dashboard');
      }
    } catch (error) {
      console.error('error signing in', error);
    }
  }

  const onFinish = ({ username, password }: any) => {
    setUsername(username);
    setPassword(password);
    signIn();
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
