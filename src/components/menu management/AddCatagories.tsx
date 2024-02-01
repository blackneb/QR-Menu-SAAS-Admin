
import React, {useState} from 'react';
import { Form, Input, Button } from 'antd';
import CategoryTable from '../tables/CategoriesTable';


const AddCategories: React.FC = () => {
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
    <section className="flex flex-row mt-8 md:flex-col justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <Form
            name="changePasswordForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
        <Form.Item label="Category Name" name="category" rules={[{ required: true, message: 'Please enter the Category name' }]}>
          <Input min={0} step={0.01} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <Button type="primary" htmlType="submit" style={{background: '#800020', borderColor: '#800020' }} loading={loading}>
            Submit
          </Button>
        </Form.Item>
          </Form>
        </div>
      </div>
      <div className='mt-4 w-full'>
        <CategoryTable/>
      </div>
    </section>
  );
};

export default AddCategories;