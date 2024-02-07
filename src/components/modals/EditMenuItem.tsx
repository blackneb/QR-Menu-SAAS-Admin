import { useState } from 'react'
import { Form, Input, Button, InputNumber } from 'antd';

const EditMenuItem = ({selectedRecord}:any) => {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values: any) => {
        console.log(values)
        console.log(selectedRecord)
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
    
  return (
    <section className="flex flex-col mt-8 md:flex-row justify-center items-center">
      <div className="bg-white px-8 flex items-center rounded-2xl justify-center w-full">
        <div className="w-full h-100">
          <Form
            name="EditMenuItemForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item
              label="Id"
              name="id"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Menu Name"
              name="menuName"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
            >
              <InputNumber />
            </Form.Item>



            <Form.Item>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#800020',
                    width: '180px',
                    borderColor: '#800020',
                  }}
                  loading={loading}
                >
                  {loading ? 'Updating' : 'Update'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default EditMenuItem
