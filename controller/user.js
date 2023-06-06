//const User=require("../models/User");
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
function generateAccessToken(id,name,isPremiumUser){
  return jwt.sign({userId:id,name:name,isPremiumUser:isPremiumUser},"vishal");
}
function isstringinvalid(string){
  if(string==undefined || string.length==0){
      return true
  }else{
      return false
  }
}
exports.addUser=async(req,res,next)=>{
    console.log("req-body",req.body);
    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
          res.status(400).json({err:'bad parameter....something went wrong'})
      }
        let saltrounds=10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            await User.create({name,email,password:hash});
            res.status(201).json({status:201, message:"successfully created new user"});
        
        })

        // const data=await User.create({name:name,email:email,password:password});
        // res.status(201).json(data);
    }
    catch(err){
        res.status(500).json({
            error:err
          })
    }
}

exports.login=async(req,res)=>{
    console.log(req.body);
    const email=req.body.email;
    const password=req.body.password;
    if(isstringinvalid(email) || isstringinvalid(password)){
      res.status(400).json({err:'bad parameter....something went wrong'})
  }
    const user=await User.findAll({where:{email}});
    console.log(user);
    if(user){
      bcrypt.compare(password,user[0].password,(err,result)=>{
        if(err){
          throw new Error("somethin went error");
        }
        if(result===true){
          res.status(200).json({status:200 ,success:"true",message:"user login successfully",token:generateAccessToken(user[0].id,user[0].name,user[0].isPremiumUser)})
        }
      })
    }
  }
