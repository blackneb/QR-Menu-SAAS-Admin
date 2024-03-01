import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';
import { add_user_information } from '../../redux/Actions';
import axios from 'axios';
import { notification } from 'antd'; 

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const apiUrl =  MAIN_URL + 'users/login';
      const profileApiUrl = MAIN_URL + 'users/profile';
      const apiDataSend = {
        email: values.username,
        password: values.password
      }
      const response = await axios.post(apiUrl, apiDataSend);
      try {
        const res = await axios.get(profileApiUrl, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
            'Content-Type': 'application/json',
          },
        });
        const userInformation = {
          userLogged: true,
          userprofile: response.data,
          profile:res.data
        };
  
          // Dispatch user information to Redux store
          dispatch(add_user_information(userInformation));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } catch (error:any) {
      console.log(error);
      notification.warning({
        message: error.response.data.Message[0],
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  }

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
