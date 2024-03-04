import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Input, Select, Button, notification, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { fetchData, createData } from '../../api/Api';
import { useSelector } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';

const { Option } = Select;
const { Dragger } = Upload;

const AddMenuModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    // Form data for menu item
    const menuItemData = {
      menu: values.category,
      name: values.menuName,
      description: values.description,
      price: values.price,
    };

    try {
      setLoading(true);

      // API call to create menu item
      const menuItemApiUrl = MAIN_URL + '/menu/menu-items/';
      const menuItemResult: any | null = await createData<any>(menuItemApiUrl, menuItemData, token);

      if (menuItemResult !== null) {
        console.log('Menu item creation successful!', menuItemResult);
        notification.success({
          message: 'Registration Successful',
          description: 'Menu item has been registered successfully!',
        });
        console.log(menuItemResult)
        // Add any further actions upon successful creation, e.g., redirect or notify the user

        // Now handle the menu item images
        const menuItemImageData = new FormData();
        menuItemImageData.append('menu_item', menuItemResult.id); // Use the menu item ID obtained from the response

        // Add your image file to the FormData
        menuItemImageData.append('image_url', values.image[0].originFileObj); // Assuming 'image' is the name of your file upload field

        const menuItemImageApiUrl = MAIN_URL + '/menu/menu-item-images/';
        await createData<any>(menuItemImageApiUrl, menuItemImageData, token);

      } else {
        // Handle the case where the menu item creation fails
        console.error('Menu item creation failed:', menuItemResult);
      }
    } catch (error: any) {
      console.error('Error creating menu item:', error);
      notification.success({
        message: 'Registration Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  // Dummy method for image upload (replace with actual implementation)
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
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
            {/* Category dropdown */}
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

            {/* Menu Name input */}
            <Form.Item
              label="Menu Name"
              name="menuName"
              rules={[{ required: true, message: 'Please enter the Menu name' }]}
            >
              <Input min={0} step={0.01} />
            </Form.Item>

            {/* Price input */}
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber min={0} step={0.01} />
            </Form.Item>

            {/* Description input */}
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the Description' }]}
            >
              <Input.TextArea />
            </Form.Item>

            {/* Image upload section */}
            <Form.Item
              label="Menu Item Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                const fileList = e.fileList.slice(-1); // Keep only the last file in the list
                setSelectedFile(fileList[0]?.originFileObj || null); // Set the selected file in state
                return fileList;
              }}
              rules={[{ required: true, message: 'Please upload an image for the menu item' }]}
            >
              <Dragger
                customRequest={dummyRequest}
                accept=".jpg, .jpeg, .png"
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ fontSize: '24px' }} />
                </p>
                {selectedFile && (
                  <p className="ant-upload-hint">Selected file: {selectedFile.name}</p>
                )}
              </Dragger>
            </Form.Item>
            {/* Submit button */}
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
