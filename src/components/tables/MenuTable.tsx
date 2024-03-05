import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Select, Popconfirm, Tag, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { EditOutlined, EyeOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchData, ApiResponse } from '../../api/Api';
import { useSelector } from 'react-redux';
import { MAIN_URL } from '../../redux/ActionTypes';
import ViewMenuItemModal from '../modals/ViewMenuItemModal';
import EditMenuItemModal from '../modals/EditMenuItemModal';

interface MenuItem {
  id: number;
  menuName: string;
  category: string;
  restaurantId: number;
  price: number;
  image: string;
  status: string;
}

const MenuTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MenuItem[]>([]);
  const [filteredData, setFilteredData] = useState<MenuItem[]>(data);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<MenuItem | null>(null);
  const [previewModalVisible, setPreviewModalVisible] = useState<boolean>(false);
  const [selectedPreviewRecord, setSelectedPreviewRecord] = useState<MenuItem | null>(null);
  const [editMenuItemModalVisible, setEditMenuItemModalVisible] = useState<boolean>(false);

  const token = useSelector((state: any) => state.userInformation.userprofile.token);
  const selectedRestaurantID = useSelector((state: any) => state.selectedRestaurant.id);

    useEffect(() => {
      // Fetch menu items from the API when the component mounts
      const fetchMenuItems = async () => {
        try {
          setLoading(true);
          const apiUrl = MAIN_URL + `menu/restaurants/${selectedRestaurantID}/menu-items`; // Update with your API endpoint
  
          const result: any | null = await fetchData<MenuItem[]>(apiUrl, token);
          
        if (result !== null) {
          setData(result);
          setFilteredData(result);
        }
        } catch (error) {
          console.error('Error fetching menu items:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMenuItems();
    }, []);

    const showPreviewModal = (record: MenuItem) => {
      setPreviewModalVisible(true);
      setSelectedPreviewRecord(record);
    };
  
    const hidePreviewModal = () => {
      setPreviewModalVisible(false);
      setSelectedPreviewRecord(null);
    };
  
    const handleEdit = (record: MenuItem) => {
      setEditModalVisible(true);
      setSelectedRecord(record);
    };
  
    const handleEditModalCancel = () => {
      setEditModalVisible(false);
      setSelectedRecord(null);
    };
  
    const showEditMenuItemModal = (record: MenuItem) => {
      setEditMenuItemModalVisible(true);
      setSelectedRecord(record);
    };
  
    const hideEditMenuItemModal = () => {
      setEditMenuItemModalVisible(false);
      setSelectedRecord(null);
    };
  
    const handleDelete = (record: MenuItem) => {
      // Implement your delete logic here
      console.log('Delete', record);
    };
  
    const confirmDelete = (record: MenuItem) => {
      handleDelete(record);
    };

  const handleSearch = (confirm: any) => {
    confirm();
    setFilteredData(data);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setFilteredData(data);
  };

  const handleRestaurantSelectChange = (value: number | null) => {
    if (value !== null) {
      const filteredItems = data.filter((item) => item.restaurantId === value);
      setFilteredData(filteredItems);
    } else {
      setFilteredData(data);
    }
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(confirm)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8, backgroundColor:"#800020", borderColor:"#800020" }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: { [key: string]: any }) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
          if (searchInput) {
            searchInput.select();
          }
        }, 100);
      }
    },
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: MenuItem, b: MenuItem) => a.id - b.id,
    },
    {
      title: 'Menu Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: MenuItem, b: MenuItem) => a.menuName.localeCompare(b.menuName),
      ...getColumnSearchProps('menuName'),
    },
    {
      title: 'Category',
      dataIndex: 'menu_name',
      key: 'menu_name',
      sorter: (a: MenuItem, b: MenuItem) => a.category.localeCompare(b.category),
      onFilter: (value: string, record: MenuItem) => record.category === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            showSearch
            style={{ width: '100%' }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            onSearch={(value) => setSelectedKeys(value ? [value] : [])}
            filterOption={(input, option: any) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
          </Select>
          <div style={{ marginTop: 8 }}>
            <Button
              type="primary"
              onClick={() => handleSearch(confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: "100%", marginRight: '4%', backgroundColor: "#800020", borderColor: "#800020" }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: '100%', marginTop: 8 }}>
              Reset
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Restaurant',
      dataIndex: 'restaurant_name',
      key: 'restaurant_name',
      render: (restaurantId : number) => (
        <Tag color="purple">{restaurantId}</Tag>
      ),
      sorter: (a: MenuItem, b: MenuItem) => a.restaurantId - b.restaurantId,
      ...getColumnSearchProps('restaurantId'),
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? (
            <>
              <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} />
              Active
            </>
          ) : (
            <>
              <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />
              Inactive
            </>
          )}
        </Tag>
      ),
      sorter: (a: MenuItem, b: MenuItem) => a.status.localeCompare(b.status),
      filters: [
        { text: 'Active', value: 'true' },
        { text: 'Inactive', value: 'false' },
      ],
      onFilter: (value: string, record: MenuItem) => record.status === value,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            style={{ width: '100%' }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            onSearch={(value) => setSelectedKeys(value ? [value] : [])}
            filterOption={(input, option: any) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option key="active" value="true">
              Active
            </Select.Option>
            <Select.Option key="inactive" value="false">
              Inactive
            </Select.Option>
          </Select>
          <div style={{ marginTop: 8 }}>
            <Button
              type="primary"
              onClick={() => handleSearch(confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: '100%', marginRight: '4%', backgroundColor: "#800020", borderColor: "#800020" }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: '100%', marginTop: 8 }}>
              Reset
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Tag color="blue">{price}</Tag>
      ),
      sorter: (a: MenuItem, b: MenuItem) => a.price - b.price,
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Preview',
      key: 'preview',
      render: (record: MenuItem) => (
        <Button
          type="text"
          style={{ color: "#800020" }}
          onClick={() => showPreviewModal(record)}
          icon={<EyeOutlined />}
        />
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (record: MenuItem) => (
        <Button
          type="text"
          style={{ color: 'green' }}
          onClick={() => showEditMenuItemModal(record)}
          icon={<EditOutlined />}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (record: MenuItem) => (
        <Popconfirm
          title="Are you sure you want to delete this menu item?"
          onConfirm={() => confirmDelete(record)}
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
    <div>
      {loading ? (
        <Spin/>
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns as ColumnProps<MenuItem>[]}
          pagination={{ pageSize: 10 }}
          rowKey={(record) => record.id.toString()}
        />
      )}
      <Modal
        title="Edit Menu Item"
        visible={editMenuItemModalVisible} // Corrected variable name
        onCancel={hideEditMenuItemModal}
        footer={[
          <Button key="cancel" onClick={hideEditMenuItemModal}>
            Cancel
          </Button>
        ]}
      >
        <EditMenuItemModal
          menuItem={selectedRecord}
        />
      </Modal>

      <Modal
        title="Preview Menu Item"
        visible={previewModalVisible}
        onCancel={hidePreviewModal}
        footer={[
          <Button key="cancel" onClick={hidePreviewModal}>
            Cancel
          </Button>
        ]}
      >
        {selectedPreviewRecord && (
          <ViewMenuItemModal
          menuItem={selectedPreviewRecord}
        />
        )}
      </Modal>
    </div>
  );
};

export default MenuTable;
