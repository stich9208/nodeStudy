import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

export const checkAuth = () => {
  const cookies = new Cookies();
  const tokenInfo = cookies.get("webToken");
  if (!tokenInfo) {
    return false;
  }
  try {
    jwt.verify(tokenInfo.token, "secret");
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
