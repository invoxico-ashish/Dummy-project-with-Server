import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./commonCss/bootstrap.css";
import "./commonCss/responsive.css";
import "./commonCss/style.css";
import "./commonCss/style.css.map"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
