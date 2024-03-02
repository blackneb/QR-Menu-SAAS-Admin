import React from 'react';
import { Modal, Descriptions, Image } from 'antd';


const ViewMenuItemModal: React.FC<any> = ({ menuItem }) => {
  return (
    <div>
        {menuItem && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{menuItem.id}</Descriptions.Item>
          <Descriptions.Item label="Menu Name">{menuItem.name}</Descriptions.Item>
          <Descriptions.Item label="Category">{menuItem.menu_name}</Descriptions.Item>
          <Descriptions.Item label="Restaurant Name">{menuItem.restaurant_name}</Descriptions.Item>
          <Descriptions.Item label="Price">{menuItem.price}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default ViewMenuItemModal;
