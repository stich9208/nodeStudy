import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

const VideoDetail = () => {
  const params = useParams();
  const [video, setVideo] = useState("");
  const [editVideo, setEditVideo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/video/${params.id}`)
      .then((res) => res.json())
      .then((res) => setVideo(res.video))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setEditVideo(video);
  }, [video]);

  const onChangeFunc = (e) => {
    let { name, value } = e.target;
    if (name === "hashtags") {
      value = value
        .split(",")
        .map((tag) => (tag.startsWith("#") ? tag.trim() : `#${tag.trim()}`));
    }
    setEditVideo({ ...editVideo, [name]: value });
  };

  const onSave = () => {
    video === editVideo
      ? setIsEdit(false)
      : fetch(`${API_URL}/video/edit/${params.id}`, {
          method: "POST",
          body: JSON.stringify(editVideo),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "fail") {
              throw new Error("edit fail!");
            } else {
              alert("edit succcess!");
            }
          })
          .catch((err) => console.log(err));
    setVideo(editVideo);
    setIsEdit(false);
  };

  const onCancel = () => {
    setEditVideo(video);
    setIsEdit(false);
  };

  return (
    video && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div>title : </div>
          {isEdit ? (
            <input
              type="text"
              name="title"
              value={editVideo.title}
              onChange={onChangeFunc}
            />
          ) : (
            <div>{video.title}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>description : </div>
          {isEdit ? (
            <input
              type="text"
              name="description"
              value={editVideo.description}
              onChange={onChangeFunc}
            />
          ) : (
            <div>{video.description}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>created at : </div>
          <div>{video.createdAt}</div>
        </div>
        {isEdit ? (
          <input
            type="text"
            name="hashtags"
            value={editVideo.hashtags}
            onChange={onChangeFunc}
          />
        ) : (
          <div>{video.hashtags.map((tag) => tag + " ")}</div>
        )}

        {isEdit ? (
          <>
            <button onClick={onSave}>save</button>
            <button onClick={onCancel}>cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit video</button>
        )}
      </div>
    )
  );
};

export default VideoDetail;
