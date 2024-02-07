import { Card, Descriptions, Image, Tag } from 'antd';

const PreviewMenuModal = ({ selectedPreviewRecord }: any) => {
  const { menuName, category, price, status } = selectedPreviewRecord;

  const getStatusTagColor = () => {
    return status === 'active' ? 'green' : 'red';
  };

  return (
      <Card cover={<Image alt="Menu Image" src={"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />}>
        <Descriptions title={menuName} layout="vertical">
          <Descriptions.Item label="Category">{category}</Descriptions.Item>
          <Descriptions.Item label="Price">${price.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={getStatusTagColor()}>{status}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
  );
}

export default PreviewMenuModal;
