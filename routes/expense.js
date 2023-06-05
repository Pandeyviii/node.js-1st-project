const express=require("express");
const router=express.Router();
const Expense=require('../models/Expense');
const expenseController=require("../controller/expense");
const auth=require("../middleware/auth");

router.post("/add-expense",auth,expenseController.add_expense);
router.get("/get-expense",auth,expenseController.get_expense);

router.delete('/delete-expense/:id',expenseController.delete_expense);

module.exports=router;