import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { getElapsedTime } from "../util/util";

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
    <HomeContainer>
      <button onClick={clickUpload}>upload</button>
      <button onClick={clickJoin}>join</button>
      <button onClick={clickLogin}>login</button>
      <button onClick={clickuser}>user</button>
      <button onClick={clickLogout}>logout</button>
      <ul>
        {videos.map((video) => {
          return (
            <li key={video._id} onClick={() => clickVideoItem(video._id)}>
              <TitleText text={video.title} />
              <h5>{getElapsedTime(video.createdAt)}</h5>
            </li>
          );
        })}
      </ul>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;

export default Home;
