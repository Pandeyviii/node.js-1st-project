const express=require("express");
const router=express.Router();
const User=require('../models/User')
const userController=require("../controller/user");
const auth=require("../middleware/auth");

router.post("/add-user",userController.addUser);
router.post("/login",userController.login);
router.get("/download",auth,userController.getDownload);

module.exports=router;