import React from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';

const EditMenuItemModal: React.FC<any> = ({ menuItem, visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Call the onOk function with the updated values
      onOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Form
        form={form} 
        initialValues={menuItem}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        labelAlign="left"
        style={{ maxWidth: 600 }}
    >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="restaurant_name" label="Restaurant">
          <Input disabled />
        </Form.Item>
        <Form.Item name="menu_name" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="is_active"
          label="Is Active"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please specify the active state' }]}
        >
          <Checkbox/>
        </Form.Item>
      </Form>
  );
};

export default EditMenuItemModal;
