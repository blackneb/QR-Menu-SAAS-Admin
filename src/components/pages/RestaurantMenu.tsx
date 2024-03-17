import React, { useState, useEffect } from 'react';
import { Card, Tabs, Tag, Col, Row, Result, Spin } from 'antd';
import { MAIN_URL } from '../../redux/ActionTypes';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../api/Api';

interface RestaurantMenuProps {}

const { TabPane } = Tabs;

interface MenuItem {
  menuItemId: number;
  name: string;
  menuId: number;
  description: string;
  price: number;
  images: { imageUrl: string }[];
}

interface Menu {
  menuTitle: string;
  menuDescription: string;
  menuIsActive: boolean;
  menuItems: MenuItem[];
}

interface RestaurantData {
  restaurantName: string;
  restaurantId: number;
  menus: Menu[];
}

const tabStyle = { color: '#800020', borderColor: '#800020', backgroundCOlor:"white" };

const RestaurantMenu: React.FC<RestaurantMenuProps> = () => {
  const { id } = useParams<{ id: string }>();
  const tagStyle = { color: '#800020', borderColor: '#800020' };
  const [activeTab, setActiveTab] = useState('1');
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const apiUrl = MAIN_URL + `menu/restaurants/${id}/menulist/`;
        const result: any | null = await fetchData<RestaurantData[]>(apiUrl, "");
        if (result !== null) {
          setRestaurantData(result);
          setLoading(false); // Set loading to false when data is fetched successfully
        } else {
          setError(true); // Set error to true if result is null
        }
      } catch (error) {
        setError(true); // Set error to true if there is an error while fetching data
      }
    };

    fetchDataAndSetState();
  }, [id]);

  if (loading) {
    // Display loading spinner while fetching data
    return <Spin />;
  }

  if (error || !restaurantData) {
    // Display error message when there is an error or restaurant data is null
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the restaurant data is not found or an error occurred while fetching data."
      />
    );
  }

  return (
    <div className='bg-white p-4'>
      <Tag style={{ marginBottom: 16 }} color='green'>
        {restaurantData.restaurantName}
      </Tag>
      <Tabs activeKey={activeTab} onChange={handleTabChange} style={tabStyle}>
        {restaurantData.menus.map((menu, index) => (
          <TabPane className='bg-white' tab={menu.menuTitle} style={tabStyle} key={index.toString()}>
            <Row gutter={[16, 16]}>
              {menu.menuItems.map((menuItem, itemIndex) => (
                <Col key={itemIndex} xs={24} sm={12} lg={8}>
                  <Card
                    title={menuItem.name}
                    extra={<span>Price: {menuItem.price.toFixed(2)} Birr</span>}
                    style={{ marginBottom: 16 }}
                  >
                    {menuItem.images.length > 0 && (
                      <img
                        alt={menuItem.name}
                        src={MAIN_URL + 'media/' + menuItem.images[0]?.imageUrl}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                      />
                    )}
                    <p className='mt-4'>
                      {menuItem.description.split(/[,&]/).map((item, tagIndex) => (
                        <Tag key={tagIndex} color='red'>
                          {item.trim()}
                        </Tag>
                      ))}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        ))}
      </Tabs>
      <style>
        {`
          .ant-tabs-ink-bar {
            background-color: #800020 !important;
          }
        `}
      </style>
    </div>
  );
};

export default RestaurantMenu;
