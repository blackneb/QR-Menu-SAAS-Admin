import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';


const EditRestaurant: React.FC<any> = ({ record, onCancel }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Set the form values when the record changes
    form.setFieldsValue(record);
  }, [record, form]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      console.log('Form values:', values);
      // Implement your save/update logic here

      // Close the modal
      onCancel();
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  return (

      <Form form={form} layout="vertical">
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="name" label="Restaurant Name" rules={[{ required: true, message: 'Please enter the restaurant name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contact_info" label="Contact Info">
          <Input />
        </Form.Item>
        <Form.Item name="managedBy" label="Managed By">
          <Input disabled/>
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select disabled>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="registrationDate" label="Registration Date">
          <Input disabled/>
        </Form.Item>
      </Form>
  );
};

export default EditRestaurant;
