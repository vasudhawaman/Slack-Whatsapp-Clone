// basic server code will go here
const express =require("express");
const path =require('path');
const app =express();
const cors =require('cors');

const port =process.env.PORT || 8000;

const http = require('http').Server(app);

const io = require('socket.io')(http);

// create a new connectionn 
app.use(cors());


http.listen( port ,()=>{
     console.log(`Server started on ${port}`);
});