import express from "express"
import path from "path"
import mongoose  from "mongoose";
import userRouter from "./routes/user.Route.js";
import messageRouter from "./routes/message.Route.js"
import  cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import { server,app } from "./SocketIO/server.js"

const PORT = process.env.PORT || 3000 ;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

const URI=process.env.MONGODB_URI;



try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

// app.get("/",(req,res)=>{
//     res.send(" hi Welcome to Chat App");
// })
app.use("/api/user",userRouter);
app.use("/api/message",messageRouter)

// code for deployement

if(process.env.NODE_ENV==="production"){
    const dirPath=path.resolve();// it will give current loacation
    console.log(dirPath);
    
    app.use(express.static("./Frontend/dist"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"))
    })
}  
server.listen(PORT,(req,res)=>{
    console.log(`Server is listening on port ${PORT} `);
})