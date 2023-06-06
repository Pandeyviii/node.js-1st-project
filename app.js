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
var cors=require('cors')
const app=express();
app.use(bodyparser.json({extended:false}))
app.use(cors());
app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/purchase",purchaseRoutes);
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
  sequelize
  .sync()
  .then(result => {
    console.log('result');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });