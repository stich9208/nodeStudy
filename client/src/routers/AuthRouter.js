import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";
import { checkAuth } from "../util/checkAuth";

const AuthRouter = ({ children }) => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  useEffect(() => {
    setIsLogin(checkAuth());
  }, []);
  return <>{!isLogin ? children : <Navigate to="/" />}</>;
};

export default AuthRouter;
