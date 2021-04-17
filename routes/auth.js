// we're requiring express to be able to use express.Router
const express = require('express')
const passport = require('passport')
const router = express.Router()

// Authentificate with Google so Get request to Auth/google
// https://github.com/jaredhanson/passport-google-oauth2
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

// get google auth callback(response) Auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: "/" }), (req, res) => {
    res.redirect('/dasboard')
})

module.exports = router