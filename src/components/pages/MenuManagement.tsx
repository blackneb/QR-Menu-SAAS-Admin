// MenuManagement.tsx
import React, { useState } from 'react';
import { Tabs } from 'antd';
import MenuList from '../menu management/MenuLists';
import AddMenuModal from '../menu management/AddMenuModal';
import AddCategories from '../menu management/AddCatagories';
import RestaurantQrCode from '../menu management/RestaurantQrCode';

const { TabPane } = Tabs;

const tabStyle = { color: '#800020' };

const MenuManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [menuListKey, setMenuListKey] = useState(1);
  const [addMenuKey, setAddMenuKey] = useState(1);
  const [addCategoriesKey, setAddCategoriesKey] = useState(1);
  const [qrCodeKey, setQrCodeKey] = useState(1); 

  const handleTabChange = (key: string) => {
    setActiveTab(key);

    // Increment the key to force remount and refresh
    switch (key) {
      case '1':
        setMenuListKey((prevKey) => prevKey + 1);
        break;
      case '2':
        setAddMenuKey((prevKey) => prevKey + 1);
        break;
      case '3':
        setAddCategoriesKey((prevKey) => prevKey + 1);
        break;
      case '4':
        setQrCodeKey((prevKey) => prevKey + 1); 
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Tabs activeKey={activeTab} onChange={handleTabChange} style={tabStyle}>
        <TabPane tab={<div style={tabStyle}>Menu List</div>} key="1">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <MenuList key={menuListKey} />
          </div>
        </TabPane>
        <TabPane tab={<div style={tabStyle}>Add Menu</div>} key="2">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <AddMenuModal key={addMenuKey} />
          </div>
        </TabPane>
        <TabPane tab={<div style={tabStyle}>Add Categories</div>} key="3">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <AddCategories key={addCategoriesKey} />
          </div>
        </TabPane>
        <TabPane tab={<div style={tabStyle}>QR Code</div>} key="4">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <RestaurantQrCode key={qrCodeKey} />
          </div>
        </TabPane>
      </Tabs>
      <style>
        {`
          .ant-tabs-ink-bar {
            background-color: #800020 !important;
          }
        `}
      </style>
    </div>
  );
};

export default MenuManagement;
