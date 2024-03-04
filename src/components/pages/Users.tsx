import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tag, Dropdown, Menu, Input,Spin } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';
import { fetchData, ApiResponse } from '../../api/Api';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useSelector } from 'react-redux';
import EditUser from '../modals/EditUser';
import ViewUser from '../modals/ViewUser';

interface User {
  id: number;
  username: string;
  email: string;
  mobile: string;
  restaurant_id: number;
  restaurant_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;  // Added is_active field
  first_name: string;
  last_name: string;
}
// interface UsersTableProps {
//   data: User[];
// }

const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<User | null>(null);
  const token = useSelector((state: any) => state.userInformation.userprofile.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = MAIN_URL + 'users/restaurantadmins/';
        const result: any | null = await fetchData<User[]>(apiUrl, token);

        if (result !== null) {
          setData(result);
          setFilteredData(result);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const handleEdit = (record: User) => {
    setEditModalVisible(true);
    setSelectedRecord(record);
  };

  const handleView = (record: User) => {
    setViewModalVisible(true);
    setSelectedRecord(record);
  };

  const handleAdd = () => {
    setAddModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
    setSelectedRecord(null);
  };

  const handleAddModalCancel = () => {
    setAddModalVisible(false);
  };

  const handleDelete = (record: User) => {
    // Implement your delete logic here
    console.log('Delete', record);
  };

  const confirmDelete = (record: User) => {
    handleDelete(record);
  };

  const handleAction = (action: string, record: User) => {
    // Implement the logic based on the selected action (activate or deactivate)
    console.log(`Performing "${action}" action on user with ID ${record.id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: User, b: User) => a.id - b.id,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      ...getColumnSearchProps('mobile'),
    },
    {
      title: 'Restaurant Name',
      dataIndex: 'restaurant_name',
      key: 'restaurant_name',
      render: (restaurant_name: string) => (
        <Tag color="purple" className='flex items-center justify-center'>
          {restaurant_name}
        </Tag>
      ),
      ...getColumnSearchProps('restaurantName'),
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'status',
      render: (is_active: boolean) => (
        <Tag color={is_active ? 'green' : 'red'} className='flex items-center justify-center'>
          {is_active ? <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} /> : <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />}
          {is_active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Is Staff',
      dataIndex: 'is_staff',
      key: 'is_staff',
      render: (is_staff: boolean) => (
        <Tag color={is_staff ? 'green' : 'red'} className='flex items-center justify-center'>
          {is_staff ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Is Superuser',
      dataIndex: 'is_superuser',
      key: 'is_superuser',
      render: (is_superuser: boolean) => (
        <Tag color={is_superuser ? 'green' : 'red'} className='flex items-center justify-center'>
          {is_superuser ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'View',
      key: 'view',
      render: (record: User) => (
        <Button
          type="text"
          style={{ color: '#800020' }}
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        />
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (record: User) => (
        <Button
          type="text"
          style={{ color: 'green' }}
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: User) => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleAction(key as string, record)}>
              <Menu.Item key="activate">Activate</Menu.Item>
              <Menu.Item key="deactivate">Deactivate</Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<DownOutlined />} />
        </Dropdown>
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
            onChange={(e:any) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
      prevData.filter((record:any) =>
        record[dataIndex].toString().toLowerCase().includes(dataIndex.toLowerCase())
      )
    );
  }

  function handleReset(clearFilters: any, dataIndex: string) {
    clearFilters();
    setFilteredData(data);
  }

  
  return (
    <div>
      {loading ? (
        <Spin/>
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey={(record) => record.id.toString()}
        />
      )}
      <Modal
        title="Edit User"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={[
          <Button key="cancel" onClick={handleEditModalCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" style={{ background: '#800020', borderColor: '#800020' }}>
            Save
          </Button>,
        ]}
      >
        <EditUser record={selectedRecord} onCancel={handleEditModalCancel} />
      </Modal>

      <Modal
        title="View User"
        visible={viewModalVisible}
        onCancel={handleViewModalCancel}
        footer={[
          <Button key="cancel" onClick={handleViewModalCancel}>
            Close
          </Button>,
        ]}
      >
        <ViewUser record={selectedRecord} onCancel={handleViewModalCancel} />
      </Modal>

      
    </div>
  );
};

export default Users;