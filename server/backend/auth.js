const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '4148035630-t5q5o3g1705jif78381420pimas65j6o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Configure the Google strategy for use by Passport.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return cb(null, profile);
  }
));

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the sessions
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports=passport