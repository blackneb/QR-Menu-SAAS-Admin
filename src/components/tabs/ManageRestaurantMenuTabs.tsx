import React from 'react';
import { Tabs } from 'antd';
import MenuList from '../pages/MenuList';
import CategoriesList from '../pages/CategoriesList';

const { TabPane } = Tabs;

interface RegistrationTabsProps {
}

const tabStyle = { color: '#800020', borderColor:"#800020" };


const ManageRestaurantMenuTabs: React.FC<RegistrationTabsProps> = () => {
  return (
    <Tabs defaultActiveKey="1" style={tabStyle}>
      <TabPane tab={<div style={tabStyle}>Menu List</div>} key="1">
        <div style={{ height: '80vh', overflowY: 'auto' }}>
            <MenuList/>
        </div>
      </TabPane>
      <TabPane tab={<div style={tabStyle}>Categories List</div>} key="2">
        <div style={{ height: '80vh', overflowY: 'auto' }}>
            <CategoriesList/>
        </div>
      </TabPane>
      <style>
        {`
          .ant-tabs-ink-bar {
            background-color: #800020 !important;
          }
        `}
      </style>
    </Tabs>
  );
};

export default ManageRestaurantMenuTabs;