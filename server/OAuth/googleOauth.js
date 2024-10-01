const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const env = require("dotenv");
const db = require('../db');

env.config();
const JWT_SECRET = process.env.JWT_SECRET || "krishkrish@123"; // Make sure your secret is defined

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
    passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        console.log("Google Profile:", profile); // Log the entire profile for inspection

        const q = "SELECT * FROM users WHERE email=?";
        
        db.query(q, [email], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return done(err);
            }

            console.log("Query Result:", result); // Check what the query returned

            if (result.length > 0) {
                // User already exists
                const data1 = { id: result[0].id };
                console.log("Data to be signed:", data1); // Log the data to be signed
                const token = jwt.sign(data1, JWT_SECRET, { expiresIn: '7 days' });
                console.log("Existing user token:", token); // Log the token
                return done(null, { token, profile: result[0] }, { message: 'Email already exists' });
            }

            // User doesn't exist, create a new one
            const q1 = "INSERT INTO users (`username`,`email`) VALUES (?,?)";
            db.query(q1, [profile.displayName, email], (err, result) => {
                if (err) {
                    console.error("Database Insert Error:", err);
                    return done(err);
                }

                const q3 = "SELECT * FROM users WHERE email=?";
                db.query(q3, [email], (err, result) => {
                    if (err) {
                        console.error("Database Select Error:", err);
                        return done(err);
                    }
                    
                    if (result.length > 0) {
                        const data1 = { id: result[0].id };
                        console.log("Data to be signed (new user):", data1); // Log the data to be signed
                        const token = jwt.sign(data1, JWT_SECRET, { expiresIn: '7 days' });
                        console.log("New user token:", token); // Log the token
                        return done(null, { token, profile: result[0] });
                    } else {
                        return done(null, false, { message: 'User not found after creation' });
                    }
                });
            });
        });
    } catch (error) {
        console.error("Unexpected Error:", error);
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
