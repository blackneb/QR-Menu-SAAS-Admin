import React from 'react';
import { Tabs } from 'antd';
import Users from './Users';

const { TabPane } = Tabs;

interface RegistrationTabsProps {
}

const tabStyle = { color: '#800020', bordercolor:'#800020' };


const UserTabs: React.FC<RegistrationTabsProps> = () => {
  return (
    <Tabs defaultActiveKey="1" style={tabStyle}>
      <TabPane tab={<div style={tabStyle}>Users List</div>} key="1">
        <div style={{ height: '80vh', overflowY: 'auto' }}>
            <Users/>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default UserTabs;