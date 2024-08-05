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
    maxHttpBufferSize: 1e9,
    cors:{
        origin: ["http://localhost:3000", "https://localhost:3001"],
        methods:["GET","POST"]
    },
    
}); //max buffer set 

io.on("connection",(socket)=>{
    
    socket.on("join_chat",(data)=>{
        console.log(`user ${data.user} has joined ${data.room}`)
        socket.join(data.room);
    }); // join random chat
    socket.on('send_message', (data) => {
        console.log("emitted")
        if(!data.file){
            socket.to(data.room).emit('recieve_message',data); 
        }else{
                  
                 // data.source = blob;
                  console.log(data);
                  socket.to(data.room).emit('recieve_message',data); 
        }
        
      });
      socket.on("join_call",(data)=>{
        socket.join(data.room);       
  })
  
    socket.on("start_call",(data)=>{
        console.log(data.room)
        console.log(`user ${data.user} has joined ${data.room}`)
        socket.to(data.room).emit("on-call",data);
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
