import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  //const isAuthenticated = !!localStorage.getItem("token");
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
};

export default PrivateRoutes;