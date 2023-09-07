const sqlconnect = require("../DBconnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.DeleteimgById = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    // return false;

    const sql = `DELETE FROM slider_data WHERE slider_id = ${id} `;

    sqlconnect.query(sql, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Sucessfully deleted",
          id,
        });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateImgById = async (req, res) => {
  const file = req.file;
  console.log(file);
  try {
    let title = req.body.title;
    let image = req.file.filename;
    let img_name = req.body.imgname;

    const id = req.params.id;
    console.log(id);

    const sql = `UPDATE slider_data SET title=?, image=?, img_name=? WHERE slider_id=${id}`;

    await sqlconnect.query(sql, [title, image, img_name, id], (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Updated",
          data,
        });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.UpdateTeamById = async (req, res) => {
  let file = req.file;
  console.log(file);

  try {
    let name = req.body.name;
    let image = file.filename;
    const id = req.params.id;
    console.log(name, image, id);

    const sql = `update our_team_img set name=?,image=? where team_id=${id}`;

    await sqlconnect.query(sql, [name, image, id], (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Updated Successfully",
          data,
        });
      } else {
        console.log(err);
        res.status(400).json({
          success: false,
          message: "Failed",
          err,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteTeamById = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    sql = `delete from our_team_img where team_id=${id}`;

    await sqlconnect.query(sql, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully deleted",
          data,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Failed",
          err,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeletePortFolioById = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `delete from portfolio_img where portF_id = ${id}`;

    sqlconnect.query(sql, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully deleted",
          data,
        });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdatePortFolio = async (req, res) => {
  const file = req.file;
  console.log(file);
  try {
    const id = req.params.id;
    let name = req.body.name;
    let image = file.filename;

    const sql = `update portfolio_img set name=?, image=? where portF_id=${id}`;

    await sqlconnect.query(sql, [name, image, id], (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Success",
          data,
        });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.RegisterAdmin = async (req, res) => {
  const file = req.file;
  console.log(file, "file");

  const email = req.body.email;
  const name = req.body.name;
  console.log(name);
  const number = req.body.number;
  // return false;
  let image = file.filename;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "enter the user Name" });
  }
  const checkEmail =
    "SELECT COUNT(*) AS count FROM admin_details WHERE email = ?";
  sqlconnect.query(checkEmail, [email], (error, results) => {
    const count = results[0].count;
    if (count != 1) {
      let password = req.body.password;
      if (!password) {
        return res
          .status(400)
          .json({ success: false, message: "Password is requried" });
      } else if (password.length < 4) {
        return res
          .status(400)
          .json({ success: false, message: "Passord is too short" });
      }
      if (password.length > 15) {
        return res
          .status(400)
          .json({ success: false, message: "Password is too Long" });
      }
      const salt = 10;
      const sql =
        "INSERT INTO admin_details (`name`,`email`,`password`,`contact_no`,`Profile_pic`) VALUES (?)";
      bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
          console.log(err);
          return res.json("Error in hashing password");
        }

        console.log(number, "jukguif");
        if (!number) {
          return res
            .status(400)
            .json({ success: false, message: "number is required" });
        } else if (number.length < 8 || number.length > 12) {
          return res
            .status(400)
            .json({ success: false, message: "Please Enter Correct Details" });
        }
        const values = [req.body.name, req.body.email, hash, number, image];
        console.log(values);
        // return false
        sqlconnect.query(sql, [values], (err, result) => {
          if (!err) {
            return res
              .status(200)
              .json({ success: true, message: "Success", result });
          } else {
            returnres.status(400).json({ success: false, message: "Failed" });
          }
          console.log(err);
        });
      });
    } else {
      return res.json({
        success: false,
        message: "already Exists",
      });
    }
  });
};

exports.LoginAdmin = async (req, res) => {
  let email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const sql = " select * from admin_details where email=?";
  const queries = sqlconnect.query(sql, [email], (err, data) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Some error occured", err });
    }
    if (data.length > 0) {
      bcrypt.compare(password.toString(), data[0].password, (err, response) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Password errror", err });
        }
        if (response) {
          const name = data[0].name;
          const admin_id = data[0].admin_id;
          console.log(admin_id, "ikjhgf");
          // return false;
          const token = jwt.sign({ name }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("Bearer", token);
          return res
            .status(200)
            .json({ success: true, message: "matched", token, admin_id });
        } else {
          res.json({ message: "Pass not matched" });
        }
      });
    } else {
      return res.json({ message: "No email existed" });
    }
    console.log(data);
    return false;
  });
};

exports.LogOut = async (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "success" });
};

exports.UpdateAdminDetails = async (req, res) => {
  try {
    const id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    console.log(id);

    const sql = "update admin_details set name=?, email=? where admin_id=" + id;

    await sqlconnect.query(sql, [name, email, id], (err, result) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Success",
          result,
        });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteAdminById = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `delete from admin_details where  admin_id = ${id}`;

    sqlconnect.query(sql, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully deleted",
          data,
        });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.PutPersonalDetails = async (req, res) => {
  // console.log(file);
  try {
    const file = req.file;
    const id = req.params.id;
    let name = req.body.name;
    let image = file.filename;
    let email = req.body.email;
    let contact = req.body.contact;

    // console.log(req.params);return;
    const sql = `update admin_details set name=?, email=?, contact_no=?, Profile_pic=? where admin_id=${id}`;
    sqlconnect.query(sql, [name, email, contact, image], (err, data) => {
      if (err) {
        res.status(400).json({ success: false, message: "some Err" });
        console.log(err);
      } else {
        res.status(200).json({ success: true, message: "Updated", data });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.UpdateAccPassword = async (req, res) => {
  const salt = 10;
  const id = req.params.id;
  const Password = req.body.Password;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  console.log(Password, newPassword, confirmPassword);
  try {
    const sqlOne = `select * from  admin_details where admin_id = ${id}`;

    await sqlconnect.query(sqlOne, (err, data) => {
      if (err) {
        res.status(400).json({ success: false, message: "An Error" });
        console.log(err);
      }
      if (data.length > 0) {
        bcrypt.compare(Password, data[0].password, (err, response) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: "not found" });
          }
          if (response == true) {
            console.log(response);
            // return false;
            if (newPassword === confirmPassword) {
              console.log("password Matched");
              // return false
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ success: false, message: "some err" });
                } else {
                  const sqlTwo = `update admin_details set password=? where admin_id=${id}`;
                  sqlconnect.query(sqlTwo, hash, (err, result) => {
                    if (err) {
                      return res
                        .status(400)
                        .json({ success: false, message: "An ERRRRR" });
                    } else {
                      return res
                        .status(200)
                        .json({ success: true, message: "updated", result });
                    }
                  });
                }
              });
            } else {
              return res
                .status(400)
                .json({ success: false, message: "not matched" });
            }
          } else {
            return res
              .status(403)
              .json({ success: false, message: "old password is not matched" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.GetNavigateModule = async (reqs, res) => {
  const sql = `SELECT * FROM navigation_module`;

  await sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
