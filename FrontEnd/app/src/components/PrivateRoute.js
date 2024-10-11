import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver token, redirecionar para a página de login
    return <Navigate to="/" />;
  }

  return children; // Se houver token, renderiza o componente filho
};

export default PrivateRoute;
