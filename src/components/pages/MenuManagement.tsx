import React, { useState } from 'react';
import { Tabs } from 'antd';
import MenuList from '../menu management/MenuLists';
import AddMenuModal from '../menu management/AddMenuModal';
import AddCategories from '../menu management/AddCatagories';

const { TabPane } = Tabs;

const tabStyle = { color: '#800020' };

const MenuManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="App">
      <Tabs activeKey={activeTab} onChange={handleTabChange} style={tabStyle}>
        <TabPane tab={<div style={tabStyle}>Menu List</div>} key="1">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <MenuList />
          </div>
        </TabPane>
        <TabPane tab={<div style={tabStyle}>Add Menu</div>} key="2">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <AddMenuModal />
          </div>
        </TabPane>
        <TabPane tab={<div style={tabStyle}>Add Categories</div>} key="3">
          <div style={{ height: '80vh', overflowY: 'auto' }}>
            <AddCategories />
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
