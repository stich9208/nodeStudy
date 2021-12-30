import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

export const checkAuth = () => {
  const cookies = new Cookies();
  const tokenInfo = cookies.get("webToken");
  if (!tokenInfo) {
    return false;
  }
  try {
    console.log(jwt.decode(tokenInfo.token));
    const currentTs = Math.floor(Date.now() / 1000);
    const expTs = jwt.decode(tokenInfo.token).exp;
    const refreshTs = jwt.decode(tokenInfo.refreshToken).exp;
    if (currentTs > expTs) {
      if (currentTs > refreshTs) {
        return false;
      }
      fetch(`${process.env.REACT_APP_API_URL}/auth`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    return true;
  } catch (err) {
    return false;
  }
};
