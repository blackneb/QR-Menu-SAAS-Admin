import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createData, ApiResponse } from '../../api/Api'; 
import { useSelector } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';

interface RegistrationProps {}

const RestaurantRegistration: React.FC<RegistrationProps> = () => {
  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // Extract restaurant data from form values
      const restaurantData = {
        name: values.name,
        address: values.address,
        contact_info: values.phone,
        logo_url: values.image[0].response.url,  // Assuming your backend returns the URL after successful upload
        url: values.url,
      };

      // Assuming you have the API URL and token
      const apiUrl = MAIN_URL + 'restorant/add-restorant/';

      // Send the form data to the backend API using createData function
      const response: ApiResponse<any> | null = await createData(apiUrl, restaurantData, token);
      
      // Handle success response (e.g., show a success message)
      if (response !== null) {
        // Display success notification
        notification.success({
          message: 'Registration Successful',
          description: 'Restaurant has been registered successfully!',
        });
      }
      notification.success
    } catch (error) {
      // Handle error (already handled in createData function)
      console.error('Registration failed:', error);
    }finally{
      setLoading(false)
    }
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
    <div className="container mx-auto">
      <Form
        name="registration"
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelCol={{ flex: '150px', span: 30 }}
        labelAlign="left"
        labelWrap
      >
        {/* Restaurant Section */}
        <h2 className="text-lg font-bold mb-4" style={{ color:"#800020" }}>Restaurant Form</h2>
        <Form.Item
          label="Restaurant Name"
          name="name"
          rules={[{ required: true, message: 'Please input the restaurant name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the restaurant address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Restaurant Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please Upload image!' }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Website URL"
          name="url"
          rules={[{ required: true, message: 'Please input the restaurant website URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" loading={loading} htmlType="submit" style={{ backgroundColor:"#800020", borderColor:"#800020" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RestaurantRegistration;
