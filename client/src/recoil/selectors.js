import { selector } from "recoil";
import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

import { checkAuth } from "../util/checkAuth";
import { refreshState } from "./atoms";

const cookies = new Cookies();

export const loginState = selector({
  key: "loginState",
  get: ({ get }) => {
    let refresh = get(refreshState);
    return checkAuth();
  },
});

export const userInfoState = selector({
  key: "userInfoState",
  get: ({ get }) => {
    const isLogin = get(loginState);
    const tokenInfo = cookies.get("webToken").token;
    const { email, username, _id } = jwt.decode(tokenInfo);
    if (isLogin) {
      return { email, username, _id };
    }
    return null;
  },
});
