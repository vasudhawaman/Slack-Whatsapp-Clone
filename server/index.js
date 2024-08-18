const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');;
const cookieParser=require('cookie-parser');
const passport=require('passport')
const app = express();
const port = 5000;
const session=require('express-session');
require('./OAuth/googleOauth')
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'none'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));

app.get('/go', (req, res) => {
  res.send("google auth done");
});

// app.post('/createToken/:token',(req,res)=>{
//   const {token }= req.params;
//   res.cookie('token_for_talkpal',token,{
//     expires: new Date(Date.now() + 30*24*60*60*1000)
//   }).send("success")
//   // res.send(token)
// })

app.use('/register', require('./routes/user'));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3001' }),
  (req, res) => {
       const {token}=req.user;
       console.log(token) 
       res.cookie('token_for_talkpal',token,{
            maxAge:24*60*60*7*1000*3,
        }).redirect(`http://localhost:3000/allusers`)
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
