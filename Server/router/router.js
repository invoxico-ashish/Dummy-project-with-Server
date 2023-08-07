const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controller/imgController");
const delcontroller = require("../controller/DeleteController");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/img/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
const verifyUser = (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "you are not Athourized",
    });
  } else {
    jwt.verify(token, "Jwt-secret-key", (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token is not ok",
        });
      } else {
        req.name = decode.name;
        next();
      }
    });
  }
};

//LOGIN ROUTE-------------------------------------------->
router.post("/login", delcontroller.LoginAdmin);
router.post("/register", delcontroller.RegisterAdmin);
router.get("/checkAuth", verifyUser, delcontroller.VeriFiesUser);
router.get("/logout", delcontroller.LogOut);

// POST ROUTES---------------------------------------------->
router.post("/img", upload.single("slideImage"), controller.imgController);
router.post("/about/data", upload.single("image"), controller.postAboutData);
router.post("/our/team", upload.single("slideImage"), controller.postOurTeam);

router.post("/team/data", controller.getTeamData);

//GET ROUTES ------------------------------------------------>
router.get("/get/img/port", controller.getimagePort);
router.get("/get/img/slide", controller.getimageslide);
router.get("/get/about/data", controller.getAboutData);
router.get("/get/our/team", controller.getOurteam);
router.get("/get/team/data", controller.getTeamData);

//DASHBOARD ROUTES------------------------------------------->
router.post("/resgisert/admin", controller.RegisterAdmin);
router.post("/team/portfolio",upload.single("slideImage"),controller.PostPortImage);
//DELETE ROUTES----------------------------->
router.delete("/delete/img/:id", delcontroller.DeleteimgById);
router.delete("/delete/team/:id", delcontroller.DeleteTeamById);
router.delete("/delete/portfolio/:id", delcontroller.DeletePortFolioById);
//UPDATE ROUTE------------------------------->
router.put("/update/slide/:id",upload.single("slideImage"),delcontroller.UpdateImgById);
router.put("/update/Team/:id",upload.single("slideImage"),delcontroller.UpdateTeamById);
router.put("/update/portfolio/:id",upload.single("slideImage"),delcontroller.UpdatePortFolio);

module.exports = router;

// const storage = multer.diskStorage({
//   destination: "src/img/",
//   filename: (req, file, cb) => {
//     // console.log(file, "kwioe9h");
//     console.log(file.fieldname, "kwioe9h");
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
// // console.log(storage.);

// const upload = multer({
//   storage: storage,
// });
