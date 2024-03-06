import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin, Button, Popconfirm,Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { fetchData } from '../../api/Api';
import { useSelector, useDispatch } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditCategoryModal from '../modals/EditCategoryModal';
import { add_categories } from '../../redux/Actions';


interface MenuItem {
  id: number;
  restaurant: number;
  title: string;
  description: string;
  is_active: boolean;
  restaurant_id: number;
}

const CategoryTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state:any) => state.categories)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<MenuItem | null>(null);

  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const selectedRestaurantID = useSelector((state: any) => state.selectedRestaurant.id);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const apiUrl = MAIN_URL +  `menu/restaurants/${selectedRestaurantID}/menus/`;
      const result: any | null = await fetchData<MenuItem[]>(apiUrl, token);

      if (result !== null) {
        dispatch(add_categories(result))
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (record: MenuItem) => {
    setSelectedCategory(record);
    setEditModalVisible(true);
  };

  const handleDelete = (record: MenuItem) => {
    // Implement your delete logic here
    console.log('Delete', record);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedCategory(null);
  };

  const handleEditModalOk = (updatedCategory: MenuItem) => {
    // Handle the update logic here
    console.log('Updated Category:', updatedCategory);

    // Close the modal
    setEditModalVisible(false);
    setSelectedCategory(null);
  };


  const columns: ColumnsType<MenuItem> = [
    {
      title: 'Category ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Category Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active: boolean) => (
        <Tag color={is_active ? 'green' : 'red'}>
          {is_active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (record: MenuItem) => (
        <Button type="text" icon={<EditOutlined />} style={{ color: 'green' }} onClick={() => handleEdit(record)} />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (record: MenuItem) => (
        <Popconfirm
          title="Are you sure you want to delete this menu item?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          okButtonProps={{ style: { background: '#800020', color: 'white', borderColor: '#800020' } }}
          cancelText="No"
        >
          <Button
            style={{ color: 'red' }}
            type="text"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }} />
      <Modal
        title="Edit Category"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={[
          <Button key="cancel" onClick={handleEditModalCancel}>
            Cancel
          </Button>
        ]}
      >
        <EditCategoryModal
          category={selectedCategory}
          visible={editModalVisible}
          onCancel={handleEditModalCancel}
          onOk={handleEditModalOk}
          fetchCategories={fetchCategories}
        />
      </Modal>
      
    </Spin>
  );
  
};

export default CategoryTable;
