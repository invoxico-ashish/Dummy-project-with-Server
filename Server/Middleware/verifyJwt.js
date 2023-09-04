const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")

exports.verifytoken = (req, res, next) => {
  console.log("token Verification");
  const token = req.header("Authorization");
//   console.log(token);
  const jwtToken = token.slice(7);
//   console.log(jwtToken);
  //  return false
  try {
    const secretKey = "jwt-secret-key";
    const decoded = jwt.verify(jwtToken, secretKey);
    req.user = decoded;
    console.log("next")
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
