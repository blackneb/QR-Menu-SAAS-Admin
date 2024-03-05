import React from 'react';
import { Modal, Descriptions, Image } from 'antd';
import { MAIN_URL } from '../../redux/ActionTypes';

const ViewMenuItemModal: React.FC<any> = ({ menuItem }) => {
  console.log(MAIN_URL + menuItem.images[0].image_url)
  return (
    <div>
      {menuItem && (
        <div> 
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{menuItem.id}</Descriptions.Item>
            <Descriptions.Item label="Menu Name">{menuItem.name}</Descriptions.Item>
            <Descriptions.Item label="Category">{menuItem.menu_name}</Descriptions.Item>
            <Descriptions.Item label="Restaurant Name">{menuItem.restaurant_name}</Descriptions.Item>
            <Descriptions.Item label="Price">{menuItem.price}</Descriptions.Item>
          </Descriptions>
          {menuItem.images && menuItem.images.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Image</h4>
              <Image src={ MAIN_URL + 'media/' + menuItem.images[0].image_url} alt={menuItem.images[0].description} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMenuItemModal;
