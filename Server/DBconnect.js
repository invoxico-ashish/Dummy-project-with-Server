const mysql = require("mysql");

const sqlconnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_dashboard",
  multipleStatements: true,
});

sqlconnect.connect((err) => {
  if (!err) {
    console.log("db Connectd");
  } else {
    console.log(err);
  }
});

module.exports = sqlconnect;
