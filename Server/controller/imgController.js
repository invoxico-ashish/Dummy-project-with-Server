const { json } = require("body-parser");
const sqlconnect = require("../DBconnect");
const { head } = require("../router/router");
const bcrypt = require("bcryptjs");

exports.imgController = async (req, res, next) => {
  const file = req.file;
  console.log(file.filename, req.body);
  // return false;
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
          res.send({
            message: "err occurred",
            err,
          });
        } else {
          res.send({
            message: "success" + id,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// exports.imgController = async (req, res, filename) => {
//   try {
//     let db = sqlconnect;
//     let id = Math.floor(Math.random() * 9000000) + 10000000;
//     // console.log(req.file.image, "here si con");
//     let data = {
//       title: req.body.title,
//       SlideImage: req.file. filename,
//       img_name: req.body.imgname,
//     };
//     // console.log(data, "data");
//     // return false;
//     let results = await db.query(
//       "Insert into  slider_data set ?",
//       [data],
//       function (err, rows) {
//         if (err) {
//           res.send({
//             message: "err occurred",
//             err,
//           });
//         } else {
//           res.send({
//             message: "success" + id,
//           });
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

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
    console.log("tyuxery", req.file.filename);
    let heading = req.body.heading;
    let desciption = req.body.desciption;
    let data = {
      image: req.file.filename,
    };

    let sql = `INSERT INTO  about_us(heading,desciption) VALUES("${heading}","${desciption}")`;

    sqlconnect.query(sql, [data], (err, data) => {
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
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAboutData = async (req, res) => {
  const sql = "SELECT * FROM about_us ";

  sqlconnect.query(sql, (err, data) => {
    // console.log(data[0].heading);
    if (!err) {
      res.status(200).json({
        success: true,
        message: "success",
        heading: data[0].heading,
        desciption: data[0].desciption,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  });
};

exports.postOurTeam = async (req, res) => {
  const file = req.file;
  console.log(file.filename, req.body);
  try {
    let id = Math.floor(Math.random() * 9000000) + 10000000;
    let data = {
      name: req.body.name,
      image: req.file.filename,
    };
    // console.log(data);

    let result = await sqlconnect.query(
      "Insert into our_team_img set ?",
      [data],
      function (err, rows) {
        if (err) {
          res.send({
            message: "err occurred",
            err,
          });
        } else {
          res.send({
            message: "success" + " " + id,
            rows,
          });
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
      res.status(200).json({
        success: true,
        message: "successfull",
        // image: data[0].image.
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  });
};

exports.getTeamData = async (req, res) => {
  try {
    let title = req.body.title;
    let description = req.body.description;
    console.log(title, description);

    const sql = `INSERT INTO our_team_data (title,description) VALUES ("${title}","${description}")`;

    await sqlconnect.query(sql, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Store",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed",
          err,
        });
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
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
        err,
      });
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
    console.log(hashPassword);
    let data = [email, hashPassword];

    const sql = `INSERT INTO admin_data (email,password) VALUES (?)`;

    await sqlconnect.query(sql, [data], (err, data) => {
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

exports.PostPortImage = async (req, res) => {
  const file = req.file;
  console.log(file);
  try {
    let name = req.body.name;
    let image = file.filename;

    const sql = `insert into portfolio_img (name,image) values ("${name}","${image}")`;
    await sqlconnect.query(sql, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully posted",
          data,
        });
      } else {
        console.log(err);
        res.status(400).json({
          success: false,
          message: "Failed",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetAdminDetails = async (rea, res) => {
  const sql = `SELECT admin_id,name,email from admin_details`;

  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
      console.log(err);
    }
  });
};
exports.DelAdminDetails = async (res, req) => {
  try {
    let id = req.params.id;
    console.log(id);
    // return false;
    sql = ` DELETE FROM admin_details WHERE admin_id = ${id}`;
    sqlconnect.query(sql, id, (err, data) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Success",
          data,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed",
          err,
        });
        console.log(err);
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
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
      console.log(err);
    }
  });
};

exports.GetNewPortImg = async (req, res) => {
  const sql = "select * from portfolio_img order by image DESC LIMIT 2";

  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
      console.log(err);
    }
  });
};

exports.GetLatestSlideImage = async (req, res) => {
  const sql = "select * from slider_data order by image DESC LIMIT 2";

  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: true,
        message: "Failed",
        err,
      });
      console.log(err);
    }
  });
};
exports.GetLatestAdminDetails = async (req, res) => {
  const sql = "select * from admin_details order by name DESC LIMIT 2";

  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
        err,
      });
    }
  });
};

exports.GetLatestTeam = async (req, res) => {
  const sql = "select * from our_team_img order by name DESC LIMIT 2";

  sqlconnect.query(sql, (err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
        err,
      });
      console.log(err);
    }
  });
};
