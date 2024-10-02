// basic server code will go here
const express = require("express");
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const db = require("./db");
const app = express();
app.use(express.json());
require('./OAuth/googleOauth')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const port = 8000;
// create a new connectionn 
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'none'
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));


const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e9, // max 100MB for files 
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
}); //max buffer set 
app.use('/register', require('./routes/user'));
app.use('/language',require('./routes/detect'))
let users =[]; // map socket ids to usernames
io.on("connection", (socket) => {
    socket.on("join_chat", (data) => {
        console.log(`user ${data.user} has joined ${data.room}`)
        socket.join(data.room);
        let q = "SELECT * FROM files WHERE room_id=? order by id asc"
         db.query(q, [data.room],(err,result)=>{
           if(err) throw err;

           io.to(data.room).emit('recieve_message',result);
        })
        let q1 = "SELECT DISTINCT date FROM files WHERE room_id=?"
         db.query(q1, [data.room],(err,result)=>{
           if(err) throw err;
           io.to(data.room).emit('date_set',result);
        })
    }); // join a chat that already exists 
    socket.on('send_message', (data) => {
     
        // save in db under user id as mine data.user 
         if(!data.file){
             // purely text based
           
               try{
                let q = "INSERT INTO files(`user`,`room_id`,`text`,`time`,`date`,`filename`) VALUES (?,?,?,?,?,?)"
               
               db.query(q, [data.user,data.room, data.text,data.time,data.date,"txt"],(err,result)=>{
                if(err) throw err;
               });
            }catch(err){
                console.log(err);
            }
    }else {
             try{

                 let q = "INSERT INTO files(`user`,`room_id`,`file`,`time`,`filename`,`mimetype`,`text`,`date`,`type`) VALUES (?,?,?,?,?,?,?,?,?)"

                db.query(q, [data.user, data.room,data.source,data.time,data.name,data.mimetype,data.text,data.date,data.file],(err,result)=>{
                  if(err) throw err;
                       })
            }catch(err){
                console.log(err);
            }
    }
    try{

        let q1 = "SELECT DISTINCT date FROM files WHERE room_id=?"
        db.query(q1, [data.room],(err,result)=>{
          if(err) throw err;
          io.to(data.room).emit('date_set',result);
       })
          let q = "SELECT * FROM files WHERE room_id=? order by id asc"
         db.query(q, [data.room],(err,result)=>{
           if(err) throw err;
           io.to(data.room).emit('recieve_message',result);
        })
       
    }catch(err){
        console.log(err);
    }
    
        
  });
    
    socket.on("join_call", (data) => {
        console.log(`${data.user} is requesting to join`);
        socket.to(data.room).emit("recieve_call", data);
    })

    socket.on("start_call", (data) => {
        console.log(data.room)
        console.log(`user ${data.user} has joined ${data.room}`);
        socket.to(data.room).emit("on-call", data);
    })
    socket.on("end-call", (data) => {
              console.log("end-call",data)
              io.to(data.room).emit('call-end',data);
    })


})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/register' }),
    (req, res) => {
        console.log("hello");
        const {token}=req.user;
        console.log(req.user);
        res.cookie('token_for_talkpal', String(token), {
            maxAge:24*60*60*7*1000*3,
               sameSite:"none",
              secure:"true",
              domain: process.env.DOMAIN
        });
        res.redirect(`http://localhost:3000`);
    });

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});
app.post('/upload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    console.log("uploaded");
})

