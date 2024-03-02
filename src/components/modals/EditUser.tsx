import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Spin } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';


const EditUser: React.FC<any> = ({ record, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const handleSave = () => {
    setLoading(true);
    // Implement your logic to save the edited user data
    // You can use the form.getFieldsValue() to get the updated values
    setTimeout(() => {
      setLoading(false);
      onCancel(); // Close the modal after saving
    }, 1000); // Simulating an asynchronous save operation
  };

  return (
    <div>
        {loading ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter an email' }]}>
            <Input prefix={<MailOutlined />} type="email" />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile" rules={[{ required: true, message: 'Please enter a mobile number' }]}>
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditUser;
