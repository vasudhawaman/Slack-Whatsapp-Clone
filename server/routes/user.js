const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyUser');
const db = require('../db');
const JWT_SECRET = "krishkrish@123"

router.post('/cheak', [
    body('email', "Enter the correct email").isEmail(),
    body('password', "Enter mininmun 6 letter passowrd").isLength(6)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // let user = await User.findOne({ email: req.body.email });
    let responseSent = 0;
    let q1 = "SELECT * FROM users WHERE email=?";
    db.query(q1, [req.body.email], (err, emailResults) => {
        if (emailResults.length > 0) {
            if (!responseSent) {
                responseSent = true;
                return res.status(400).json({ error: 'An account with this email already exists' });
            }
        }
        if (!responseSent) {
            let q2 = "SELECT * FROM users WHERE username=?"
            db.query(q2, [req.body.username], (err, name) => {
                if (name.length > 0) {
                    return res.status(400).json({ error: "The person which has this username already exist. Choose different username" });
                } else {
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
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS
                        }
                    })

                    const mailoptions = {
                        from: process.env.EMAIL_USER,
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
                    res.json({ 'okay': 123, 'otp': otp });
                }
            })
        }
    })
    // let name = await User.findOne({ username: req.body.username });
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
        let responseSent = 0;
        // let user = await User.findOne({ email: req.body.email });
        let q1 = "SELECT * FROM users WHERE email=?";
        db.query(q1, [req.body.email], (err, user) => {
            if (user.length > 0) {
                responseSent = 1;
                return res.status(400).json({ error: "The account with this email id already exist" });
            }
            if (!responseSent) {
                let q2 = "SELECT * FROM users WHERE username=?"
                // let name = await User.findOne({ username: req.body.username });
                db.query(q2, [req.body.username], async (err, name) => {
                    console.log(name)
                    if (name.length > 0) {
                        return res.status(400).json({ error: "The person which has this username already exist. Choose different username" });
                    }

                    const password = req.body.password;
                    const salt = await bcrypt.genSalt(10);
                    const secPass = await bcrypt.hash(password, salt);
                    let q3 = "INSERT INTO users (`username`,`password`,`email`) VALUES (?,?,?)"
                    db.query(q3, [req.body.username, secPass, req.body.email], async (err, user) => {
                        if (err) throw err;
                        console.log("1 record inserted");
                        console.log(user);
                        let q4 = "SELECT * FROM users WHERE email=?"
                        db.query(q4, [req.body.email], async (err, user) => {
                            if (user.length > 0) {
                                console.log("user after signup",user)
                                const data = { id: user[0].id }
                                const token = await jwt.sign(data, JWT_SECRET, { expiresIn: '7 days' })
                                return res.cookie('token_for_talkpal', token, {
                                    maxAge: 30 * 24 * 60 * 60 * 1000,
                                }).json({ message: "success" })
                            }
                        })
                    })
                })
            }
        })

        // if (name) {
        //     return res.status(400).send("The person which has this username already exist. Choose different username");
        // }
        // const password = req.body.password;
        // const salt = await bcrypt.genSalt(10);
        // const secPass = await bcrypt.hash(password, salt)

        // user = new User({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: secPass
        // })
        // await user.save();


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
        // let user = await User.findOne({ username: req.body.username });
        const q1 = "SELECT * FROM users WHERE username=?"
        db.query(q1, [req.body.username], async (err, result) => {
            if (result.length === 0) {
                return res.status(400).json({ error: "User does not exist" });
            }
            const user = result[0];
            const stringPassword= password.toString()
            const passwordCompare = await bcrypt.compare(stringPassword, user.password);
            console.log('Plain Text Password Type:', typeof password);
            console.log('Hashed Password Type:', typeof user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }
            const data = { id: user.id };
            const token = jwt.sign(data, JWT_SECRET, { expiresIn: '7 days' })
            console.log(token)
            return res.cookie('token_for_talkpal', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
            }).json({ message: "success" })
        })
        // if (!user) {
        //     return res.status(400).send("Sorry! User has been not exist");
        // }

        // const passwordCompare = await bcrypt.compare(password, user.password);

        // if (!passwordCompare) {
        //     return res.status(400).json({ error: "Invalid Credentials" });
        // }

        // const data = {
        //     user: {
        //         username: user.username,
        //         password: user.password
        //     }
        // }
        // const data1 = user;

    }
    catch {
        return res.send(404).send("Sorry! Server error has been detected")
    }
})

router.post('/checkmail', async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // let user = await User.findOne({ email: req.body.email });
    let q1 = "SELECT * FROM users WHERE email=?"
    db.query(q1, [req.body.email], (err, user) => {
        if (user.length === 0) {
            return res.status(500).json({ message: "Unauthorised access of user" });
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
                user: process.env.EMAIL_USER,
                pass: EMAIL_PASS
            }
        })

        const mailoptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: `OTP for TalkPal`,
            html: `<p>The OTP for changing password in the TalkPal is ${otp}.</p><br></br><p>Do not share it with anyone.</p>`
        }
        transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                console.log("email is not sent");
            } else {
                console.log("email is sent successfully");
            }
        })
        res.send({ message: "success", otp: otp })
    })


}
)

router.put('/changepass', async (req, res) => {
    // let user = await User.findOne({ email: req.body.email });
    let q1 = "SELECT * FROM users WHERE email=?"
    db.query(q1, [req.body.email], async (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            let password = await bcrypt.compare(req.body.password, result[0].password)
            if (!password) {
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt);
                let q2 = "UPDATE users SET password=? WHERE (email=?)"
                db.query(q2, [secPass, req.body.email], (err, result) => {
                    if (err) throw err
                    console.log("Password has been updated")
                    res.json({ success: "Password has been updated" })
                })
                // user.password = secPass;
            }
            else {
                return res.status(500).json({ message: "New password is same as old password" })
            }
        }
    })
})

router.get('/getinfo', verifyToken, async (req, res) => {
    // const user = await User.findById(req.id);
    const q1 = "SELECT * FROM users where id=?"
    db.query(q1, [req.id], (err, user) => {
        if (err) throw err
        console.log(user)
        res.json(user[0])
    })
    // user.username = req.body.username;
    // user.status = req.body.status;
    // user.image = req.body.image;
    // user.save();
    // res.json(user);
})

router.post('/changeinfo', verifyToken, async (req, res) => {
    const q1 = "SELECT * FROM users where id=?"
    db.query(q1, [req.id], (err, user) => {
        if (err) throw err
        console.log(user[0])
        const q3 = "UPDATE users SET status=? , image=? WHERE (id=?)"
        db.query(q3, [req.body.status, req.body.image, req.id], (err, result) => {
            if (err) throw err
            console.log("Info has been updated")
            res.json({ success: "Info has been updated" })
        })
    })
})

router.post('/logout', verifyToken, async (req, res) => {
    res.clearCookie('token_for_talkpal')
})

router.delete('/delete', verifyToken, async (req, res) => {
    const q = "DELETE FROM users WHERE (id=?)"
    db.query(q, [req.id], (err, result) => {
        if (result.length > 0) {
            console.log("User deleted successfully")
            res.json({ success: "User deleted successfully" })
        }
    })
})

// router.post('/info',async (req,res)=>{
//     const [rows] =await new Promise((re) db.query('SELECT * FROM users WHERE email = ?', [req.body.email]));
//     res.send(rows);
// })

router.get('/allusers', verifyToken, (req, res) => {
    console.log(req.id);
    const q = "SELECT * FROM users WHERE id !=?"
    db.query(q, [req.id], (err, result) => {
        console.log(req.id)
        if (err) throw err
        res.json(result)
    })
})

router.post('/connection', verifyToken, async (req, res) => {
    // const q1="SELECT * FROM users WHERE id=?"
    // db.query(q1,[req.id],(err,sender)=>{
    //     if(err) throw err
    //     const q2="SELECT * FROM users WHERE id=?"
    //     db.query(q2,[req.body.receiver],(err,receiver)=>{
    //         if(err) throw err
    //         const q3="INSERT INTO connections (`sender`,`receiver`,`status`) VALUES (?,?,?)"
    //         db.query(q3,[req.iq,req.body.receiver,0],(err,result)=>{
    //             if(err) throw err
    //             console.log("Connection established")
    //             res.json({ success: "Connection established" })
    //         })
    //     })
    // }) 
    console.log("hello", req.id)
    const q1 = "SELECT * FROM connections WHERE `sender`=? AND `receiver`=?"
    db.query(q1, [req.id, req.body.receiver], (err, result) => {
        console.log(q1)
        if (result.length === 0) {
            const q3 = "INSERT INTO connections (`sender`,`receiver`,`status`) VALUES (?,?,?)"
            console.log(req.body)
            db.query(q3, [req.id, req.body.receiver, 0], (err, result) => {
                if (err) throw err
                console.log("Connection established")
                res.json({ success: "Connection established" })
            })
        }
        else {
            console.log("Connection already exists")
            res.json({ success: "Connection already exists" })
        }
    })

})

router.post('/connect', verifyToken, async (req, res) => {
    const q = "SELECT * FROM connections JOIN users ON connections.sender = users.id WHERE connections.receiver =? AND connections.status = 0; "
    db.query(q, [req.id], (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

router.post('/createroom', verifyToken, async (req, res) => {
    const q = 'SELECT roomid FROM whatsapp.room ORDER BY roomid DESC';
    db.query(q, (err, result) => {
        if (err) throw err
        const roomid = result[0].roomid + 1; //new room id => same time insert this into connection roomid 
        const q1 = "INSERT INTO room (userids,roomid) VALUES (?,?)"
        db.query(q1, [req.id, roomid], (err, result) => {
            if (err) throw err
            console.log("yeye" + roomid)
            console.log("Room created successfully")
            const q2 = "INSERT INTO room (userids,roomid) VALUES (?,?)"
            db.query(q2, [req.body.receiver, roomid], (err, result) => {
                if (err) throw err
                console.log("Room created successfully with other user")
                const q4 = "UPDATE connections SET status=1 WHERE receiver=? and sender=? "
                db.query(q4, [req.id, req.body.receiver], (err, result) => {
                    if (err) throw err
                    console.log("Connection status updated")
                    res.json({ success: "Room created successfully" })
                })
            })
        })
    })
    // const q='INSERT INTO room (userids) VALUE (?)'
    // db.query(q,[req.id],(err,result)=>{
    //     if(err) throw err
    //     const q1="INSER INTO room (userids) VALUE (?)"
    // })
})

router.post('/contacts',verifyToken, async (req, res) => {
    const roomQuery = "SELECT roomid FROM room WHERE userids=?";
    const room = await new Promise((resolve, reject) => {
        db.query(roomQuery, [req.id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    const allContactsPromises = room.map((r) => {
        const userQuery = "SELECT * FROM users INNER JOIN room ON room.userids=users.id AND room.roomid=? WHERE id IN (SELECT userids FROM room WHERE roomid=? AND userids!=?)";
        return new Promise((resolve, reject) => {
            db.query(userQuery, [r.roomid,r.roomid,req.id], (err, users) => {
                if (err) reject(err);
                else resolve(users);
            });
        });
    });
    const allContactResult = await Promise.all(allContactsPromises);
    const allcontact = allContactResult.flat();
    res.json(allcontact);
})

router.delete('/reject', verifyToken, async (req, res) => {
    const q = "DELETE FROM connections WHERE receiver=? and sender=?";
    db.query(q, [req.id, req.body.receiver], (err, result) => {
        if (err) throw err;
        console.log("Deleted connection succesfully");
        res.json({ success: "Deleted user successfully" })
    })
})

module.exports = router;
