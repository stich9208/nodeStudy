import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cookies } from "react-cookie";
import Nav from "./b_organisms/Nav";
import Home from "./d_pages/Home";
import Join from "./d_pages/Join";
import Login from "./d_pages/Login";
import SearchList from "./d_pages/SearchList";
import UserDetail from "./d_pages/UserDetail";
import UserEdit from "./d_pages/UserEdit";
import VideoDetail from "./d_pages/VideoDetail";
import VideoUpload from "./d_pages/VideoUpload";
import NotFound from "./d_pages/NotFound";

const RootRouter = () => {
  const cookies = new Cookies();
  const [webToken, setWebToken] = useState(cookies.get("webToken"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          {/* always open */}
          <Route path="/" element={<Home />} />
          <Route path="video" element={<Home />} />
          <Route path="search" element={<SearchList />} />
          <Route path="video/:id" element={<VideoDetail />} />

          {/* should be not logged in */}
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />

          {/* should be logged in */}
          <Route path="user" element={<UserDetail />} />
          <Route path="user/edit" element={<UserEdit />} />
          <Route path="video/upload" element={<VideoUpload />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
