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
router.get("/get/navigate/modules", delcontroller.GetNavigateModule);
router.get("/get/nav_link/modules", delcontroller.GetNav_link_modules);
router.get("/get/navigation_link/target/:id", delcontroller.Navigate_link_target);
router.get("/get/navigation_modules/single/module/:id", delcontroller.navigate_module_single_by_id);
router.get("/get/footer_modules/", delcontroller.get_foo_modules);
router.get("/get/footer_modules/single/:id", delcontroller.foot_single_mod_by_id);
router.get("/get/module/mod_stat/act/inact", delcontroller.Module_status_active_or_not);
router.get("/get/category/cat_mod/act", delcontroller.get_cat_mod_act);
router.get("/get/blog_data/by/:id", controller.get_blog_data_by_id);
router.get("/get/blog_category/all", controller.get_blog_cat_all_data);
router.get("/get/category/test/:id", controller.get_test_cate);
router.get("/get/category/list/all", controller.get_all_cate_list);
router.get("/get/blog/list/all", controller.get_all_blog_list);



router.post("/resgisert/admin", controller.RegisterAdmin);
router.post("/permission/module/value/:id", controller.PermissionModuleVal  );  //Give Permission 
router.post("/team/portfolio",upload.single("slideImage"),controller.PostPortImage);
router.post("/register",upload.single("ProfileImage"), delcontroller.RegisterAdmin);
router.post("/setting/images",upload.fields([{ name: 'webLogo' }, { name: 'favLogo' }]),controller.SettingImages);
router.post("/general/settings", upload.fields([{ name: 'webLogo' }, { name: 'favLogo' }]),controller.GeneralSettings);
router.post("/post/nav_data",delcontroller.add_data_to_navigation_link);
router.post("/post/nav_module",delcontroller.Navigation_module);
router.post("/post/footer_module",delcontroller.footer_modules);
router.post("/post/category/new/cat",delcontroller.post_category_cat_new);
router.post("/post/blog_cat/categories", controller.post_blog_category);
router.post("/post/blog/create/blog",upload.single("Blog_img"), controller.create_new_blog);


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
router.put("/post/nav_module/status/active/:id",delcontroller.Navigate_link_active_status);
router.put("/delete/nav_link/status/deleted/:id",delcontroller.nav_link_delete_value);
router.put("/update/nav_module/module/name/:id",delcontroller.Update_nav_module_name);
router.put("/delete/footer_module/status/deleted/:id",delcontroller.foo_deleted_status);
router.put("/put/admin_cat/category/status/:id",delcontroller.post_cat_status_by_button);
router.put("/delete/blog_cat/blog/category/:id",delcontroller.delete_cat_category_by_id);
router.put("/update/category/cat/:id",delcontroller.update_category_cat_by_id);
router.put("/delete/blog/single/:id",delcontroller.delete_blog_by_id);
router.put("/update/admin_blog/single_blog/:id",upload.single("Blog_img"),delcontroller.update_single_blog);

module.exports = router;
