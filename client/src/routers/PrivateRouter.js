import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";

const PrivateRouter = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  return isLogin ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRouter;
