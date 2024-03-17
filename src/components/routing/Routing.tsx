// Routing.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Result } from 'antd';
import Login from '../auth/Login';
import RestaurantMenu from '../pages/RestaurantMenu';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  // Check if the user is authenticated (replace with your authentication logic)
  const isAuthenticated = true;

  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
);

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menulist/:id" element={<RestaurantMenu />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
