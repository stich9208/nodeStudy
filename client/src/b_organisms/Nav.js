import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
          />
          <Button title="search" type="primary" onClick={onSearch} />
        </SearchForm>
        {isLogin ? (
          <div
            onClick={() => navigate("user")}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "red",
              cursor: "pointer",
            }}
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
  background-color: lightgrey;
`;

const HomeLogo = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

export default Nav;
