// basic server code will go here
const express =require("express");
const path =require('path');
const fs =require("fs");
const bodyParser =require('body-parser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
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
    socket.on("video_call",(data)=>{
        socket.broadcast.emit("recieve_call",data);
    })
    socket.on("join_call",(data)=>{
          socket.join("newrooom");
          socket.to("newroom").emit("on-call",data);
    })
})
server.listen( port ,()=>{
     console.log(`Server started on ${port}`);
});
app.post('/upload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    console.log("uploaded");
  })