import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atoms";

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

  const onSearch = () => {
    navigate(`/search?keyword=${searchKey}`);
  };

  return (
    <>
      <NavContainer style={{ display: "flex" }}>
        <SearchForm>
          <Input
            type="text"
            value={searchKey}
            name="keyword"
            onChange={onChangeFunc}
          />
          <Button title="search" type="primary" onClick={onSearch} />
        </SearchForm>
        {isLogin ? (
          <div
            style={{ width: "20px", height: "20px", backgroundColor: "red" }}
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: blue;
`;

const SearchForm = styled.form`
  display: flex;
`;

export default Nav;
