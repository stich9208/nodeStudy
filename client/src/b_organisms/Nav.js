import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/selectors";

import Input from "../a_atom/Input";
import Button from "../a_atom/Button";

const Nav = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const isLogin = useRecoilValue(loginState);

  const onChangeFunc = (e) => {
    const { value } = e.target;
    setSearchKey(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchKey}`);
  };

  const clickHome = () => {
    navigate("/");
  };

  return (
    <>
      <NavContainer style={{ display: "flex" }}>
        <HomeLogo onClick={clickHome}>HOME</HomeLogo>
        <SearchForm>
          <Input
            type="text"
            value={searchKey}
            name="keyword"
            placeholder="Search"
            onChange={onChangeFunc}
            style={{ marginRight: "10px " }}
          />
          <Button
            title="SEARCH"
            size="small"
            type="primary"
            onClick={onSearch}
          />
        </SearchForm>
        <UploadButton onClick={() => navigate("video/upload")}>
          <Button title="UPLOAD" size="medium">
            <FontAwesomeIcon icon={faVideo} style={{ marginLeft: "5px" }} />
          </Button>
        </UploadButton>
        {isLogin ? (
          <ProfileImage
            src="/images/profile.png"
            onClick={() => navigate("user")}
          />
        ) : (
          ""
        )}
      </NavContainer>
      <Outlet />
    </>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #152c5d;
`;

const HomeLogo = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border: 3px solid #809bce;
  border-radius: 50px;
  cursor: pointer;
`;

const UploadButton = styled.div`
  position: absolute;
  right: 100px;
  color: white;
  cursor: pointer;
`;

export default Nav;
