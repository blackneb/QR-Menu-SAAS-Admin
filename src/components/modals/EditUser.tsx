import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Spin, notification } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { updateData } from '../../api/Api';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useSelector } from 'react-redux';
interface User {
  id: number;
  username: string;
  email: string;
  mobile: string;
  restaurant_id: number;
  restaurant_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  first_name: string;
  last_name: string;
}

const EditUser: React.FC<any> = ({ record, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state:any) => state.userInformation.userprofile.token)
  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const handleSave = async() => {
    try {
      setLoading(true);
      const apiUrl = MAIN_URL + `users/update-mobile/${record.id}/`; 
      const updatedData = form.getFieldsValue();
      const response: any | null = await updateData<User>(apiUrl, updatedData, token);

      if (response !== null) {
        notification.success({
          message: 'Update Successful',
          description: 'User data has been successfully updated.',
        });
        onCancel();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="ID" rules={[{ required: true, message: 'Please enter an ID' }]}>
            <Input prefix={<UserOutlined />} disabled/>
          </Form.Item>
          <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'Please enter user first name' }]}>
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please enter user last name' }]}>
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter an email' }]}>
            <Input prefix={<MailOutlined />} type="email" disabled />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile" rules={[{ required: true, message: 'Please enter a mobile number' }]}>
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="restaurant_name" label="Restaurant Name" rules={[{ required: true, message: 'Please enter a restaurant name' }]}>
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onCancel} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditUser;
