//const User=require("../models/User");
const User=require("../models/User");
const AWS=require('aws-sdk')
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Filelink=require('../models/filelink');
const Expense=require("../models/Expense");
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
function uploadToS3(data,filename){
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;

    let s3bucket=new AWS.S3({
      // aws_access_key_id:IAM_USER_KEY,
      // aws_secret_access_key:IAM_USER_SECRET,
        // Bucket:BUCKET_NAME
        credentials: {
          accessKeyId: IAM_USER_KEY,
          secretAccessKey: IAM_USER_SECRET
        }
    })
    console.log("s3 bucket",s3bucket);
    var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log('something went wrong',err)
                reject(err)

            }
            else{
                 console.log('success',s3response)
                resolve(s3response.Location);
            }
    })
    })
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
  exports.getDownload=async(req,res,next)=>{
    console.log("hello world");
    if(!req.user.isPremiumUser){
        return res.status(400).json({message:'only for premium user'})
    }
    try{

    const expenses=await req.user.getExpenses()
    console.log(expenses)
    const stringifiedExpenses=JSON.stringify(expenses)
    // depend on the users
    const userId=req.user.id;
    console.log("this is useri d",userId)
    const filename=`Expense${userId}/${new Date()}.txt`;
    const fileURl=await uploadToS3(stringifiedExpenses,filename)
    console.log(fileURl)
    await req.user.createFilelink({fileURl:fileURl})
   
    res.status(200).json({fileURl,success:true,status:200})
    }
    catch(err){
        res.status(500).json({fileURl:'',success:false,err:err})
    }

}