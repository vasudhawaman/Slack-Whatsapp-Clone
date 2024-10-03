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
const JWT_SECRET = "krishkrish@123";
const multer = require('multer');
const { errorMonitor } = require('nodemailer/lib/mailer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

// Register
router.post('/cheak', [
    body('email', "Enter the correct email").isEmail(),
    body('password', "Enter mininmun 6 letter passowrd").isLength(6)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
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
}
)

// Login
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
        let q1 = "SELECT * FROM users WHERE email=?";
        db.query(q1, [req.body.email], (err, user) => {
            if (user.length > 0) {
                responseSent = 1;
                return res.status(400).json({ error: "The account with this email id already exist" });
            }
            if (!responseSent) {
                let q2 = "SELECT * FROM users WHERE username=?"
                db.query(q2, [req.body.username], async (err, name) => {
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
                                console.log("user after signup", user)
                                const data = { id: user[0].id }
                                const token = await jwt.sign(data, JWT_SECRET, { expiresIn: '7 days' })
                                return res.cookie('token_for_talkpal', token, {
                                    maxAge: 24 * 60 * 60 * 7 * 1000 * 3,
                                    sameSite: "none",
                                    secure: "true",
                                    domain:'talkpal-backend.onrender.com',
                                    httpOnly:true
                                }).json({ message: "success" })
                            }
                        })
                    })
                })
            }
        })
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
        const q1 = "SELECT * FROM users WHERE username=?"
        db.query(q1, [req.body.username], async (err, result) => {
            if (result.length === 0) {
                return res.status(400).json({ error: "User does not exist" });
            }
            const user = result[0];
            const stringPassword = password.toString()
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
                maxAge: 24 * 60 * 60 * 7 * 1000 * 3,
                sameSite: "none",
                secure: "true",
                domain:'talkpal-backend.onrender.com',
                httpOnly:true
            }).json({ message: "success" })
        })
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
                pass: process.env.EMAIL_PASS
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
            }
            else {
                return res.status(500).json({ message: "New password is same as old password" })
            }
        }
    })
})

router.get('/getinfo', verifyToken, async (req, res) => {
    try {
        const q1 = "SELECT * FROM users where id=?"
        db.query(q1, [req.id], (err, user) => {
            if (err) throw err
            res.status(200).json(user[0])
        })
    } catch (err) {
        res.status(400).json({ message: "No user" });
    }
})

router.put('/updateinfo', verifyToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(403).json({ error: "No file uploaded" });
    }
    const userId = req.id;
    const mimetype = req.file.mimetype;
    const imageData = req.file.buffer;
    console.log(userId, imageData, mimetype);
    const query = "UPDATE users SET image=?, filename=? WHERE id=?";
    db.query(query, [imageData, mimetype, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: "Info has been updated" });
    });
});

router.put('/updatestatus', verifyToken, (req, res) => {
    if (req.body.status) {
        const q = "UPDATE users SET status=? WHERE (id=?)"
        db.query(q, [req.body.status, req.id], (err, result) => {
            if (err) res.status(400).json("Server error has been detected");
            res.json({ success: "Status has been updated" })
        })
    }
})

router.post('/logout', verifyToken, async (req, res) => {
    res.clearCookie('token_for_talkpal').json("cookiecleared")
})

router.delete('/delete', verifyToken, async (req, res) => {
    const q = "DELETE FROM users WHERE (id=?)"
    db.query(q, [req.id], (err, result) => {
        if (result.length > 0) {
            console.log("User deleted successfully")
            res.json({ success: "User deleted successfully" })
        } else {
            res.status(400).json("Unable to delete");
        }
    })
})

router.get('/allusers', verifyToken, (req, res) => {
    console.log(req.id);
    const q = "SELECT * FROM users WHERE id !=?"
    db.query(q, [req.id], (err, result) => {
        console.log(req.id)
        if (err) res.status(400).json("server error has been detected");
        res.json(result)
    })
})

router.post('/connection', verifyToken, async (req, res) => {
    console.log("hello", req.id)
    const q1 = "SELECT * FROM connections WHERE `sender`=? AND `receiver`=?"
    db.query(q1, [req.id, req.body.receiver], (err, result) => {
        console.log(q1)
        if (result.length === 0) {
            const q3 = "INSERT INTO connections (`sender`,`receiver`,`status`) VALUES (?,?,?)"
            console.log(req.body)
            db.query(q3, [req.id, req.body.receiver, 0], (err, result) => {
                if (err) res.status(400).json("server error has been detected");
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
        if (err) res.status(400).json("server error has been detected");
        res.json(result)
    })
})

router.post('/createroom', verifyToken, async (req, res) => {
    const q = 'SELECT roomid FROM whatsapp.room ORDER BY roomid DESC';
    console.log(q);
    db.query(q, (err, result) => {
        if (err) { res.status(400).json("server error has been detected"); }
        const roomid = result[0].roomid + 1; //new room id => same time insert this into connection roomid 
        const q1 = "INSERT INTO room (userids,roomid) VALUES (?,?)"
        db.query(q1, [req.id, roomid], (err, result) => {
            if (err) res.status(400).json("server error has been detected");
            console.log("Room created successfully")
            const q2 = "INSERT INTO room (userids,roomid) VALUES (?,?)"
            db.query(q2, [req.body.receiver, roomid], (err, result) => {
                if (err) res.status(400).json("server error has been detected");
                console.log("Room created successfully with other user")
                const q4 = "UPDATE connections SET status=1 WHERE receiver=? and sender=? "
                db.query(q4, [req.id, req.body.receiver], (err, result) => {
                    if (err) res.status(400).json("server error has been detected");
                    console.log("Connection status updated")
                    res.json({ success: "Room created successfully" })
                })
            })
        })
    })
})

router.post('/contacts', verifyToken, async (req, res) => {
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
            db.query(userQuery, [r.roomid, r.roomid, req.id], (err, users) => {
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
        if (err) res.status(400).json("server error has been detected");;
        console.log("Deleted connection succesfully");
        res.json({ success: "Deleted user successfully" })
    })
})

router.post('/status', verifyToken, upload.single('file'), (req, res) => {
    const q = "INSERT INTO status (`user_id`, `file`, `mimetype`, `starting_date`, `expiry_date`) VALUES (?, ?, ?, ?, ?)";
    const startingDate = new Date();
    const expiryDate = new Date(startingDate.getTime() + 1000 * 60 * 60 * 24);
    function formatDateForMySQL(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const formattedStartingDate = formatDateForMySQL(startingDate);
    const formattedExpiryDate = formatDateForMySQL(expiryDate);
    db.query(q, [req.id, req.file.buffer, req.file.mimetype, formattedStartingDate, formattedExpiryDate], (err, result) => {
        if (err) {
            console.error("Error updating status:", err);
            return res.status(500).json({ error: "Failed to update status" });
        }
        console.log("Status updated successfully");
        res.json({ success: "Status updated successfully" });
    });

})
router.post('/creategroup', verifyToken, upload.single('file'), (req, res) => {
    const q = 'SELECT roomid FROM whatsapp.room ORDER BY roomid DESC';

    if (!req.file) {
        console.error("No image uploaded");
        return res.status(400).json({ error: "No image uploaded" });
    }

    if (!req.body.group_name) {
        console.error("No group name provided");
        return res.status(400).json({ error: "No group name provided" });
    }

    db.query(q, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Server error has been detected" });
        }

        const roomid = result[0] ? result[0].roomid + 1 : 1; // Handle case where result is empty
        const insertGroupQuery = "INSERT INTO `group` (`group_name`, `groupid`, `image`, `img_mimetype`, `adminid`) VALUES (?, ?, ?, ?, ?)";

        db.query(insertGroupQuery, [req.body.group_name, roomid, req.file.buffer, req.file.mimetype, req.id], (err, result) => {
            if (err) {
                console.error("Error inserting group:", err);
                return res.status(500).json({ error: "Server error has been detected" });
            }

            console.log("Group created successfully");

            const insertGroupRoomQuery = "INSERT INTO `group_room` (`group_roomid`, `userid`) VALUES (?, ?)";
            db.query(insertGroupRoomQuery, [roomid, req.id], (err, result) => {
                if (err) {
                    console.error("Error adding user to group:", err);
                    return res.status(500).json({ error: "Server error has been detected" });
                }

                console.log("User added successfully to group");
                res.json({ success: "Group created successfully" }); // Final response
            });
        });
    });

})
router.get('/allgroup', verifyToken, (req, res) => {
    try {
        const q = "SELECT * FROM `group` WHERE adminid=?";
        db.query(q, [req.id], (err, result) => {
            if (err) res.status(400).json("server error has been detected");
            else res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: `Err ${err}` });
    }

})
router.post('/adduser', verifyToken, (req, res) => {
    console.log(req.body); ``
    const q1 = "SELECT * FROM group_room WHERE group_roomid=? AND userid=?"
    db.query(q1, [req.body.groupid, req.body.user_id], (err, result) => {
        if (result.length !== 0) {
            res.status(201).json("User is already added in group");
        } else {
            try {
                const q = "INSERT INTO group_room (group_roomid, userid) VALUES (?, ?)";
                console.log(req.body);
                db.query(q, [req.body.groupid, req.body.user_id], (err, result) => {
                    if (err) res.status(400).json("server error has been detected");;
                    console.log("User added successfully to group");
                    res.json({ success: "User added successfully to group" });
                })
            } catch (err) {
                res.status(400).json({ message: `Err ${err}` });
            }

        }
    })
})

router.post('/getmember', verifyToken, (req, res) => {
    try {
        const q = "SELECT * FROM group_room JOIN users ON group_room.userid=users.id WHERE group_roomid=? AND group_room.userid !=?";
        db.query(q, [req.body.groupid, req.id], (err, result) => {
            if (err) res.status(400).json("server error has been detected");;
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(400).json({ message: `Err ${err}` });
    }

})

router.delete('/remove', verifyToken, (req, res) => {
    try {
        const q = "DELETE FROM group_room WHERE group_roomid=? AND userid=?";
        db.query(q, [req.body.groupid, req.body.user_id], (err, result) => {
            if (err) res.status(400).json("server error has been detected");;
            console.log("User removed successfully from group");
            res.status(200).json({ success: "User removed successfully from group" });
        })
    } catch (err) {
        res.status(400).json({ message: `Err ${err}` });
    }

})

router.get('/getgroup', verifyToken, (req, res) => {
    try {
        const q = `
SELECT g.*
FROM \`group\` g
LEFT JOIN group_room gr ON g.groupid = gr.group_roomid
WHERE gr.userid = ? OR g.adminId = ?
`;
        db.query(q, [req.id, req.id], (err, result) => {
            if (err) res.status(400).json("server error has been detected");;
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(400).json({ message: `Err ${err}` });
    }

})

module.exports = router;
