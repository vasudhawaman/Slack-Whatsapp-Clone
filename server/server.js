// basic server code will go here
const express = require("express");
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const session=require('express-session');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const db =require("./db");
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
    origin: 'http://localhost:3000' || 'http://localhost:3001',
    credentials: true
}));


const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e9, // max 100MB for files 
    cors: {
        origin: ["http://localhost:3000", "https://localhost:3001"],
        methods: ["GET", "POST"]
    },


}); //max buffer set 
app.use('/register', require('./routes/user'));
io.on("connection", (socket) => {

    socket.on("join_chat", (data) => {
        console.log(`user ${data.user} has joined ${data.room}`)
        socket.join(data.room);
    }); // join a chat that already exists 
    socket.on('send_message', (data) => {
        console.log("emitted")
        console.log("message:",data) // save in db under user id as mine data.user 
        if(!data.file){
            // purely text based
            let q = "INSERT INTO files(`user_id`,`room_id`,`text`,`type`,`time`) VALUES (?,?,?,?,?)"
                    db.query(q, [data.user, data.room, data.text,data.type,data.time], async (err, user) => {
                        if (err) throw err;})

        }
       
        if (!data.file) {
            let q1 ="SELECT * FROM files WHERE user_id=? AND room_id=? ORDER BY DESC id";
            db.query(q1, [data.user, data.room], async (err, user) => {
                if (err) throw err;}).then((result)=>{
                    console.log(result);
                    socket.to(data.room).emit('recieve_message', data);
                })

            
        } else {
            let q = "INSERT INTO files(`user_id`,`room_id`,`file`,`type`,`time`,`filename`,`mimetype`,`text`) VALUES (?,?,?,?,?,?,?,?)"
            // data.file is of type buffer so convert to blob then store 
            let buffer = [data.source];
            let blob = new Blob(buffer,{type:data.mimetype});
            db.query(q, [data.user, data.room, blob,data.type,data.time,data.filename], async (err, user) => {
                if (err) throw err;})

            socket.to(data.room).emit('recieve_message', data);

    }});
    
    socket.on("join_call", (data) => {
        console.log(`${data.user} is requesting to join`);
        socket.to(data.room).emit("recieve_call", data);
    })

    socket.on("start_call", (data) => {
        console.log(data.room)
        console.log(`user ${data.user} has joined ${data.room}`)
        socket.to(data.room).emit("on-call", data);
    })
    socket.on("end-call", (data) => {

        socket.to(data.room).emit("call-end", data);
    })


})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3001' }),
    (req, res) => {
        const { token } = req.user;
        console.log(token)
        res.cookie('token_for_talkpal', token, {
            maxAge: 24 * 60 * 60 * 7 * 1000 * 3,
        }).redirect(`http://localhost:3000/allusers`)
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

