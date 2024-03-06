import React from 'react';
import { Descriptions } from 'antd';

interface ViewUserProps {
  record: {
    id: number;
    username: string;
    email: string;
    mobile: string;
    restaurant_name: string;
    is_staff: boolean;
    is_superuser: boolean;
  } | null;
  onCancel: () => void;
}

const ViewUser: React.FC<ViewUserProps> = ({ record }) => {
  return (
    <div>
        {record && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
          <Descriptions.Item label="Username">{record.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{record.mobile}</Descriptions.Item>
          <Descriptions.Item label="Restaurant Name">{record.restaurant_name}</Descriptions.Item>
          <Descriptions.Item label="Is Staff">{record.is_staff ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Is Superuser">
            {record.is_superuser ? 'Yes' : 'No'}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default ViewUser;
