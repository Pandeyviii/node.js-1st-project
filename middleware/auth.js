const jwt=require("jsonwebtoken");
const User=require('../models/User')
const Expense=require("../models/Expense");

const auth=async (req,res,next)=>{
    const token=req.header("Authorization");
    console.log(token);
    const user=jwt.verify(token,"vishal");
    console.log(user);
    User.findByPk(user.userId).then((res)=>{
        console.log("response",res);
        req.user=res;
        next();
    })
}
module.exports=auth;