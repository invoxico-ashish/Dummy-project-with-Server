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
  let password = req.body.password;
  const salt = 10;
  const sql =
    "INSERT INTO admin_details (`name`,`email`,`password`) VALUES (?)";
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      res.json("Error in hashing password");
      console.log(err);
    }
    const values = [req.body.name, req.body.email, hash];
    sqlconnect.query(sql, [values], (err, result) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Success",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed",
        });
      }
      console.log(err);
    });
  });
};

exports.LoginAdmin = async (req, res) => {
  let email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const sql = " select * from admin_details where email=?";

  sqlconnect.query(sql, [email], (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Some error occured",
        err,
      });
    }

    if (data.length > 0) {
      bcrypt.compare(password.toString(), data[0].password, (err, response) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Password errror",
            err,
          });
        }
        if (response) {
          const name = data[0].name;
          const token = jwt.sign({ name }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          return res.status(200).json({
            success: true,
            message: "matched",token
            
          });
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

exports.VeriFiesUser = async (req, res) => {
  return res.json({
    success: true,
    message: "Success",
    name: req.name,
  });
};

exports.LogOut = async (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "success" });
};
