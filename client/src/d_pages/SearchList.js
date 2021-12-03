import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const SearchList = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const keyword = params.get("keyword");
    fetch(`${API_URL}/search/?keyword=${keyword}`)
      .then((res) => res.json())
      .then((res) => setSearchList(res.videos))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ul>
        {searchList.map((video) => {
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

export default SearchList;
