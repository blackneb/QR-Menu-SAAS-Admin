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
    <nav className="bg-white h-16 mt-0 shadow-md fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-3 rtl:space-x-reverse ml-8 lg:ml-4">
          <Link to="/">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          </Link>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Menu</span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userLoggedIn ? (
            <Space wrap size={16} className='mr-8 lg:mr-4'>
              <Avatar shape="circle" style={{ color: '#800020' }} size={35} icon={<UserOutlined />} />
            </Space>
          ) : (
            <Button type="text" className="text-black" style={{ color: '#800020' }}>
              Log in
            </Button>
          )}
          <Button
              type="text"
              icon={<MenuUnfoldOutlined style={{ fontSize: '24px', color: '#800020' }} />}
              className="md:hidden inline-flex items-center mt-4 mr-10 justify-center text-sm text-gray-500 rounded-lg"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={showDrawer}
            />
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
          </Drawer>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          {userLoggedIn ? (
            <>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-black rounded md:text-black md:p-0"
                    aria-current="page"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-black rounded md:text-black md:p-0"
                    aria-current="page"
                  >
                    Admin DashBoard
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
