const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
// we want passport to be able to use the User info from teh user.js modelexports
// model.exports = mongoose.mmodel('User', UserSchema)
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        // GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET variable set in config.env 
        // and values given by google cloud platform 
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callBackURL: set during the set up of teh API in google cloud platform
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
        }))
    // Each subsequent request will not contain credentials, but rather the unique cookie 
    // that identifies the session.In order to support login sessions, Passport will 
    // serialize and deserialize user instances to and from the session.
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}


