import React from 'react';
import MenuTable from '../tables/MenuTable';
import menuData from './menu.json'
const MenuList: React.FC = () => {

  return (
    <div>
      <h1>Menu Items</h1>
      <MenuTable/>
    </div>
  );
};

export default MenuList;