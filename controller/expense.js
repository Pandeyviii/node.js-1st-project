const Expense=require("../models/Expense");
function isstringinvalid(string){
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }
}
exports.add_expense=async(req,res)=>{
    try{

    console.log(req.body);
    const Amount=req.body.expense_Amount;
    const Description=req.body.description;
    const Category=req.body.category;
    if(isstringinvalid(Amount) || isstringinvalid(Description) || isstringinvalid(Category)){
        res.status(400).json({err:'bad parameter....something went wrong'})
    }
    await Expense.create({Amount,Description,Category,userId:req.user.id});
    res.status(201).json({status:201, message:"successfully Added new Expenses"});
}catch{error=>{
    res.status(500).json({success:false,error:error});
}}
  }

  exports.get_expense=async(req,res)=>{
    // try{
    //     const allexpense=await Expense.findAll({where:{userId:req.user.id}});
    //     res.status(200).json(allexpense)
    //     console.log(allexpense)
    // }
    // catch{error=>{
    //     res.status(500).json({success:false,error:error});
    // }}
    const page = +req.query.page || 1;
    const NUMBER_OF_EXPENSES_PER_PAGE=3;
    let total_items
    Expense.count({where:{userId:req.user.id}})
    .then((total)=>{
        total_items=total
        return Expense.findAll({where:{userId:req.user.id},offset:(page-1)*NUMBER_OF_EXPENSES_PER_PAGE,
        limit:NUMBER_OF_EXPENSES_PER_PAGE})
    })
   

    .then(expenses=>{
          const pagination={
            currentPage:page,
            hasNextPage:NUMBER_OF_EXPENSES_PER_PAGE *page<total_items,
            nextPage:page + 1,
            hasPreviousPage:page>1,
            previousPage:page-1,
            lastPage:Math.ceil(total_items/NUMBER_OF_EXPENSES_PER_PAGE),

        }
        res.status(200).json({expenses,pagination,success:true})
    })
    .catch(err=>{
        res.status(500).json({error:err,success:false})
    })
  }

  exports.delete_expense=async(req,res,next)=>{
    console.log(req.params);
    const expenseid=req.params.id;
    console.log(expenseid,req.user.id);
    if(isstringinvalid(expenseid)){
       return res.status(400).json({success:false,message:'bad parameter'})
    }
    Expense.destroy({where:{id:expenseid,userId:req.user.id}}).then((noofrows)=>{
        if(noofrows===0){
            return res.status(400).json({success:false,message:'user doesnot belong to their expenses'})
        }
        return res.status(200).json({success:true,message:'Deleted successfully'})
    })
    .catch(err=>{
        return res.status(500).json({success:false,message:"failed"})
    })
  }