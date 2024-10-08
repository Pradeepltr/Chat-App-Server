const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const user=require("./Routes/user")
const MSG=require("./Routes/MSG")
const socket=require("socket.io")

const app=express();
require("dotenv").config();

app.use(cors())
app.use(express.json());
// app.use("/" ,(req,res)=>{
//     res.send("Server is running")
// })
app.use("/api/auth",user)
app.use("/api/msg",MSG)
mongoose.connect("mongodb+srv://pk6361439:Pradeep1994@cluster0.oktpbg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("database connection established!!!")
}).catch((e)=>{
    console.log("database not established")
})
const port=process.env.PORT || 8000
const server=app.listen(port,()=>{
    console.log("Server Run on port : ",port)
})
const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
})
global.onlineUser=new Map();
io.on("connection",(socket) =>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUser.set(userId,socket.id)
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUser.get(data.to);
        if(sendUserSocket)
        {
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    })
});