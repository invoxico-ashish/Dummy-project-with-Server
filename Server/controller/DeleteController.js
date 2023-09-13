const sqlconnect = require("../DBconnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.DeleteimgById = async (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM slider_data WHERE slider_id = ${id} `;
    sqlconnect.query(sql, (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Sucessfully deleted", id });
      } else {
        return res.status(400).json({ success: false, message: "err", err });
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
    const sql = `UPDATE slider_data SET title=?, image=?, img_name=? WHERE slider_id=${id}`;
    await sqlconnect.query(sql, [title, image, img_name, id], (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Updated", data });
      } else {
        return res.status(400).json({ success: false, message: "err", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.UpdateTeamById = async (req, res) => {
  let file = req.file;
  try {
    let name = req.body.name;
    let image = file.filename;
    const id = req.params.id;
    const sql = `update our_team_img set name=?,image=? where team_id=${id}`;
    await sqlconnect.query(sql, [name, image, id], (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Updated Successfully", data });
      } else {
        return res.status(400).json({ success: false, message: "Failed", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.DeleteTeamById = async (req, res) => {
  let id = req.params.id;
  try {
    sql = `delete from our_team_img where team_id=${id}`;
    await sqlconnect.query(sql, (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Successfully deleted", data });
      } else {
        return res.status(200).json({ success: false, message: "Failed", err });
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
  try {
    const id = req.params.id;
    let name = req.body.name;
    let image = file.filename;
    const sql = `update portfolio_img set name=?, image=? where portF_id=${id}`;
    await sqlconnect.query(sql, [name, image, id], (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Success", data });
      } else {
        return res.status(400).json({ success: false, message: "fail", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.RegisterAdmin = async (req, res) => {
  const file = req.file;
  const email = req.body.email;
  const name = req.body.name;
  const number = req.body.number;
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
          return res.json("Error in hashing password");
        }
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
        sqlconnect.query(sql, [values], (err, result) => {
          if (!err) {
            return res
              .status(200)
              .json({ success: true, message: "Success", result });
          } else {
            return res.status(400).json({ success: false, message: "Failed" });
          }
        });
      });
    } else {
      return res.json({ success: false, message: "already Exists", err });
    }
  });
};
exports.LoginAdmin = async (req, res) => {
  let email = req.body.email;
  const password = req.body.password;
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
        return res
          .status(200)
          .json({ success: true, message: "Success", result });
      } else {
        return res.status(400).json({ success: false, message: "err", err });
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
        return res
          .status(200)
          .json({ success: true, message: "Successfully deleted", data });
      } else {
        return res.status(400).json({ success: false, message: "err", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.PutPersonalDetails = async (req, res) => {
  try {
    const file = req.file;
    const id = req.params.id;
    let name = req.body.name;
    let image = file.filename;
    let email = req.body.email;
    let contact = req.body.contact;
    const sql = `update admin_details set name=?, email=?, contact_no=?, Profile_pic=? where admin_id=${id}`;
    sqlconnect.query(sql, [name, email, contact, image], (err, data) => {
      if (err) {
        return res.status(400).json({ success: false, message: "some Err" });
        console.log(err);
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Updated", data });
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
  try {
    const sqlOne = `select * from  admin_details where admin_id = ${id}`;
    await sqlconnect.query(sqlOne, (err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "An Error", err });
      }
      if (data.length > 0) {
        bcrypt.compare(Password, data[0].password, (err, response) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: "not found" });
          }
          if (response == true) {
            if (newPassword === confirmPassword) {
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
exports.GetNavigateModule = async (req, res) => {
  const sql = `SELECT * FROM navigation_module`;
  await sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.GetNav_link_modules = async (req, res) => {
  const sql = `SELECT Nav_link_id,navigate_id,nav_link_title,nav_link_target,nav_link_display_order,nav_link_LINKS FROM navigation_link WHERE nav_link_delete_value = 1 ORDER BY nav_link_display_order ASC`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res
        .status(200)
        .json({ success: true, message: "Success", result });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.add_data_to_navigation_link = async (req, res) => {
  const Data = req.body;
  const updateValues = [
    Data.selectId,
    Data.selectedModule,
    Data.selectVlaue,
    Data.orderValue,
    Data.selectId,
    Data.url,
  ];
  const Sqlone = `SELECT * FROM navigation_link WHERE navigate_id = ${Data.selectId}`;
  try {
    sqlconnect.query(Sqlone, [updateValues], (err, result) => {
      if (result.length > 0) {
        sqlThree = `UPDATE navigation_link SET navigate_id=${Data.selectId}, nav_link_title="${Data.selectedModule}",nav_link_target="${Data.selectVlaue}",nav_link_display_order="${Data.orderValue}", nav_link_LINKS="${Data.url}" WHERE navigate_id=${Data.selectId}`;
        sqlconnect.query(sqlThree, [updateValues], (err, result) => {
          if (!err) {
            return res
              .status(200)
              .json({ success: true, message: "Success", result });
          } else {
            console.log(err);
            return res
              .status(400)
              .json({ success: false, message: "failed", err });
          }
        });
      } else {
        const updateValuesTwo = [
          Data.selectId,
          Data.selectedModule,
          Data.selectVlaue,
          Data.orderValue,
          Data.url,
        ];
        sqltwo = `INSERT INTO navigation_link (navigate_id,nav_link_title,nav_link_target,nav_link_display_order,nav_link_LINKS) VALUES (?)`;
        sqlconnect.query(sqltwo, [updateValuesTwo], (err, data) => {
          if (!err) {
            return res
              .status(201)
              .json({ success: true, message: "done", data });
          } else {
            console.log(err);
            return res
              .status(400)
              .json({ success: false, message: "failed", err });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Some Error Occured", error });
  }
};
exports.Navigation_module = async (req, res) => {
  const name = req.body.module_name;
  const sql = `SELECT * FROM navigation_module WHERE Modules =?`;
  sqlconnect.query(sql, name, (err, result) => {
    if (result.length > 0) {
      res.status(409).json({ success: false, message: "Duplicate Entry", err });
    } else {
      const Sqlone = `INSERT INTO navigation_module (Modules) VALUES (?)`;
      sqlconnect.query(Sqlone, name, (err, data) => {
        if (!err) {
          return res
            .status(201)
            .json({ success: true, message: "created", result });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Failed", err });
        }
      });
    }
  });
};
exports.Navigate_link_target = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM  navigation_link WHERE navigate_id =${id}`;
  try {
    sqlconnect.query(sql, (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Success", data });
      } else {
        return res.status(400).json({ success: false, message: "failed", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.Navigate_link_active_status = async (req, res) => {
  const status = req.body.status;
  const id = req.params.id;
  const sql = `UPDATE navigation_module SET mod_status = ? WHERE navigate_id =? `;
  await sqlconnect.query(sql, [status, id], (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      console.log(err);
      return res.status(400).json({ success: false, message: "Error", err });
    }
  });
};
exports.nav_link_delete_value = async (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE navigation_link SET nav_link_delete_value = 0 WHERE Nav_link_id = ${id}`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "failed", err });
    }
  });
};
exports.Update_nav_module_name = async (req, res) => {
  try {
    const newModuleName = req.body.Modules;
    const active = req.body.active;
    const id = req.params.id;
    const sql = `UPDATE navigation_module SET Modules = ?, mod_status= ? WHERE navigate_id =?`;
    await sqlconnect.query(sql, [newModuleName, active, id], (err, result) => {
      if (!err) {
        return res.status(200).json({ success: true, message: "ok", result });
      } else {
        return res.status(400).json({ success: false, message: "Fail", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.navigate_module_single_by_id = async (req, res) => {
  const id = req.params.id;
  const sql = `Select * from navigation_module WHERE navigate_id = ${id}`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "Error", err });
    }
  });
};
exports.footer_modules = async (req, res) => {
  const Data = req.body;
  const updateValues = [
    Data.footer_nav_id,
    Data.foo_link_title,
    Data.foo_link_target,
    Data.foo_link_display_order,
    Data.foo_link_LINKS,
  ];
  console.log(updateValues, "values");
  const Sqlone = `SELECT * FROM footer_navigation_link WHERE footer_nav_id=${Data.footer_nav_id}`;
  try {
    sqlconnect.query(Sqlone, [updateValues], (err, result) => {
      if (result.length > 0) {
        sqlThree = `UPDATE footer_navigation_link SET foo_link_title="${Data.foo_link_title}",foo_link_target="${Data.foo_link_target}",foo_link_display_order="${Data.foo_link_display_order}",foo_link_LINKS="${Data.foo_link_LINKS}" WHERE footer_nav_id=${Data.footer_nav_id}`;
        sqlconnect.query(sqlThree, [updateValues], (err, result) => {
          if (!err) {
            return res
              .status(200)
              .json({ success: true, message: "Success", result });
          } else {
            console.log(err);
            return res
              .status(400)
              .json({ success: false, message: "failed", err });
          }
        });
      } else {
        const updateValuesTwo = [
          Data.footer_nav_id,
          Data.foo_link_title,
          Data.foo_link_target,
          Data.foo_link_display_order,
          Data.foo_link_LINKS,
        ];
        sqltwo = `INSERT INTO footer_navigation_link (foo_link_title,foo_link_target,foo_link_display_order,foo_link_LINKS) VALUES (?)`;
        sqlconnect.query(sqltwo, [updateValuesTwo], (err, data) => {
          if (!err) {
            return res
              .status(201)
              .json({ success: true, message: "done", data });
          } else {
            console.log(err);
            return res
              .status(400)
              .json({ success: false, message: "failed", err });
          }
        });
      }
    });
  } catch (error) {
    console.log(err);
  }
};
exports.get_foo_modules = async (req, res) => {
  const sql = `SELECT * FROM footer_navigation_link WHERE foo_link_delete_value = 1`;
  sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "failed", err });
    }
  });
};
exports.foo_deleted_status = async (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE footer_navigation_link SET foo_link_delete_value = 0 WHERE footer_nav_id = ${id}`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "failed", err });
    }
  });
};
exports.foot_single_mod_by_id = async (req, res) => {
  const id = req.params.id;
  const sql = `select * from footer_navigation_link where footer_nav_id = ${id}`;
  sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "failed", err });
    }
  });
};
exports.Module_status_active_or_not = async (req, res) => {
  const sql = `SELECT * FROM navigation_module`;
  sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "ok", result });
    } else {
      return err;
    }
  });
};
