const path=require('path');

const express=require('express');
var dotenv=require("dotenv");
dotenv.config();
const bodyparser=require('body-parser');
const sequelize=require('./util/database');
const bcrypt=require("bcrypt");
const User=require('./models/User')
const Expense=require("./models/Expense");
const Order=require("./models/Orders")
const userRoutes=require('./routes/user');
const expenseRoutes=require("./routes/expense");
const purchaseRoutes=require("./routes/purchase");
const premiumRoutes=require("./routes/premium");
const Forgotpassword=require('./models/forgotpassword')
const ForgotpasswordRoutes=require('./routes/forgotpassword')
const Filelink=require('./models/filelink');
var cors=require('cors')
const app=express();
app.use(bodyparser.json())
app.use(cors());
app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/purchase",purchaseRoutes);
app.use("/premium",premiumRoutes);
app.use(ForgotpasswordRoutes);
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
User.hasMany(Filelink);
Filelink.belongsTo(User)
Forgotpassword.belongsTo(User);
app.use((req,res)=>{
  console.log('urlll',req.url)
  res.sendFile(path.join(__dirname,`frontend/${req.url}`));
  
})
  sequelize
  .sync()
  .then(result => {
    console.log('result');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });