import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";
import { checkAuth } from "../util/checkAuth";

const PrivateRouter = () => {
  const setIsLogin = useSetRecoilState(loginState);

  useEffect(() => {
    const checkResult = checkAuth();
    setIsLogin(checkResult);
  }, []);

  return <Outlet />;
};

export default PrivateRouter;
