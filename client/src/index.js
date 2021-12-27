import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./style/globalStyle";
import RootRouter from "./routes";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <GlobalStyle />
    <RootRouter />
  </RecoilRoot>,
  document.getElementById("root")
);
