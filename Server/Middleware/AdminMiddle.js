const express = require("express");
const sqlconnect = require("../DBconnect");

function checkUserRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next(); // User has the required role, continue to the next middleware or route handler
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
}

module.export = checkUserRole;
