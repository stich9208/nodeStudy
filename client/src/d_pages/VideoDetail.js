import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

const VideoDetail = () => {
  const params = useParams();
  const [video, setVideo] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/video/${params.id}`)
      .then((res) => res.json())
      .then((res) => setVideo(res.video))
      .catch((err) => console.log(err));
  }, []);

  return (
    video && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div>title : </div>
          <div>{video.title}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>description : </div>
          <div>{video.description}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>created at : </div>
          <div>{video.createdAt}</div>
        </div>
      </div>
    )
  );
};

export default VideoDetail;
