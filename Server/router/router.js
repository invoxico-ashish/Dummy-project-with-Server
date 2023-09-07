const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyjwt = require("../Middleware/verifyJwt")
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

router.get("/admin/count", controller.AdminCount);
router.get("/get/new/port", controller.GetNewPortImg);
router.get("/get/latest/slide", controller.GetLatestSlideImage);
router.get("/get/latest/admin/user", controller.GetLatestAdminDetails);
router.get("/get/latest/team", controller.GetLatestTeam);
router.get("/get/module/data", controller.ModuleData);
router.get("/get/genral/settings", controller.getGenralSettings);


router.post("/resgisert/admin", controller.RegisterAdmin);
router.post("/permission/module/value/:id", controller.PermissionModuleVal  );  //Give Permission 
router.post("/team/portfolio",upload.single("slideImage"),controller.PostPortImage);
router.post("/register",upload.single("ProfileImage"), delcontroller.RegisterAdmin);
router.post("/setting/images",upload.fields([{ name: 'webLogo' }, { name: 'favLogo' }]),controller.SettingImages);
router.post("/general/settings", upload.fields([{ name: 'webLogo' }, { name: 'favLogo' }]),controller.GeneralSettings);

//LOGIN ROUTE-------------------------------------------->

router.post("/login",delcontroller.LoginAdmin);
router.get("/logout", delcontroller.LogOut);
router.get("/admin/details", controller.GetAdminDetails);
router.get("/admin/detail/:id", controller.GetAdminDetailById);
router.get("/permision/values/module/:id", controller.getPermissionValues);
router.get("/permission/option/value/:id", controller.getPermissionOption);
router.get("/check/password/fortesting/:id", controller.CheckPasswordForTest);

//DELETE ROUTES-------------------->

router.delete("/delete/img/:id", delcontroller.DeleteimgById);
router.delete("/delete/team/:id",  delcontroller.DeleteTeamById);
router.delete("/delete/portfolio/:id", delcontroller.DeletePortFolioById);
router.delete("/del/admin/det/:id",verifyjwt.verifytoken, controller.DelAdminDetails);
router.delete("/delete/admin/:id", delcontroller.DeleteAdminById);

//UPDATE ROUTE------------------------------->

router.put("/update/slide/:id",verifyjwt.verifytoken,upload.single("slideImage"),delcontroller.UpdateImgById);
router.put("/update/Team/:id",verifyjwt.verifytoken,upload.single("slideImage"),delcontroller.UpdateTeamById);
router.put("/update/portfolio/:id",verifyjwt.verifytoken,upload.single("slideImage"),delcontroller.UpdatePortFolio );
router.put("/update/personal/details/:id",verifyjwt.verifytoken,upload.single("ProfileImage"),delcontroller.PutPersonalDetails);
router.put("/update/admin/det/:id",verifyjwt.verifytoken,delcontroller.UpdateAdminDetails);
router.put("/update/password/:id",verifyjwt.verifytoken, delcontroller.UpdateAccPassword);

module.exports = router;

// const verifyUser = (req, res, next) => {
//   const token = req.cookie.token;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "you are not Athourized",
//     });
//   } else {
//     jwt.verify(token, "Jwt-secret-key", (err, decode) => {
//       if (err) {
//         return res.status(401).json({
//           success: false,
//           message: "Token is not ok",
//         });
//       } else {
//         req.name = decode.name;
//         next();
//       }
//     });
//   }
// };
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

//var allowedDomains = ['http://localhost:3001', 'http://localhost:3000'];
// app.use(cors({
//   origin: function (origin, callback) {
//     // bypass the requests with no origin (like curl requests, mobile apps, etc )
//     if (!origin) return callback(null, true);
 
//     if (allowedDomains.indexOf(origin) === -1) {
//       var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));