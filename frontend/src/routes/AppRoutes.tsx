// src/routes/AppRoutes.tsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Application from '../pages/Application';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={isAuthenticated ? <Application /> : <Navigate to='/login' />}
      />
    </Routes>
  );
};

export default AppRoutes;
