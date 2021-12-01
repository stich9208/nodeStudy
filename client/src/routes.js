import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../src/b_organisms/Nav";
import Home from "../src/d_pages/Home";
import Join from "../src/d_pages/Join";
import Login from "../src/d_pages/Login";
import UserDetail from "../src/d_pages/UserDetail";
import UserEdit from "../src/d_pages/UserEdit";
import VideoDetail from "../src/d_pages/VideoDetail";
import VideoEdit from "../src/d_pages/VideoEdit";
import VideoUpload from "../src/d_pages/VideoUpload";

const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<UserDetail />} />
          <Route path="user/edit" element={<UserEdit />} />
          <Route path="video" element={<Home />} />
          <Route path="video/:id" element={<VideoDetail />} />
          <Route path="video/:id/edit" element={<VideoEdit />} />
          <Route path="video/upload" element={<VideoUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
