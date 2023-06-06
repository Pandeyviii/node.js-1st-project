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
    try{
        const allexpense=await Expense.findAll({where:{userId:req.user.id}});
        res.status(200).json(allexpense)
        console.log(allexpense)
    }
    catch{error=>{
        res.status(500).json({success:false,error:error});
    }}
  }

  exports.delete_expense=async(req,res,next)=>{
    try{
        if(!req.params.id){
            console.log('id is missing')
            res.status(400).json({err:'id is missing'})
        }
    const uId = req.params.id;
    await Expense.destroy({where:{userId:req.user.id}})
    }catch{error=>{
        res.status(500).json({success:false,error:error});
    }}
  }