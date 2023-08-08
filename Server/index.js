const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const conn = require("./DBconnect");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    // methods: 
    credentials: true,
  })
);
// var allowedDomains = ['http://localhost:3001', 'http://localhost:3000'];
// app.use(cors({
//   origin: function (origin, callback) {
//     // bypass the requests with no origin (like curl requests, mobile apps, etc )
//     if (!origin) return callback(null, true);
 
//     if (allowedDomains.indexOf(origin) === -1) {
//       var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
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
