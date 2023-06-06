const express=require("express");
const router=express.Router();
const razorpayController=require("../controller/purchase");
const auth=require("../middleware/auth");
router.get("/premiummembership",auth,razorpayController.purchasePremium);
router.post("/updatetransactionstatus",auth,razorpayController.getUpdate)

module.exports=router;