import React from 'react';
import { Tabs } from 'antd';
import Restaurants from '../pages/Restaurants';

const { TabPane } = Tabs;

interface RegistrationTabsProps {
}

const tabStyle = { color: '#800020', borderColor:"#800020" };


const RestaurantsTabs: React.FC<RegistrationTabsProps> = () => {
  return (
    <Tabs defaultActiveKey="1" style={tabStyle}>
      <TabPane tab={<div style={tabStyle}>Restaurants</div>} key="1">
        <div style={{ height: '80vh', overflowY: 'auto' }}>
            <Restaurants/>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default RestaurantsTabs;