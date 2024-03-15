import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import CategoryTable from '../tables/CategoriesTable';
import { useSelector, useDispatch } from 'react-redux';
import { createData, ApiResponse } from '../../api/Api';
import { MAIN_URL } from '../../redux/ActionTypes';
import { fetchData } from '../../api/Api';
import { add_categories } from '../../redux/Actions';

const AddCategories: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const selectedRestaurantID = useSelector((state: any) => state.selectedRestaurant.id);
  const token = useSelector((state:any) => state.userInformation.userprofile.token)
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const apiUrl = MAIN_URL +  `menu/restaurants/${selectedRestaurantID}/menus/`;
      const result: any | null = await fetchData<any[]>(apiUrl, token);

      if (result !== null) {
        dispatch(add_categories(result))
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const onFinish = async (values: any) => {
    const apiJson = {
      title: values.categoryName,
      description: values.description,
      is_active: values.isActive,
      restaurant_id: selectedRestaurantID,
    };

    try {
      setLoading(true);
      const apiUrl = MAIN_URL + 'menu/menus/'; 

      const result: ApiResponse<any> | null = await createData(apiUrl, apiJson, token);

      if (result !== null) {
        fetchCategories()
        notification.success({
          message: 'Registration Successful',
          description: 'Category has been registered successfully!',
        });

      }
    } catch (error: any) {
      console.error('Category creation failed:', error.message);
      notification.error({
        message: 'Registration Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-row mt-8 md:flex-col justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <Form
            name="addCategoryForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item
              label="Category Name"
              name="categoryName"
              rules={[{ required: true, message: 'Please enter the Category name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the Description' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Is Active"
              name="isActive"
              valuePropName="checked"
              rules={[{ required: true, message: 'Please enter the Description' }]}
            >
              <Checkbox />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: '#800020', borderColor: '#800020' }}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="mt-4 w-full">
        <CategoryTable />
      </div>
    </section>
  );
};

export default AddCategories;
