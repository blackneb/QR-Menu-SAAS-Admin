import React from 'react'
import menuData from './menu.json'
import MenuTable from './MenuTable'
import Restaurants from './Restaurants'
import RestaurantMenuToManage from './RestaurantMenuToManage'

const MenuList: React.FC = () => {
  return (
    <div>
      <RestaurantMenuToManage/>
    </div>
  )
}

export default MenuList
