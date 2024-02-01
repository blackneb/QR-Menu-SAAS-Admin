import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateAccount: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log(values)
    try {
      setLoading(true);
      // Add your account creation logic here, e.g., make an API request
      // Simulate a delay for demonstration purposes (remove in a real application)
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Account creation successful!');
    } catch (error: any) {
      console.error('Account creation failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_: any, value: string) => {
    // Password must be at least 8 characters and include at least one capital letter, one small letter, one number, and one special character
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Password does not meet the required criteria.');
  };

  const validateName = (fieldName: string, value: string) => {
    // Name should not contain numbers or special characters
    const regex = /^[a-zA-Z]+$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(`${fieldName} should only contain letters.`);
  };

  const validatePhone = (_: any, value: string) => {
    // Phone number should start with "+251" and have a length of 9
    const regex = /^\+251\d{9}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid phone number starting with +251 and having a length of 9.');
  };

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '80vh', marginTop:'20px' }}>
      <Card title="Create Account" style={{ minWidth: '320px' }}>
        <Form name="create-account-form" onFinish={onFinish}>
          <Form.Item
            name="firstname"
            validateStatus={loading ? 'validating' : 'success'}
            rules={[
              { required: true, message: 'Please input your first name!' },
              { validator: (_, value) => validateName('First Name', value) },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            validateStatus={loading ? 'validating' : 'success'}
            rules={[
              { required: true, message: 'Please input your last name!' },
              { validator: (_, value) => validateName('Last Name', value) },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="username"
            validateStatus={loading ? 'validating' : ''}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            validateStatus={loading ? 'validating' : 'success'}
            rules={[
              { required: true, type: 'email', message: 'Please input a valid email address!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            validateStatus={loading ? 'validating' : 'success'}
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { validator: validatePhone },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="password"
            validateStatus={loading ? 'validating' : 'error'}
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmpassword"
            validateStatus={loading ? 'validating' : 'error'}
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', background: '#800020', borderColor: '#800020' }}
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              style={{ width: '100%', marginBottom: '8px', borderColor: '#800020', color: '#800020' }}
              onClick={()=>{ navigate("/login") }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateAccount;
