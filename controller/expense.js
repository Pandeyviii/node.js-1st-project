const Expense=require("../models/Expense");

exports.add_expense=async(req,res)=>{
    console.log(req.body);
    const Amount=req.body.expense_Amount;
    const Description=req.body.description;
    const Category=req.body.category;
    await Expense.create({Amount,Description,Category});
    res.status(201).json({status:201, message:"successfully Added new Expenses"});
  }