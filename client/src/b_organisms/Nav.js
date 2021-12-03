import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  const onChangeFunc = (e) => {
    const { value } = e.target;
    setSearchKey(value);
  };

  const onSearch = () => {
    navigate(`/search?keyword=${searchKey}`);
  };

  return (
    <div>
      <div>
        Nav
        <input
          type="text"
          value={searchKey}
          name="keyword"
          onChange={onChangeFunc}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
