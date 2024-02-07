import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  FormOutlined,
  ProfileOutlined,
  LineChartOutlined,
  BellOutlined,
} from '@ant-design/icons';
import Navbar from '../navbar/Navbar';
import Routing from '../routing/Routing';
import { useSelector } from 'react-redux';
import RegistrationTabs from '../pages/RegistrationTabs';
import RestaurantsTabs from '../pages/RestaurantsTabs';
import UserTabs from '../pages/UserTabs';
import ProfileManagementTabs from '../pages/ProfileManagementTabs';

const { Header, Sider, Content } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1'); // Default selected menu item
  const userLoggedIn = useSelector((state: any) => state.userInformation.userLogged);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key: string) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <UserTabs/>;
      case '2':
        return <RestaurantsTabs/>;
      case '3':
        return < RegistrationTabs/>;
      case '4':
        return <ProfileManagementTabs/>;
      case '5':
        return <div>Content for Analytics</div>;
      case '6':
        return <div>Content for Notifications</div>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="site-layout-background p-0 bg-white shadow-md">
        <Navbar />
      </Header>
      {userLoggedIn === undefined && (
        <>
          <Routing />
        </>
      )}
      {userLoggedIn && (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ background: 'white' }}
          >
            <div className="trigger-icon" onClick={toggleCollapsed}>
              {collapsed ? (
                <MenuUnfoldOutlined className="text-2xl p-4" style={{ color: '#800020' }} />
              ) : (
                <MenuFoldOutlined className="text-2xl p-4" style={{ color: '#800020' }} />
              )}
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              selectedKeys={[selectedMenuItem]}
              onClick={({ key }) => handleMenuClick(key)}
              style={{ background: 'white' }}
            >
              <Menu.Item key="1" icon={<UserOutlined />} style={{ color: '#800020' }}>
                Users
              </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />} style={{ color: '#800020' }}>
                Restaurants
              </Menu.Item>
              <Menu.Item key="3" icon={<FormOutlined />} style={{ color: '#800020' }}>
                Registration
              </Menu.Item>
              <Menu.Item key="4" icon={<ProfileOutlined />} style={{ color: '#800020' }}>
                Profile Management
              </Menu.Item>
              <Menu.Item key="5" icon={<LineChartOutlined />} style={{ color: '#800020' }}>
                Analytics
              </Menu.Item>
              <Menu.Item key="6" icon={<BellOutlined />} style={{ color: '#800020' }}>
                Notifications
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content className="p-4 bg-white" style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
              {renderContent()}
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};

export default Sidebar;
