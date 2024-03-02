import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { fetchData, ApiResponse } from '../../api/Api';
import { useSelector } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';

interface MenuItem {
  id: number;
  restaurant: number;
  title: string;
  description: string;
  is_active: boolean;
  restaurant_id: number;
}

const CategoryTable: React.FC = () => {
  const [data, setData] = useState<MenuItem[]>([]);
  const token = useSelector((state:any) => state.userInformation.userprofile.token)
  const selectedRestaurantID = useSelector((state:any) => state.selectedRestaurant.id)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace 'apiUrl' with your actual API endpoint
        const apiUrl = MAIN_URL +  `/menu/restaurants/${selectedRestaurantID}/menus/`;
        const result: any | null = await fetchData<MenuItem[]>(apiUrl, token);

        if (result !== null) {
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
  ];

  return <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }} />;
};

export default CategoryTable;
