import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


interface NavbarProps {
  // Add any required props here
}

const Navbar: React.FC<NavbarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userLoggedIn = useSelector((state:any) => state.userInformation.userLogged)

  const navigate = useNavigate()
  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <nav className="bg-white h-16 mt-0 fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap text-black">Menu</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {
            userLoggedIn?(
            <>
              <Space wrap size={16}>
                <Avatar shape="circle" style={{color:"#800020"}} size={40} icon={<UserOutlined />} />
              </Space>
            </>
            ):(
            <>
              <Button type="primary" className="rounded-lg" style={{ backgroundColor: '#800020', borderColor: '#800020', marginRight: 4 }} onClick={()=>{ navigate("/createaccount") }}>
                Get started
              </Button>
              <Button type="text" className="text-black" style={{ color: '#800020' }} onClick={()=>{ navigate("/login") }}>
                Log in
              </Button>
            </>
            )
          }
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="md:hidden inline-flex items-center w-15 h-15 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={showDrawer}
          />
          <Drawer
            title="Navigation"
            placement="left"
            closable={true}
            onClose={onCloseDrawer}
            open={drawerOpen}
            key="left"
          >
            <ul className="p-4">
              <li>
                <Link to="/" className="block py-2 px-3 text-black rounded" aria-current="page">
                  Home
                </Link>
              </li>
            </ul>
          </Drawer>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          {userLoggedIn?(
          <>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link to="/" className="block py-2 px-3 text-black rounded md:text-black md:p-0" aria-current="page">
                   User Dashboard
                </Link>
              </li>
            </ul>
          </>
          ):(
          <>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link to="/" className="block py-2 px-3 text-black rounded md:text-black md:p-0" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-3 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-black md:p-0">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="block py-2 px-3 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-black md:p-0">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 px-3 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-black md:p-0">
                  Contact
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
