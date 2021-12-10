import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const VideoDetail = () => {
  //login 되어 있지 않을 경우 모든 버튼 비활성화

  const params = useParams();
  const navigate = useNavigate();
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

  const onEdit = () => {
    fetch(`${API_URL}/auth`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          setIsEdit(true);
        }
        if (res.message === "login") {
          alert("login please!");
          return navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const onSave = () => {
    video === editVideo
      ? setIsEdit(false)
      : fetch(`${API_URL}/video/edit/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(editVideo),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "success") {
              alert("edit succcess!");
              setVideo(editVideo);
              setIsEdit(false);
            }
            if (res.message === "login") {
              alert("login please!");
              return navigate("/login");
            }
            throw new Error("edit fail!");
          })
          .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setEditVideo(video);
    setIsEdit(false);
  };

  const onDelete = () => {
    fetch(`${API_URL}/video/${params.id}/delete`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          alert("deleted success!");
          return navigate("/");
        }
        if (res.message === "login") {
          alert("login please!");
          return navigate("/login");
        }
        throw new Error("deleted fail!");
      })
      .catch((err) => console.log(err));
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
          <>
            <button onClick={onEdit}>Edit video</button>
            <button onClick={onDelete}>Delete video</button>
          </>
        )}
      </div>
    )
  );
};

export default VideoDetail;
