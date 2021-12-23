import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const loginBtnClick = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message !== "success") {
          throw new Error(res.message);
        }
        setIsLogin(true);
        alert("login success!");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return isLogin ? (
    <Navigate to="/" />
  ) : (
    <form style={{ marginTop: "50px" }} method="post">
      <div style={{ display: "flex" }}>
        <div>email : </div>
        <input type="email" name="email" onChange={inputChange} />
      </div>

      <div style={{ display: "flex" }}>
        <div>password : </div>
        <input type="password" name="password" onChange={inputChange} />
      </div>

      <button onClick={loginBtnClick}>LOGIN</button>
    </form>
  );
};

export default Login;
