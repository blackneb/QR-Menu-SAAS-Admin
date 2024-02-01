import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add_user_information } from '../../redux/Actions';


const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log(values);

    try {
      setLoading(true);
      // Add your authentication logic here, e.g., make an API request
      // Simulate a delay for demonstration purposes (remove in a real application)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const json = {
        userLogged: true,
        username: "Jhon Doe",
      };

      dispatch(add_user_information(json));
      console.log('Authentication successful!');
    } catch (error: any) {
      console.error('Authentication failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full" style={{ height: "80vh" }}>
      <Card title="Login" style={{ maxWidth: '400px', width: '100%' }}>
        <Form name="login-form" initialValues={{ remember: true }} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <a href="/forgot-password" style={{ color: 'black' }}>
              Forgot Password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', background: '#800020', borderColor: '#800020' }}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>

          <div className="flex items-center w-full justify-between h-8">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="mr-2">Don't have an account? </div>
              <div>
                <Button type="text" style={{ color: '#800020', fontWeight: 'bold' }} onClick={() => navigate("/createaccount")}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
