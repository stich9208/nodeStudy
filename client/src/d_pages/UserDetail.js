import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useRecoilValue, useRecoilState } from "recoil";
import { refreshState, userVideoState } from "../recoil/atoms";
import { userInfoState } from "../recoil/selectors";

const UserDetail = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [userVideos, setUserVideos] = useRecoilState(userVideoState);
  const [userInput, setUserInput] = useState(userInfo);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    fetch(`${API_URL}/videolist/${userInfo._id}`)
      .then((res) => res.json())
      .then((res) => {
        setUserVideos(res.videoList);
      })
      .catch((err) => console.log("get user info error", err));
  }, []);

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
      return clickCancelBtn(e);
    }
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

  const clickVideoItem = (id) => {
    navigate(`/video/${id}`);
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

        {isEdit ? (
          <>
            <button onClick={clickCancelBtn}>CANCEL</button>
            <button onClick={clickSaveBtn}>SAVE</button>
          </>
        ) : (
          <button onClick={clickEditBtn}>EDIT</button>
        )}
      </form>
      <button onClick={clickChangePwd}>CHANGE PASSWORD</button>

      <ul>
        {userVideos.map((video) => {
          return (
            <li key={video._id} onClick={() => clickVideoItem(video._id)}>
              <h3>{video.title}</h3>
              <h5>{new Date(video.createdAt).toUTCString()}</h5>
            </li>
          );
        })}
      </ul>
    </UserDetailContainer>
  );
};

const UserDetailContainer = styled.div``;

export default UserDetail;
