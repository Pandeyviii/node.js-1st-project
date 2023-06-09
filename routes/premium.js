const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");
const premiumController=require("../controller/premium");

router.get("/showLeaderBoard",auth,premiumController.getLeaderBoard);
module.exports=router;