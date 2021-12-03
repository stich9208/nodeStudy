import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

const SearchList = () => {
  const params = useParams();
  console.log(params);
  //   useEffect(() => {
  //     fetch(`${API_URL}/search?keyword=${searchKey}`)
  //       .then((res) => res.json())
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   }, []);
  return <div>Search page</div>;
};

export default SearchList;
