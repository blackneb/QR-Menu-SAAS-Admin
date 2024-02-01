
import React, {useState} from 'react';
import { Form, InputNumber,Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddMenuModal: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values: any) => {
        console.log(values)
        try {
          setLoading(true);
          // Add your account creation logic here, e.g., make an API request
          // Simulate a delay for demonstration purposes (remove in a real application)
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log('Account creation successful!');
        } catch (error: any) {
          console.error('Account creation failed:', error.message);
        } finally {
          setLoading(false);
        }
      };
    
      const normFile = (e:any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
  return (
    <section className="flex flex-col mt-8 md:flex-row justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <Form
            name="changePasswordForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please enter the Category name' }]}>
              <Select>
                <Option value="dish1">Dish 1</Option>
                <Option value="dish2">Dish 2</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Meny Name" name="menuName" rules={[{ required: true, message: 'Please enter the Menu name' }]}>
              <Input min={0} step={0.01} />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item label="Image" name="image" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please enter the price' }]}>
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
              <Button type="primary" loading={loading} htmlType="submit" style={{background: '#800020', borderColor: '#800020' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddMenuModal;

