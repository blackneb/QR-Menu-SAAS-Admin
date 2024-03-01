// Registration.tsx

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { createData, ApiResponse } from '../../api/Api'; 
import { useSelector } from 'react-redux'; 
interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const onFinish = async (values: any) => {
    try {
      // Extract user data from form values
      const userData = {
        email: values.email,
        password: values.password, // Assuming you have a password field in your form
        restaurant_id: values.restaurant_id, // Change this based on the selected restaurant or your logic
        mobile: values.mobile, // Assuming you have a mobile field in your form
      };

      // Assuming you have the API URL and token
      const apiUrl = 'http://nasjk.pythonanywhere.com/users/register-user';

      // Send the form data to the backend API using createData function
      const response: ApiResponse<any> | null = await createData(apiUrl, userData, token);
      
      // Handle success response (e.g., show a success message)
      console.log('Registration successful:', response);
    } catch (error) {
      // Handle error (already handled in createData function)
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <Form
        name="user registration"
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelCol={{ flex: '150px', span: 30 }}
        labelAlign="left"
        labelWrap
      >
        {/* User Section */}
        <h2 className="text-lg font-bold mb-4" style={{color:"#800020"}}>User Form</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Restaurant ID"
          name="restaurant_id"
          rules={[{ required: true, message: 'Please select a restaurant!' }]}
        >
          {/* Assuming you have a Select component for restaurant_id */}
          {/* Replace with your actual Select component */}
          <Input />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, message: 'Please input your mobile number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor:"#800020", borderColor:"#800020" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
