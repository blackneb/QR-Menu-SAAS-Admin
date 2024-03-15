import React, {useState} from 'react';
import { Form, Input, Button, notification } from 'antd';
import { createData, ApiResponse } from '../../api/Api'; 
import { useSelector } from 'react-redux'; 
import { MAIN_URL } from '../../redux/ActionTypes';
interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // Extract user data from form values
      // Assuming you have the API URL and token
      const apiUrl = MAIN_URL + 'users/register-user';

      // Send the form data to the backend API using createData function
      const response: ApiResponse<any> | null = await createData(apiUrl, values, token);
      if (response !== null) {
        // Display success notification
        notification.success({
          message: 'Registration Successful',
          description: 'User has been registered successfully!',
        });
      }
      // Handle success response (e.g., show a success message)
    } catch (error) {
      // Handle error (already handled in createData function)
      console.error('Registration failed:', error);
    }
    finally{
      setLoading(false)
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
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
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
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor:"#800020", borderColor:"#800020" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
