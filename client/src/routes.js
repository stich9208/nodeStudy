import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./b_organisms/Nav";
import Home from "./d_pages/Home";
import Join from "./d_pages/Join";
import Login from "./d_pages/Login";
import SearchList from "./d_pages/SearchList";
import UserDetail from "./d_pages/UserDetail";
import UserEdit from "./d_pages/UserEdit";
import VideoDetail from "./d_pages/VideoDetail";
import VideoUpload from "./d_pages/VideoUpload";

const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchList />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<UserDetail />} />
          <Route path="user/edit" element={<UserEdit />} />
          <Route path="video" element={<Home />} />
          <Route path="video/:id" element={<VideoDetail />} />
          <Route path="video/upload" element={<VideoUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
