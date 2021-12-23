import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";
import { checkAuth } from "../util/checkAuth";

const AuthRouter = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  useEffect(() => {
    setIsLogin(checkAuth());
  }, []);
  return !isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRouter;
