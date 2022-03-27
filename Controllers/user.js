const User=require("../Model/user")
const bcrypt=require("bcrypt");

module.exports.register=async(req,res,next)=>{
    console.log("Api heat")
    try{
const {username,email,password}=req.body;
const userCheck=await User.findOne({username});
if(userCheck){
   return res.json({msg:"username already present",status:false})
}
const emailCheck=await User.findOne({email});
if(emailCheck){
    return res.json({msg:"Email Already present",status:false});
}
const encpass=await bcrypt.hash(password,10);
const user=await User.create({
    username,
    email,
    password:encpass
});
delete user.password;
return res.json({user,status:true})
    }
    catch(e){
    console.log(e);
    }
}
module.exports.login=async(req,res,next)=>{
    const {email,password}=req.body
    try{
        const findEmail=await User.findOne({email})
        if(!findEmail){
            return res.json({msg:"Email or Password wrong", status:false})
        }else{
            const pass=await bcrypt.compare(password,findEmail.password);
            if(!pass)
            {
                return res.json({msg:"Email or Password wrong", status:false}) 
            }
            delete findEmail.password;
            return res.json({status:true,findEmail})
        }
        

    }catch(e){
        console.log(e);
    }
}
module.exports.alluser=async(req,res,next)=>{
    try{
      const user=await User.find({_id:{$ne:req.params.id}}).select([
          "email",
          "username",
          "_id"
      ]);
      return res.json(user);
    }
    catch(e){
        next(e)
    }
}