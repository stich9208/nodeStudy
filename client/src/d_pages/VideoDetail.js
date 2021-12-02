import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

const VideoDetail = () => {
  const params = useParams();
  const [video, setVideo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/video/${params.id}`)
      .then((res) => res.json())
      .then((res) => setVideo(res.video))
      .catch((err) => console.log(err));
  }, []);

  const videoEdit = () => {};

  return (
    video && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div>title : </div>
          {isEdit ? (
            <input type="text" value={video.title} />
          ) : (
            <div>{video.title}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>description : </div>
          {isEdit ? (
            <input type="text" value={video.description} />
          ) : (
            <div>{video.description}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>created at : </div>
          <div>{video.createdAt}</div>
        </div>
        {isEdit ? (
          <>
            <button>save</button>
            <button onClick={() => setIsEdit(false)}>cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit video</button>
        )}
      </div>
    )
  );
};

export default VideoDetail;
