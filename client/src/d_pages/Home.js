import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Cookies } from "react-cookie";
import { API_URL } from "../config";

const Home = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then((res) => res.json())
      .then((res) => setVideos(res.videos))
      .catch((err) => console.log("fetch error!", err));
  }, []);

  // const clickUpload = () => {
  //   fetch(`${API_URL}/auth`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.message === "success") {
  //         return navigate("/video/upload");
  //       }
  //       if (res.message === "login") {
  //         cookies.remove("webToken");
  //         alert("login please!");
  //         return navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const clickUpload = () => {
    return navigate("video/upload");
  };

  return (
    <div>
      <button onClick={clickUpload}>upload</button>
      <ul>
        {videos.map((video) => {
          return (
            <li key={video._id} onClick={() => navigate(`/video/${video._id}`)}>
              <h3>{video.title}</h3>
              <h5>{new Date(video.createdAt).toUTCString()}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
