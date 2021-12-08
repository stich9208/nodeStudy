import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();
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
        alert("login success!");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
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
