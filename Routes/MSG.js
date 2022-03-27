const Call=require("../Controllers/MSG")

const router=require("express").Router();


router.post("/addmsg/",Call.addMessage);
router.post("/getmsg/",Call.getmessage)
module.exports=router;