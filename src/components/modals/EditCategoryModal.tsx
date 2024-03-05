import React, { useState } from 'react';
import { Modal, Form, Input, Checkbox, Button, notification } from 'antd';
import { updateData, ApiResponse } from '../../api/Api';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useSelector } from 'react-redux';

interface Category {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
}

const EditCategoryModal: React.FC<any> = ({ category, onOk }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const token = useSelector((state: any) => state.userInformation.userprofile.token);

  const handleOk = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      const apiUrl = `${MAIN_URL}menu/menus/${values.id}/update/`; // Adjust the endpoint accordingly
      const response: ApiResponse<Category> | null = await updateData<Category>(apiUrl, values, token);

      if (response !== null) {
        console.log('Category updated successfully:', response);
        notification.success({
          message:"Updated Successfully",
          description:"Menu Item Updated Successfully"
        })
        onOk(response.data);
      }
    } catch (error) {
      console.error('Validation failed:', error);
      // Optionally, you can show an error notification here
    } finally {
      setSaving(false);
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
      <Button
        key="save"
        type="primary"
        onClick={handleOk}
        style={{ backgroundColor: "#800020" }}
        loading={saving}
      >
        Save
      </Button>
    </Form>
  );
};

export default EditCategoryModal;
