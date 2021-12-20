import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { API_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";

const Login = ({ isLogin }) => {
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginState);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

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
        setLoginState(true);
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
