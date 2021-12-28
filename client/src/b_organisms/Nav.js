import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atoms";

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
    <div>
      <div style={{ display: "flex" }}>
        Nav
        <input
          type="text"
          value={searchKey}
          name="keyword"
          onChange={onChangeFunc}
        />
        <button onClick={onSearch}>Search</button>
        {isLogin ? (
          <div
            style={{ width: "20px", height: "20px", backgroundColor: "red" }}
          />
        ) : (
          ""
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
