// Registration.tsx

import React from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const { Option } = Select;

  const onFinish = (values: any) => {
    // Handle registration logic here
    console.log('Received values:', values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: false,
      showDownloadIcon: false,
    },
    beforeUpload: (file: any) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return isImage;
    },
  };

  return (
    <div className="container mx-auto mt-10">
      <Form
        name="registration"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
      >
        <h2 className="text-lg font-bold mb-4">User Form</h2>
        <Form.Item
          label="First Name"
          name={['users', 'firstName']}
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={['users', 'lastName']}
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={['users', 'email']}
          rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}
        >
          <Input />
        </Form.Item>
        {/* Add other user fields as needed */}
        <Form.Item
          label="User Image"
          name={['users', 'image']}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* Restaurant Section */}
        <h2 className="text-lg font-bold mt-6 mb-4">Restaurant Form</h2>
        <Form.Item
          label="Restaurant Name"
          name={['restaurant', 'restaurantName']}
          rules={[{ required: true, message: 'Please input the restaurant name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={['restaurant', 'email']}
          rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}
        >
          <Input />
        </Form.Item>
        {/* Add other restaurant fields as needed */}
        <Form.Item
          label="Restaurant Image"
          name={['restaurant', 'image']}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
