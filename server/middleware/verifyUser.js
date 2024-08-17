const express = require('express');
const app = express();
const JWT_SECRET = "krishkrish@123"
const jwt= require('jsonwebtoken')
async function verifyToken(req, res, next) {
    if (!req.cookies.token_for_talkpal) {
        res.status(404).send("Unauthorised access of user")
    }
    try {
        const user =await jwt.verify(req.cookies.token_for_talkpal, JWT_SECRET);
        console.log(user)
        req.id = user.id;
        next();
    }catch(err){
        console.log(err)
        res.status(404).send("Server Error")
    }
}

module.exports= verifyToken
