import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "./comnJs/bootstrap.js"
// import "./comnJs/custom.js";
// import "./comnJs/jquery-3.4.1.min.js";
import "./commonCss/bootstrap.css";
// import "./commonCss/font-awesome.min.css";
import "./commonCss/responsive.css";
import "./commonCss/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
