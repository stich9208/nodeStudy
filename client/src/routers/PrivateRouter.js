import React from "react";
import { Route } from "react-router-dom";

const PrivateRouter = ({ element, path, isLogin }) => {
  return <Route element={element} path={path} />;
};

export default PrivateRouter;
