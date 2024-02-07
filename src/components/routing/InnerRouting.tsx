import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

import Login from '../auth/Login';
import UserTabs from '../pages/UserTabs';
import RestaurantsTabs from '../pages/RestaurantsTabs';
import ManageRestaurantMenuTabs from '../pages/ManageRestaurantMenuTabs';
import RegistrationTabs from '../pages/RegistrationTabs';
import ProfileManagementTabs from '../pages/ProfileManagementTabs';
import MenuManagement from '../pages/MenuManagement';



const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  // Check if the user is authenticated (replace with your authentication logic)
  const isAuthenticated = true;

  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const InnerRouting: React.FC = () => {
  return (
      <Routes>
        <Route path="/users" element={<UserTabs/>} />
        <Route path="/restaurants" element={<RestaurantsTabs/>} />
        <Route path="/manage-restaurant-menu" element={<ManageRestaurantMenuTabs/>} />
        <Route path="/registration" element={<RegistrationTabs/>} />
        <Route path="/profile-management" element={<ProfileManagementTabs/>} />
        <Route path="/analytics" element={<Login/>} />
        <Route path="/notifications" element={<Login/>} />
        <Route path="/restaurants/:id" element={<MenuManagement/>} />
      </Routes>
  );
};

export default InnerRouting
