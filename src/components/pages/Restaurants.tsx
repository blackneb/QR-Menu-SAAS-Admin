import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tag, Input } from 'antd';
import { SearchOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchData } from '../../api/Api'; 
import { useSelector } from 'react-redux';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  contact_info: string;
  managedBy: string;
  status: string;
  registrationDate: string;
}

interface ApiResponse<T> {
  data: T;
}

const Restaurants: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<Restaurant[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Restaurant | null>(null);
  const [searchInput, setSearchInput] = useState<string>(''); // Add selectedKeys state
  const token = useSelector((state: any) => state.userInformation.userprofile.token);

  const handleEdit = (record: Restaurant) => {
    setEditModalVisible(true);
    setSelectedRecord(record);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  function getColumnSearchProps(dataIndex: string) {
    return {
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
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
    setFilteredData((prevData: any) =>
      prevData.filter((record: any) =>
        record[dataIndex].toString().toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }

  function handleReset(clearFilters: any, dataIndex: string) {
    clearFilters();
    setFilteredData(data);
  }

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
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
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
    {
      title: 'Managed By',
      dataIndex: 'managedBy',
      key: 'managedBy',
      ...getColumnSearchProps('managedBy'),
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
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      sorter: (a: Restaurant, b: Restaurant) => a.registrationDate.localeCompare(b.registrationDate),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (record: Restaurant) => (
        <Button
          type="text"
          style={{ color: 'green' }}
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const apiUrl = 'http://nasjk.pythonanywhere.com/restorant/add-restorant/';
  
      try {
        const result: ApiResponse<Restaurant[]> = await fetchData<Restaurant[]>(apiUrl, token);
  
        if (result && result.data) {
          setData(result.data);
        }
      } catch (error) {
        // Handle error, e.g., log or show a notification
        console.error("Error fetching restaurant data:", error);
      }
    };
  
    fetchRestaurantData();
  }, [token]);

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
      >
        {/* Add your EditRestaurant component or form here */}
        {/* For example: <EditRestaurantForm record={selectedRecord} onCancel={handleEditModalCancel} /> */}
      </Modal>
    </div>
  );
};

export default Restaurants;
