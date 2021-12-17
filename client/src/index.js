import React from "react";
import ReactDOM from "react-dom";
import RootRouter from "./routes";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <RootRouter />
  </RecoilRoot>,
  document.getElementById("root")
);
