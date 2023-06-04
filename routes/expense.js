const express=require("express");
const router=express.Router();
const Expense=require('../models/Expense');
const expenseController=require("../controller/expense")

router.post("/add-expense",expenseController.add_expense);

module.exports=router;