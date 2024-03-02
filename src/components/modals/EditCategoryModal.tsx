import React from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';

const EditCategoryModal: React.FC<any> = ({ category, onOk }) => {
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

      <Form form={form} initialValues={category} layout="vertical">
        <Form.Item name="id" label="Category ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="title" label="Category Name" rules={[{ required: true, message: 'Please enter a category name' }]}>
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
          <Checkbox />
        </Form.Item>
      </Form>
  );
};

export default EditCategoryModal;
