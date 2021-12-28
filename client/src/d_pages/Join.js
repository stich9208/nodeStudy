import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [joinInfo, setJoinInfo] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const joinInfoValidation = () => {
    if (joinInfo.email === "") {
      return alert("email is required!");
    }
    if (!joinInfo.email.match(emailRegex)) {
      return alert("please check your email address");
    }
    if (joinInfo.username === "") {
      return alert("username is required!");
    }
    if (joinInfo.password.length < 5) {
      return alert("please set password more than 5 characters");
    }
    if (joinInfo.password !== joinInfo.password2) {
      return alert("password confirm is wrong!");
    }
    return true;
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setJoinInfo({ ...joinInfo, [name]: value });
  };

  const joinBtnClick = (e) => {
    e.preventDefault();
    if (joinInfoValidation()) {
      fetch(`${API_URL}/join`, {
        method: "POST",
        body: JSON.stringify(joinInfo),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "success") {
            navigate("/login");
          } else {
            if (res.message === "duplicated") {
              throw new Error(`duplicated ${res.dupKey}!`);
            }
            throw new Error("server error");
          }
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <>
      <form style={{ marginTop: "50px" }} method="post">
        <div style={{ display: "flex" }}>
          <div>email : </div>
          <input type="email" name="email" onChange={inputChange} />
        </div>
        <div style={{ display: "flex" }}>
          <div>name : </div>
          <input type="text" name="username" onChange={inputChange} />
        </div>
        <div style={{ display: "flex" }}>
          <div>password : </div>
          <input type="password" name="password" onChange={inputChange} />
        </div>
        <div style={{ display: "flex" }}>
          <div>password confirm : </div>
          <input type="password" name="password2" onChange={inputChange} />
        </div>
        <button onClick={joinBtnClick}>JOIN</button>
      </form>
      <button onClick={() => navigate("/login")}>login</button>
    </>
  );
};

export default Join;
