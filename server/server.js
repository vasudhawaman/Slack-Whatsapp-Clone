// basic server code will go here
const express =require("express");
const path =require('path');
const app =express();
const cors =require('cors');
const http = require('http');
const {Server } = require('socket.io');

const port =8000;
// create a new connectionn 
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("recieve_message",data)
    })
})
server.listen( port ,()=>{
     console.log(`Server started on ${port}`);
});