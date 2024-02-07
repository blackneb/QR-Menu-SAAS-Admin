import React, { useState } from 'react';
import { Tabs } from 'antd';
import Registration from '../pages/Registration';
import RestaurantRegistration from '../pages/RestaurantRegistration';

const { TabPane } = Tabs;

interface RegistrationTabsProps {
}

const tabStyle = { color: '#800020', bordercolor:'#800020' };


const RegistrationTabs: React.FC<RegistrationTabsProps> = () => {
    const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className="App">
      <Tabs activeKey={activeTab} onChange={handleTabChange} style={tabStyle}>
        <TabPane tab={<div style={tabStyle}>User Registration</div>} key="1">
          <Registration />
        </TabPane>
        <TabPane tab={<div style={tabStyle}>Restaurant Registration</div>} key="2">
          <RestaurantRegistration />
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

export default RegistrationTabs;
