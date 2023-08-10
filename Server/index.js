const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const conn = require("./DBconnect");
const session = require("express-session");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    // methods:
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret", //a secret key used to encrypt  the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    }, // set the session cookie properties
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/router"));

app.listen(8000, (err) => {
  if (!err) {
    console.log("server is running");
  } else {
    console.log(err);
  }
});
