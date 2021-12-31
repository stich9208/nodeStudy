import { selector } from "recoil";
import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

import { checkAuth, getUserDetail } from "../util/util";
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
    const { _id } = jwt.decode(tokenInfo);
    if (isLogin) {
      return getUserDetail(_id);
    }
    return null;
  },
});
