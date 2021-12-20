import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

export const checkAuth = () => {
  const cookies = new Cookies();
  const tokenInfo = cookies.get("webToken");
  if (!tokenInfo) {
    return false;
  }
  try {
    const tokenExpTs = jwt.verify(tokenInfo.token, "secret").exp;
    const nowTs = Math.floor(Date.now() / 1000);
    if (nowTs < tokenExpTs) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
