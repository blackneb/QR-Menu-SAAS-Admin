// Routing.tsx

import React from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

import Login from '../auth/Login';



const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  // Check if the user is authenticated (replace with your authentication logic)
  const isAuthenticated = true;

  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

const Routing: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
  );
};

export default Routing;
