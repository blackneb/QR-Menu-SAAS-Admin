import React, { useState } from 'react';
import { Modal, Form, Input, Checkbox, Button, notification } from 'antd';
import { updateData } from '../../api/Api';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useSelector } from 'react-redux';

const EditMenuItemModal: React.FC<any> = ({ menuItem, visible, onCancel, onOk, fetchMenuItems }) => {
  const [form] = Form.useForm();
  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const [saving, setSaving] = useState(false);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const apiUrl = `${MAIN_URL}menu/menu-items/${values.id}/update/`; // Adjust the endpoint accordingly
      const response: any | null = await updateData(apiUrl, values, token);

      if (response !== null) {
        console.log('Menu item updated successfully:', response);
        fetchMenuItems();
        notification.success({
          message:"Updated Successfully",
          description:"Menu Item Updated Successfully"
        })
        // Optionally, you can perform additional actions or show a success notification here
      }
    } catch (error) {
      console.error('Validation failed:', error);
      // Optionally, you can show an error notification here
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
        <Form.Item name="name" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter a Price' }]}>
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
        <Button
          key="save"
          type="primary"
          onClick={handleOk}
          style={{ backgroundColor: "#800020" }}
          loading={saving} // Set loading to true when saving
        >
          Save
        </Button>
      </Form>
  );
};

export default EditMenuItemModal;
