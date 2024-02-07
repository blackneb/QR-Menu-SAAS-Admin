import React, { useState } from 'react';
import { Tabs } from 'antd';
import ChangePassword from '../profle management/ChangePassword';

const { TabPane } = Tabs;

const tabStyle = { color: '#800020', bordercolor:'#800020' };

const ProfileManagementTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="App">
      <Tabs activeKey={activeTab} onChange={handleTabChange} style={tabStyle}>
        <TabPane tab={<div style={tabStyle}>Change Password</div>} key="1">
          <ChangePassword />
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

export default ProfileManagementTabs;
