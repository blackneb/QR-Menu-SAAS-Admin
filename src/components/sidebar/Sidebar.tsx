import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  FormOutlined,
  ProfileOutlined,
  LineChartOutlined,
  BellOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import Navbar from '../navbar/Navbar';
import RegistrationTabs from '../tabs/RegistrationTabs';
import RestaurantsTabs from '../tabs/RestaurantsTabs';
import UserTabs from '../tabs/UserTabs';
import ProfileManagementTabs from '../tabs/ProfileManagementTabs';
import { useSelector } from 'react-redux';
import InnerRouting from '../routing/InnerRouting';
import Login from '../auth/Login';
import ManageRestaurantMenuTabs from '../tabs/ManageRestaurantMenuTabs';
import Routing from '../routing/Routing';

const { Header, Sider, Content } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('users'); 
  const userLoggedIn = useSelector((state: any) => state.userInformation.userLogged);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key: string) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'users':
        return <UserTabs />;
      case 'restaurants':
        return <RestaurantsTabs />;
      case 'manage-restaurants-menu':
        return <ManageRestaurantMenuTabs />;
      case 'registration':
        return <RegistrationTabs />;
      case 'profile-management':
        return <ProfileManagementTabs />;
      case 'analytics':
        return <div>Content for Analytics</div>;
      case 'notifications':
        return <div>Content for Notifications</div>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor:"white" }} className=''>
      <Header className="site-layout-background p-0 bg-white shadow-md font-mainfont">
        <Navbar />
      </Header>
      {userLoggedIn === undefined && (
        <>
          <Routing/>
        </>
      )}
      {userLoggedIn && ( 
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ background: 'white' }}
            className='hidden md:block'
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
              defaultSelectedKeys={['users']}
              selectedKeys={[selectedMenuItem]}
              onClick={({ key }) => handleMenuClick(key)}
              style={{ background: 'white' }}
              className='hidden md:block font-mainfont'
            >
              <Menu.Item key="users" icon={<UserOutlined />} style={{ color: '#800020' }}>
                <Link to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item key="restaurants" icon={<PieChartOutlined />} style={{ color: '#800020' }}>
                <Link to="/restaurants">Restaurants</Link>
              </Menu.Item>
              <Menu.Item key="manage-restaurant-menu" icon={<ToolOutlined />} style={{ color: '#800020' }}>
                <Link to="/manage-restaurant-menu">Manage Restaurant Menu</Link>
              </Menu.Item>
              <Menu.Item key="registration" icon={<FormOutlined />} style={{ color: '#800020' }}>
                <Link to="/registration">Registration</Link>
              </Menu.Item>
              <Menu.Item key="profile-management" icon={<ProfileOutlined />} style={{ color: '#800020' }}>
                <Link to="/profile-management">Profile Management</Link>
              </Menu.Item>
              <Menu.Item key="analytics" icon={<LineChartOutlined />} style={{ color: '#800020' }}>
                <Link to="/analytics">Analytics</Link>
              </Menu.Item>
              <Menu.Item key="notifications" icon={<BellOutlined />} style={{ color: '#800020' }}>
                <Link to="/notifications">Notifications</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content className="p-4 bg-white " style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
              <InnerRouting />
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};

export default Sidebar;
