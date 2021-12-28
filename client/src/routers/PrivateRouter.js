import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";
import { checkAuth } from "../util/checkAuth";

const PrivateRouter = ({ children }) => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  useEffect(() => {
    const checkResult = checkAuth();
    setIsLogin(checkResult);
  }, []);

  return <>{isLogin ? children : <Navigate to="/login" />}</>;
};

export default PrivateRouter;
