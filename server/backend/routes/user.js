const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const nodemailer = require('nodemailer')

router.post('/cheak', [
    body('email', "Enter the correct email").isEmail(),
    body('password', "Enter mininmun 6 letter passowrd").isLength(6)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send("The account with this email id already exist");
    }
    let name = await User.findOne({ username: req.body.username });
    if (name) {
        return res.send(400).send("The person which has this username already exist. Choose different username");
    }
    function OTP() {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
    const otp = OTP();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "krishpathak20@gmail.com",
            pass: "ozav lnnj uvvb satg"
        }
    })

    const mailoptions = {
        from: "krishpathak20@gmail.com",
        to: req.body.email,
        subject: `OTP for TalkPal`,
        html: `<p>The OTP for logging in the TalkPal is ${otp}.</p><br></br><p>Do not share it with anyone.</p>`
    }
    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            console.log("email is not sent");
        } else {
            console.log("email is sent successfully");
        }
    })
    res.json({'okay':123,'otp':otp});
}
)
router.post('/signup', [
    body('email', "Enter the correct email").isEmail(),
    body('password', "Enter mininmun 6 letter passowrd").isLength(6)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send("The account with this email id already exist");
        }
        let name = await User.findOne({ username: req.body.username });
        if (name) {
            return res.send(400).send("The person which has this username already exist. Choose different username");
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })
        await user.save();
        res.json(user);


    } catch (err) {
        return res.status(404).send("Sorry! Server error has been detected")
    }

})
//Login for user data
router.post('/login', [
    body('password', "Enter mininmun 6 letter passowrd").isLength(6)
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send("Sorry! User has been not exist");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = {
            user: {
                username: user.username,
                password: user.password
            }
        }
        res.json(data)
    }
    catch {
        return res.send(404).send("Sorry! Server error has been detected")
    }
})
module.exports = router;