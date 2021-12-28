import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, userState } from "../recoil/atoms";
import Input from "../a_atom/Input";
import Button from "../a_atom/Button";

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

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
        const { user } = res;
        setIsLogin(true);
        setUserInfo({
          email: user.email,
          username: user.username,
          _id: user._id,
        });
        alert("login success!");
      })
      .catch((err) => alert(err.message));
  };

  return isLogin ? (
    <Navigate to="/" />
  ) : (
    <LoginContainer>
      <LoginForm method="post">
        <Input
          type="email"
          name="email"
          placeholder="email"
          size="big"
          onChange={inputChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          size="big"
          onChange={inputChange}
        />
        <Button title="login" size="big" onClick={loginBtnClick} />
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

export default Login;
