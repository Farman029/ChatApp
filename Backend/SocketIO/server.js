import express from "express";
import http from "http";
import { Server } from "socket.io";

const app=express();
const server=http.createServer(app);

const io=  new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    }
})
const users = {};

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
  };
  
// server-side
io.on("connection", (socket) => {

    console.log("server side is printing :" + socket.id); // ojIckSD2jqNzOqIrAGzL
    const userId = socket.handshake.query.userId;// forntend me humne socket query me store kri thi user id 
    if (userId) {
      users[userId] = socket.id;  //common way to dynamically set a property of an object using a variable as the key in JavaScript. show in below
      console.log("Hello ", users);
    }

  // used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users)); 


    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
      });

  });

export { app, io, server };

// Module Syntax

// import { Server } from "socket.io";
// const io = new Server(server,Oject);  Object me forntend ka url hoga
// {
//     cors:{
//         origin:" http://localhost:3000/  ", origin me forntend ka url hai methods me get and post 
//         methods: ["GET", "POST"],
//     }
// }
// io.listen(3000);

// let myObject = {};
// let key = "name";
// myObject[key] = "John Doe";

// console.log(myObject); // { name: "John Doe" }
