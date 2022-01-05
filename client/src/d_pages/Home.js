import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

import TitleText from "../a_atom/TitleText";

const Home = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then((res) => res.json())
      .then((res) => setVideos(res.videos))
      .catch((err) => console.log("fetch error!", err));
  }, []);

  const clickUpload = () => {
    navigate("/video/upload");
  };

  const clickJoin = () => {
    navigate("/join");
  };

  const clickLogin = () => {
    navigate("/login");
  };

  const clickuser = () => {
    navigate("user");
  };

  const clickVideoItem = (id) => {
    navigate(`/video/${id}`);
  };

  const clickLogout = () => {
    cookies.remove("webToken");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={clickUpload}>upload</button>
      <button onClick={clickJoin}>join</button>
      <button onClick={clickLogin}>login</button>
      <button onClick={clickuser}>user</button>
      <button onClick={clickLogout}>logout</button>
      <ul>
        {videos.map((video) => {
          const elapsedTime =
            (Date.now() - new Date(video.createdAt).getTime()) / 60 / 60 / 1000;
          const timeDesc =
            elapsedTime < 24
              ? `${Math.floor(elapsedTime)} 시간전`
              : `${Math.floor(elapsedTime / 24)} 일전`;
          return (
            <li key={video._id} onClick={() => clickVideoItem(video._id)}>
              <TitleText text={video.title} />
              <h5>{timeDesc}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
