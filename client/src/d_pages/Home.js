import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log("fetch error!", err));
  });
  return <div>Home</div>;
};

export default Home;
