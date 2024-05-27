require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
let passport=require('/auth')
const cors = require('cors');
connectToMongo();


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("GET Request Called");
});

app.use('/register', require('./routes/user'));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
