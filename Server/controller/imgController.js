const sqlconnect = require("../DBconnect");
const bcrypt = require("bcryptjs");

exports.imgController = async (req, res, next) => {
  const file = req.file;
  try {
    let db = sqlconnect;
    let id = Math.floor(Math.random() * 9000000) + 10000000;
    let data = {
      title: req.body.title,
      image: req.file.filename,
      img_name: req.body.imgname,
    };

    let results = await db.query(
      "Insert into  slider_data set ?",
      [data],
      function (err, rows) {
        if (err) {
          return res.send({ message: "err occurred", err });
        } else {
          return res.send({ message: "success" + id });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
exports.getimagePort = async (req, res) => {
  const sql = "SELECT * from  portfolio_img ";
  sqlconnect.query(sql, (err, result) => {
    if (err) {
      return res.json("err", err);
    } else {
      return res.json(result);
    }
  });
};
exports.getimageslide = async (req, res) => {
  const sql = " select * from slider_data";

  sqlconnect.query(sql, (err, result) => {
    if (err) {
      return res.json("err", err);
    } else {
      return res.json(result);
    }
  });
};
exports.postAboutData = async (req, res) => {
  try {
    let heading = req.body.heading;
    let desciption = req.body.desciption;
    let data = {
      image: req.file.filename,
    };
    let sql = `INSERT INTO  about_us(heading,desciption) VALUES("${heading}","${desciption}")`;
    sqlconnect.query(sql, [data], (err, data) => {
      if (!err) {
        return res.status(200).json({ success: true, message: "Success" });
      } else {
        return res.status(400).json({ success: false, message: "Failed" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAboutData = async (req, res) => {
  const sql = "SELECT * FROM about_us ";
  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        message: "success",
        heading: data[0].heading,
        desciption: data[0].desciption,
      });
    } else {
      return res.status(400).json({ success: false, message: "Failed" });
    }
  });
};
exports.postOurTeam = async (req, res) => {
  const file = req.file;
  try {
    let id = Math.floor(Math.random() * 9000000) + 10000000;
    let data = { name: req.body.name, image: req.file.filename };
    let result = await sqlconnect.query(
      "Insert into our_team_img set ?",
      [data],
      function (err, rows) {
        if (err) {
          return res.send({ message: "err occurred", err });
        } else {
          return res.send({ message: "success" + " " + id, rows });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
exports.getOurteam = async (req, res) => {
  const sql = "SELECT * from our_team_img";

  await sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res
        .status(200)
        .json({ success: true, message: "successfull", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.getTeamData = async (req, res) => {
  try {
    let title = req.body.title;
    let description = req.body.description;
    const sql = `INSERT INTO our_team_data (title,description) VALUES ("${title}","${description}")`;
    await sqlconnect.query(sql, (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Successfully Store" });
      } else {
        return res.status(400).json({ success: false, message: "Failed", err });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getTeamData = async (req, res) => {
  const sql = "SELECT * FROM  our_team_data";

  await sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.RegisterAdmin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    if (!email && !password) {
      res.send("fields are required");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    let data = [email, hashPassword];
    const sql = `INSERT INTO admin_data (email,password) VALUES (?)`;
    await sqlconnect.query(sql, [data], (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Success", data });
      } else {
        return res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.PostPortImage = async (req, res) => {
  const file = req.file;
  try {
    let name = req.body.name;
    let image = file.filename;
    const sql = `insert into portfolio_img (name,image) values ("${name}","${image}")`;
    await sqlconnect.query(sql, (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Successfully posted", data });
      } else {
        return res.status(400).json({ success: false, message: "Failed" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.GetAdminDetails = async (rea, res) => {
  const sql = `SELECT admin_id,name,email,contact_no from admin_details`;
  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.DelAdminDetails = async (res, req) => {
  try {
    let id = req.params.id;
    sql = ` DELETE FROM admin_details WHERE admin_id = ${id}`;
    sqlconnect.query(sql, id, (err, data) => {
      if (!err) {
        return res
          .status(200)
          .json({ success: true, message: "Success", data });
      } else {
        return res.status(400).json({ success: false, message: "Failed", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.AdminCount = async (req, res) => {
  const sql = `SELECT COUNT(admin_id) AS Total_User FROM admin_details`;

  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.GetNewPortImg = async (req, res) => {
  const sql = "select * from portfolio_img order by image ";
  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.GetLatestSlideImage = async (req, res) => {
  const sql = "select * from slider_data order by slider_id";
  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: true, message: "Failed", err });
    }
  });
};
exports.GetLatestAdminDetails = async (req, res) => {
  const sql = "select * from admin_details order by admin_id DESC LIMIT 5";
  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.GetLatestTeam = async (req, res) => {
  const sql = "select * from our_team_img order by team_id ";
  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "Success", data });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.ModuleData = async (req, res) => {
  const sql = `select * from module_data`;
  sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res
        .status(200)
        .json({ success: true, message: "Success", result });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.PermissionModuleVal = async (req, res) => {
  let id = req.params.id;
  let permissions = req.body.permissions;
  let module_id = req.body.module_id;
  try {
    const sqlOne = `SELECT * FROM permissions WHERE admin_id = ${id} and module_id=${module_id}`;
    sqlconnect.query(sqlOne, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "An Error Occorred", err });
      }
      if (result.length > 0) {
        // means some data is present in here
        const sql = `update permissions set module_id=${module_id}, permission_value=${permissions} where admin_id= ${id} And module_id=${module_id} `;
        sqlconnect.query(sql, (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: "AN ERROR", err });
          }
          return res
            .status(200)
            .json({ success: true, message: "Updated", result });
        });
      } else {
        const sqlTwo = `insert into permissions (admin_id,module_id,permission_value) values ("${id}","${module_id}","${permissions}")`;
        sqlconnect.query(sqlTwo, (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: "Errorr", err });
          } else {
            return res
              .status(201)
              .json({ success: true, message: "Created", result });
          }
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "An error occurred", error });
  }
};
exports.getPermissionValues = async (req, res) => {
  id = req.params.id;
  const sql = `SELECT permission_value, admin_id,module_id FROM permissions WHERE admin_id = ?`;
  sqlconnect.query(sql, id, (err, result) => {
    if (!err) {
      return res
        .status(200)
        .json({ success: true, message: "success", result });
    } else {
      return res.status(400).json({ success: false, message: "err", err });
    }
  });
};
exports.getPermissionOption = async (req, res) => {
  id = req.params.id;
  const sql = `select * from  permissions where admin_id = ${id}`;
  await sqlconnect.query(sql, id, (err, result) => {
    if (!err) {
      return res
        .status(200)
        .json({ success: true, message: "Fetched", result });
    } else {
      return res.status(400).json({ success: false, message: "err", err });
    }
  });
};
exports.GetAdminDetailById = async (req, res) => {
  const id = req.params.id;
  const sql = `select * from admin_details where admin_id = ${id}`;

  sqlconnect.query(sql, id, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Some Err" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Success", result });
    }
  });
};
exports.CheckPasswordForTest = async (req, res) => {
  const id = req.params.id;
  const ProvidedPassword = req.body.ProvidedPassword;

  sql = `select password from admin_details where admin_id = ${id}`;

  await sqlconnect.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false });
    } else if (result.length > 0) {
      const hashedPassword = result[0].password;
      bcrypt.compare(ProvidedPassword, hashedPassword, (err, data) => {
        if (err) {
          return res.status(400).json({ success: false });
        } else if (data) {
          console.log("Password is correct");
          return res.json({ data });
        } else {
          console.log("Password is incorrect");
          return res.json({ success: false, messages: "Not MAtched" });
        }
      });
    }
  });
};
exports.GeneralSettings = async (req, res) => {
  const data = req.body;
  // Convert the data object into an array of arrays
  const valuesToInsert = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      valuesToInsert.push([key, data[key]]);
    }
  }
  const SqlOne = `INSERT INTO general_settings (Setting_key, Setting_value ) VALUES ? ON DUPLICATE KEY UPDATE Setting_value = VALUES(Setting_value)`;

  await sqlconnect.query(SqlOne, [valuesToInsert], (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "ok", result });
    } else {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Some error occurred", error: err });
    }
  });
};
exports.SettingImages = async (req, res) => {
  try {
    const webLogoFile = req.files["webLogo"];
    const favLogoFile = req.files["favLogo"];
    let webLogo = "";
    let favLogo = "";
    sqlOne = `SELECT * FROM general_settings`;
    sqlconnect.query(sqlOne, (err, response) => {
      if (!err) {
        const keyValuePairs = {};
        for (const item of response) {
          keyValuePairs[item.Setting_key] = item.Setting_value;
        }
        if (webLogoFile) {
          webLogo = webLogoFile[0].filename;
        } else {
          const defaultWebLogo = keyValuePairs.webLogo; // Change this to fetch from your database
          webLogo = defaultWebLogo;
        }
        if (favLogoFile) {
          favLogo = favLogoFile[0].filename;
        } else {
          const defaultfavLogo = keyValuePairs.favLogo; // Change this to fetch from your database
          favLogo = defaultfavLogo;
        }

        const dataToInsert = [
          ["webLogo", webLogo],
          ["favLogo", favLogo],
        ];
        const sql = `INSERT INTO general_settings (Setting_key,Setting_value) VALUES ? ON DUPLICATE KEY UPDATE Setting_value = VALUES(Setting_value)`;

        sqlconnect.query(sql, [dataToInsert], (err, result) => {
          if (!err) {
            res.status(200).json({ success: true, message: "Success", result });
          } else {
            res.status(400).json({ success: false, message: "failed", err });
          }
        });
      }
    });
    return;
  } catch (err) {
    // Handle the case where one or both files were not uploaded
    console.log(err);
    res.status(400).send("Some Error Occured");
  }
};
exports.getGenralSettings = async (req, res) => {
  const sql = `SELECT * FROM general_settings`;

  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      const keyValuePairs = {};
      for (const item of result) {
        keyValuePairs[item.Setting_key] = item.Setting_value;
      }
      return res
        .status(200)
        .json({ success: true, message: "Success", keyValuePairs });
    } else {
      res.status(400).json({ success: false, message: "failed", err });
    }
  });
};
exports.post_blog_category = async (req, res) => {
  const blog_cat_title = req.body.blog_cat_title;
  const sql = `INSERT INTO admin_blog_categories (Cat_Title) VALUES (?)`;
  await sqlconnect.query(sql, blog_cat_title, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "fail", err });
    }
  });
};
exports.get_blog_data_by_id = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM admin_blog WHERE blog_id = ${id}`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "ok", result });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.get_blog_cat_all_data = async (req, res) => {
  const sql = ` SELECT * FROM admin_blog_categories`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.get_test_cate = async (req, res) => {
  const id = req.params.id;
  const sql = `select * from admin_blog_categories where Cat_id != ${id} `;
  sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "OK", result });
    } else {
      console.log(err);
    }
  });
};
exports.create_new_blog = async (req, res) => {
  const file = req.file;
  let Blog_Title = req.body.Blog_Title;
  let Blog_Status = req.body.Blog_Status;
  let Selected_Category = req.body.Selected_Category;
  // let blog_cat_id = req.body.blog_cat_id;
  let Long_Desc = req.body.Long_Desc;
  let Short_Desc = req.body.Short_Desc;
  let Blog_img = file.filename;
  let today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  console.log(formattedDate);
  try {
    const data = [
      Blog_Title,
      Blog_Status,
      Selected_Category,
      // blog_cat_id,
      Short_Desc,
      Long_Desc,
      Blog_img,
      today,
    ];
    console.log(data, "data");
    // return;
    const sql = `INSERT INTO admin_blog (blog_Title,blog_Status,blog_Selected_Category,blog_Short_Desc,blog_Long_Desc,blog_img,blog_Publish_Date) VALUES (?)`;

    sqlconnect.query(sql, [data], (err, result) => {
      console.log("here");
      if (!err) {
        return res.status(200).json({ success: true, message: "OK", result });
      } else {
        return res.status(400).json({ success: false, message: "failed", err });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.get_all_cate_list = async (req, res) => {
  const sql = ` SELECT * FROM admin_blog_categories`;
  sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "ok", result });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
exports.get_all_blog_list = async (req, res) => {
  const sql = `SELECT blog_id,blog_Title,blog_Status,blog_Publish_Date,Cat_Title FROM admin_blog LEFT JOIN admin_blog_categories ON admin_blog.blog_Selected_Category = admin_blog_categories.Cat_id WHERE admin_blog.blog_delete = 1`;
  await sqlconnect.query(sql, (err, result) => {
    if (!err) {
      return res.status(200).json({ success: true, message: "ok", result });
    } else {
      return res.status(400).json({ success: false, message: "Failed", err });
    }
  });
};
