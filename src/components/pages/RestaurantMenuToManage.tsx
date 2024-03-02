import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tag, Input } from 'antd';
import { SearchOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchData, ApiResponse } from '../../api/Api'; 
import { useSelector, useDispatch } from 'react-redux';
import { add_selected_restaurant } from '../../redux/Actions';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useNavigate } from 'react-router-dom';

interface Restaurant {
  id: number;
  restaurantName: string;
  email: string;
  status: string;
  dateCreated: string;
}

const RestaurantMenuToManage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const [data, setData] = useState<Restaurant[]>([]);
  const [filteredData, setFilteredData] = useState<Restaurant[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const apiUrl = MAIN_URL + 'restorant/add-restorant/';
      try {
        const result: any | null = await fetchData<Restaurant[]>(apiUrl, token);
        
        if (result !== null) {
          setData(result);
        }
      } catch (error) {
        // Handle error, e.g., log or show a notification
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurantData();
  }, [token]);

  const handleEdit = (record: Restaurant) => {
    setEditModalVisible(true);
    setSelectedRecord(record);
  };

  const handleEditMenu = (record: Restaurant) => {
    // Dispatch the selected restaurant to Redux store
    dispatch(add_selected_restaurant(record));
  
    // Navigate to the edit menu page
    navigate(`/restaurants/${record.id}`);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleDelete = (record: Restaurant) => {
    // Implement your delete logic here
    console.log('Delete', record);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: Restaurant, b: Restaurant) => a.id - b.id,
    },
    {
      title: 'Restaurant Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('restaurantName'),
    },
    {
      title: 'Contact Info',
      dataIndex: 'contact_info',
      key: 'contact_info',
      ...getColumnSearchProps('contact_info'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => (
        <Tag color="green" className='flex items-center justify-center w-'>
          <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} />
          Active
        </Tag>
      ),
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status: string) => (
    //     <Tag color={status === 'active' ? 'green' : 'red'} className='flex items-center justify-center w-'>
    //       {status === 'active' ? (
    //         <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} />
    //       ) : (
    //         <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />
    //       )}
    //       {status}
    //     </Tag>
    //   ),
    //   sorter: (a: Restaurant, b: Restaurant) => a.status.localeCompare(b.status),
    // },
    {
      title: 'Edit Menu',
      key: 'edit',
      render: (record: Restaurant) => (
        <Button
        type="text"
        style={{ color: 'green' }}
        icon={<EditOutlined />}
        onClick={() => handleEditMenu(record)}
      />
      ),
    },
  ];

  function getColumnSearchProps(dataIndex: string) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters, dataIndex)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value: any, record: { [key: string]: any }) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    };
  }

  function handleSearch(confirm: any, dataIndex: string) {
    confirm();
    setFilteredData((prevData) =>
      prevData.filter((record: any) =>
        record[dataIndex].toString().toLowerCase().includes(dataIndex.toLowerCase())
      )
    );
  }

  function handleReset(clearFilters: any, dataIndex: string) {
    clearFilters();
    setFilteredData(data.filter(record => record.status === 'active'));
  }

  return (
    <div>
      <Table
        dataSource={filteredData.length > 0 ? filteredData : data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id.toString()}
      />
      <Modal
        title="Edit Restaurant"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        // Add any additional properties or styling as needed
      >
        {/* Add your EditRestaurant component or form here */}
      </Modal>
    </div>
  );
};

export default RestaurantMenuToManage;
