import React, { useState } from 'react';
import { Table, Button, Modal, Tag, Dropdown, Menu, Input } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import resdata from './resdata.json'

interface Restaurant {
  id: number;
  restaurantName: string;
  email: string;
  phone: string;
  address: string;
  managedBy: string;
  status: string;
  dateCreated: string;
}

interface RestaurantsTableProps {
  data: Restaurant[];
}

const Restaurants: React.FC = () => {
  // Assuming you have restaurant data or fetch it from an API
  const data: Restaurant[] = resdata

  const [filteredData, setFilteredData] = useState<Restaurant[]>(data);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Restaurant | null>(null);

  const handleEdit = (record: Restaurant) => {
    setEditModalVisible(true);
    setSelectedRecord(record);
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
      dataIndex: 'restaurantName',
      key: 'restaurantName',
      ...getColumnSearchProps('restaurantName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Managed By',
      dataIndex: 'managedBy',
      key: 'managedBy',
      ...getColumnSearchProps('managedBy'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'} className='flex items-center justify-center w-'>
          {status === 'active' ? (
            <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />
          )}
          {status}
        </Tag>
      ),
      sorter: (a: Restaurant, b: Restaurant) => a.status.localeCompare(b.status),
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      sorter: (a: Restaurant, b: Restaurant) => a.dateCreated.localeCompare(b.dateCreated),
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
    {
      title: 'Delete',
      key: 'delete',
      render: (record: Restaurant) => (
        <Button
          type="text"
          style={{ color: 'red' }}
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
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

export default Restaurants;
