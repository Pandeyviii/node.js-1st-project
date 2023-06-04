const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
const sequelize=require('./util/database');
const bcrypt=require("bcrypt");
const User=require('./models/User')
const Expense=require("./models/Expense");
const userRoutes=require('./routes/user');
const expenseRoutes=require("./routes/expense");
var cors=require('cors')
const app=express();
app.use(bodyparser.json({extended:false}))
app.use(cors());
app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
  sequelize
  .sync()
  .then(result => {
    console.log('result');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });