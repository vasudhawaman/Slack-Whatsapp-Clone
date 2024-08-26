const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const env = require("dotenv");
const db = require('../db')
env.config();
const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const JWT_SECRET = "krishkrish@123";
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
    redirect_uri: 'http://localhost:3001',
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        // let user = await User.findOne({ email: profile.emails[0].value });
        let q = "SELECT * FROM users WHERE email=?"
        db.query(q, [profile.emails[0].value], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                
                const data1 = { id: result[0].id }
                const token = jwt.sign(data1, JWT_SECRET, { expiresIn: '7 days' })
                return done(null,token, { message: 'Email already exists' });
            }
            if (result.length === 0) {
                const q1 = "INSERT INTO users (`username`,`email`) VALUES (?,?)";
                db.query(q1, [profile.displayName, profile.emails[0].value], (err, result) => {
                    if (err) throw err;

                    if (result.length > 0) {
                        const q3 = "SELECT * FROM users WHERE email=?"
                        db.query(q3, [profile.emails[0].value], (err, result) => {
                            if (err) throw err;
                            if (result.length > 0) {
                                const data1 = { id: result[0].id }
                                const token = jwt.sign(data1, JWT_SECRET, { expiresIn: '7 days' })
                                console.log(token)
                                return done(null, token, { profile });
                            }
                        })
                    }
                })
            }
        })
        return done(null, { profile });
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});