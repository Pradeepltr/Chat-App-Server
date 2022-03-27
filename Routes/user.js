const Call=require("../Controllers/user")
const router=require("express").Router();
console.log("call api")
router.post("/register",Call.register);
router.post("/login",Call.login)
router.get("/alluser/:id",Call.alluser)
module.exports=router;