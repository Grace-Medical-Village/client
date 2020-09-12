import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { message, Button, Form, Input, Row, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import './styles.css';

const { Title } = Typography;

function SignIn() {
  const authCtx = useContext(AuthContext);
  let history = useHistory();

  async function signIn(usernameEntered: string, passwordEntered: string) {
    try {
      const user = await Auth.signIn(usernameEntered, passwordEntered);
      const { username } = user;
      authCtx.update({ authenticated: true, username });
      history.push('/patient');
    } catch (e) {
      console.log(e);
      message.error('Login Credentials are Incorrect');
    }
  }

  function onFinish({ username, password }: any) {
    signIn(username, password);
  }

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
