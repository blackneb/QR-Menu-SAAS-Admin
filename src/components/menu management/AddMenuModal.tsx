import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Input, Select, Button, notification } from 'antd';
import { fetchData, ApiResponse, createData } from '../../api/Api';
import { useSelector } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';

const { Option } = Select;

const AddMenuModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const token = useSelector((state:any) => state.userInformation.userprofile.token);
  const selectedRestaurantID = useSelector((state:any) => state.selectedRestaurant.id)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = MAIN_URL + `/menu/restaurants/${selectedRestaurantID}/menus/`;
        const result: any | null = await fetchData<any[]>(apiUrl, token);

        if (result !== null) {
          setCategoryList(result);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onFinish = async (values: any) => {
    const apiJson = {
      menu: values.category,
      name: values.menuName,
      description: values.description,
      price: values.price,
    };

    try {
      setLoading(true);
      const apiUrl = MAIN_URL + '/menu/menu-items/';
      const result: ApiResponse<any> | null = await createData<any>(apiUrl, apiJson, token);

      if (result !== null) {
        console.log('Menu creation successful!', result);
        notification.success({
          message: 'Registration Successful',
          description: 'Menu Item has been registered successfully!',
        });
        // Add any further actions upon successful creation, e.g., redirect or notify the user
      } else {
        // Handle the case where the menu creation fails
        console.error('Menu creation failed:', result);
      }
    } catch (error: any) {
      console.error('Error creating menu:', error);
      notification.success({
        message: 'Registration Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col mt-8 md:flex-row justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <Form
            name="AddMenuForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select>
                {categoryList.map((category:any) => (
                  <Option key={category.id} value={category.id}>
                    {category.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Menu Name"
              name="menuName"
              rules={[{ required: true, message: 'Please enter the Menu name' }]}
            >
              <Input min={0} step={0.01} />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the Description' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                style={{ background: '#800020', borderColor: '#800020' }}
              >
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
