import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { updateData } from '../../api/Api';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useSelector } from 'react-redux';

const EditRestaurant: React.FC<any> = ({ record, onCancel, fetchRestaurantData }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const token = useSelector((state: any) => state.userInformation.userprofile.token);

  useEffect(() => {
    // Set the form values when the record changes
    form.setFieldsValue(record);
  }, [record, form]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      const apiUrl = `${MAIN_URL}restorant/update-restaurant-details/${values.id}/`; // Adjust the endpoint accordingly
      const response: any | null = await updateData(apiUrl, values, token);

      if (response !== null) {
        console.log('Restaurant details updated successfully:', response);
        fetchRestaurantData();
        // Display success notification
        notification.success({
          message: 'Update Successful',
          description: 'Restaurant details have been successfully updated.',
        });

        onCancel(); // Close the modal
      }
    } catch (error) {
      console.error('Error saving data:', error);

      // Display error notification
      notification.error({
        message: 'Update Failed',
        description: 'Failed to update restaurant details. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Edit Restaurant"
      visible={true} // Ensure the visibility is managed by the parent component
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={saving} style={{ background: '#800020', borderColor: '#800020' }}>
          Save
        </Button>,
      ]}
    >
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
        <Form.Item name="url" label="URL" rules={[{ required: true, message: 'Please enter the URL' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRestaurant;
