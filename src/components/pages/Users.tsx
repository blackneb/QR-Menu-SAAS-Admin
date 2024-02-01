import React, { useState } from 'react';
import { Table, Button, Modal, Tag, Dropdown, Menu, Input } from 'antd';
import dataJson from './data.json'
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  registeredAt: string;
  restaurantName: string;
}

interface UsersTableProps {
  data: User[];
}

const Users: React.FC = () => {
  const data = dataJson;
  const [filteredData, setFilteredData] = useState<User[]>(data);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<User | null>(null);

  const handleEdit = (record: User) => {
    setEditModalVisible(true);
    setSelectedRecord(record);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
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
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'} className='flex items-center justify-center'>
          {status === 'active' ? (
            <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />
          )}
          {status}
        </Tag>
      ),
      sorter: (a: User, b: User) => a.status.localeCompare(b.status),
    },
    {
      title: 'Registered At',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      sorter: (a: User, b: User) => a.registeredAt.localeCompare(b.registeredAt),
    },
    {
      title: 'Restaurant Name',
      dataIndex: 'restaurantName',
      key: 'restaurantName',
      ...getColumnSearchProps('restaurantName'),
    },
    {
      title: 'View',
      key: 'view',
      render: (record: User) => (
        <Button
          type="text"
          style={{ color: '#800020' }}
          icon={<EyeOutlined />}
          // Add the logic to handle view action here
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
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id.toString()}
      />
      <Modal
        title="Edit User"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        // Add any additional properties or styling as needed
      >
        {/* Add your EditUser component or form here */}
      </Modal>
    </div>
  );
};

export default Users;