import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log("fetch error!", err));
  });
  return <div>Home</div>;
};

export default Home;
