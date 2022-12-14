import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Guard = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  if (user.success) return children;
  else return <Navigate replace to="/login" />;
};

export default Guard;
