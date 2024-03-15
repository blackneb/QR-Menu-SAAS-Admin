import React from 'react';
import { Descriptions, Image } from 'antd';
import { MAIN_URL } from '../../redux/ActionTypes';

const ViewMenuItemModal: React.FC<any> = ({ menuItem }) => {

  // Check if menuItem is undefined or null
  if (!menuItem) {
    return null; // or display an error message or a loading indicator
  }

  // Check if menuItem.images is undefined or an empty array
  const hasImages = menuItem.images && menuItem.images.length > 0;

  return (
    <div>
      <div>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{menuItem.id}</Descriptions.Item>
          <Descriptions.Item label="Menu Name">{menuItem.name}</Descriptions.Item>
          <Descriptions.Item label="Category">{menuItem.menu_name}</Descriptions.Item>
          <Descriptions.Item label="Restaurant Name">{menuItem.restaurant_name}</Descriptions.Item>
          <Descriptions.Item label="Price">{menuItem.price}</Descriptions.Item>
        </Descriptions>
        
        {hasImages && (
          <div style={{ marginTop: '20px' }} className='flex w-full items-center justify-center'>
            {/* Check if the first image is available before accessing properties */}
            <Image src={MAIN_URL + 'media/' + menuItem.images[0]?.image_url} alt={menuItem.images[0]?.description} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMenuItemModal;
