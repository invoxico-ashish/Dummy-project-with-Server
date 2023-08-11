const express = require("express");
const sqlconnect = require("../DBconnect");

const checkAdminMiddleware = (role) => {
  return (req,res,next) => {
    
  };
};

// const checkAdminMiddleware = async (req, res, next) => {
//   const sqlQuery = `SELECT role FROM admin_details WHERE role = "admin"`;
//   sqlconnect.query(sqlQuery, (err, result) => {
//     if (err) {
//       res
//         .status(400)
//         .json({ success: false, message: "an Error occured", err });
//     }
//     if (result.length === 0) {
//       res.json({
//         success: false,
//         message: "Access denied. User is not an admin",
//       });
//     } else {
//       next();
//     }
//   });
// };

module.exports = checkAdminMiddleware;
