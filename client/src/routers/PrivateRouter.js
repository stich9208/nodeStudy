import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRouter;
