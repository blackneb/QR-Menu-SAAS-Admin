import React, { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuUnfoldOutlined, UserOutlined, PieChartOutlined, FormOutlined, ProfileOutlined, LineChartOutlined, BellOutlined, ToolOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Avatar, Space } from 'antd';
import { useSelector } from 'react-redux';

interface NavbarProps {
  // Add any required props here
}

const Navbar: React.FC<NavbarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userLoggedIn = useSelector((state: any) => state.userInformation.userLogged);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <nav className="bg-white h-16 mt-0 shadow-md fixed w-full z-20 top-0 start-0 pt-4 ">
      <div className="max-w-screen-xl flex mx-4 items-center justify-between mx-auto">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/users">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          </Link>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Menu</span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userLoggedIn ? (
            <div className="flex items-center">
            <Avatar shape="circle" style={{ color: '#800020', marginRight: '8px' }} size={35} icon={<UserOutlined />} />
            <Button
              type="text"
              icon={<MenuUnfoldOutlined style={{ fontSize: '24px', color: '#800020' }} />}
              className="md:hidden inline-flex items-center justify-center text-sm text-gray-500 rounded-lg"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={showDrawer}
            />
          </div>
          ) : (
            <Button type="text" className="text-black" style={{ color: '#800020' }}>
              Log in
            </Button>
          )}
          <Drawer
            title="Menu"
            placement="left"
            closable={true}
            onClose={onCloseDrawer}
            visible={drawerOpen}
            key="left"
          >
            <Menu
              theme="light"
              mode="vertical"
              defaultSelectedKeys={['home']}
              style={{ background: 'white' }}
            >
              <Menu.Item key="users" icon={<UserOutlined />} style={{ color: '#800020' }}>
                <Link to="/users" onClick={onCloseDrawer}>Users</Link>
              </Menu.Item>
              <Menu.Item key="restaurants" icon={<PieChartOutlined />} style={{ color: '#800020' }}>
                <Link to="/restaurants" onClick={onCloseDrawer}>Restaurants</Link>
              </Menu.Item>
              <Menu.Item key="manage-restaurant-menu" icon={<ToolOutlined />} style={{ color: '#800020' }}>
                <Link to="/manage-restaurant-menu" onClick={onCloseDrawer}>Manage Restaurant Menu</Link>
              </Menu.Item>
              <Menu.Item key="registration" icon={<FormOutlined />} style={{ color: '#800020' }}>
                <Link to="/registration" onClick={onCloseDrawer}>Registration</Link>
              </Menu.Item>
              <Menu.Item key="profile-management" icon={<ProfileOutlined />} style={{ color: '#800020' }}>
                <Link to="/profile-management" onClick={onCloseDrawer}>Profile Management</Link>
              </Menu.Item>
              <Menu.Item key="analytics" icon={<LineChartOutlined />} style={{ color: '#800020' }}>
                <Link to="/analytics" onClick={onCloseDrawer}>Analytics</Link>
              </Menu.Item>
              <Menu.Item key="notifications" icon={<BellOutlined />} style={{ color: '#800020' }}>
                <Link to="/notifications" onClick={onCloseDrawer}>Notifications</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>        
      </div>
    </nav>
  );
};

export default Navbar;
