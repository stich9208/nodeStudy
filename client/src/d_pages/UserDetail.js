import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useRecoilValue, useRecoilState } from "recoil";
import { refreshState } from "../recoil/atoms";
import { userInfoState } from "../recoil/selectors";

const UserDetail = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [userInput, setUserInput] = useState(userInfo);
  const [isEdit, setIsEdit] = useState(false);

  console.log(userInfo);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const clickSaveBtn = (e) => {
    e.preventDefault();
    if (
      userInput.email === userInfo.email &&
      userInput.username === userInfo.username
    ) {
      return clickCancelBtn();
    }
    // setUserInfo({ ...userInfo, userInput });
    fetch(`${process.env.REACT_APP_API_URL}/edit`, {
      method: "PUT",
      body: JSON.stringify(userInput),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === "success") {
          alert("edit success");
          setRefresh(refresh + 1);
          return setIsEdit(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const clickEditBtn = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const clickCancelBtn = (e) => {
    e.preventDefault();
    setUserInput(userInfo);
    setIsEdit(false);
  };

  const clickChangePwd = () => {
    navigate("password");
  };

  return (
    <UserDetailContainer>
      <form>
        <div style={{ display: "flex" }}>
          <div>email : </div>
          {isEdit ? (
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={inputChange}
            />
          ) : (
            <div>{userInput.email}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>name : </div>
          {isEdit ? (
            <input
              type="text"
              name="username"
              value={userInput.username}
              onChange={inputChange}
            />
          ) : (
            <div>{userInput.username}</div>
          )}
        </div>
        {/* <div style={{ display: "flex" }}>
            <div>password : </div>
            <input type="password" name="password" onChange={inputChange} />
          </div>
          <div style={{ display: "flex" }}>
            <div>password confirm : </div>
            <input type="password" name="password2" onChange={inputChange} />
          </div> */}
        {isEdit ? (
          <>
            <button onClick={clickCancelBtn}>CANCEL</button>
            <button onClick={clickSaveBtn}>SAVE</button>
          </>
        ) : (
          <button onClick={clickEditBtn}>EDIT</button>
        )}
      </form>
      <button onClick={clickChangePwd}>CHANGE PPASSWORD</button>
    </UserDetailContainer>
  );
};

const UserDetailContainer = styled.div``;

export default UserDetail;
