const User=require('../models/User')
const Expense=require("../models/Expense");


exports.getLeaderBoard=async (req,res)=>{
    const expenses=await Expense.findAll();
    const users=await User.findAll();
    const expenseDetails={};
    const userLeaderBoard=[];
    expenses.forEach((expense)=>{
        if(expenseDetails[expense.userId]){
            expenseDetails[expense.userId]=expenseDetails[expense.userId]+expense.Amount;
        }
        else{
            expenseDetails[expense.userId]=expense.Amount;
        }
        console.log(expenseDetails);
        // const userLeaderBoard=[];
    })
    users.forEach((user)=>{
        userLeaderBoard.push({name:user.name,Amount:expenseDetails[user.id] || 0})
        console.log(userLeaderBoard);
    })
    userLeaderBoard.sort((a,b)=>b.Amount-a.Amount)
    res.status(200).json(userLeaderBoard);
}