import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Appli from "./Appli";
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config)

const eltRacine = ReactDOM.createRoot(document.getElementById("racine"));
eltRacine.render(
  <React.StrictMode>
    <Appli />
  </React.StrictMode>
);
