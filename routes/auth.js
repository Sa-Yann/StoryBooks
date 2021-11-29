// we're requiring express to be able to use express.Router
const express = require('express')
const passport = require('passport');
const { route } = require('.');
// we're requiring express to be able to use express.Router
const router = express.Router()

// Authentificate with Google so Get request to Auth/google
// https://github.com/jaredhanson/passport-google-oauth2
router.get('/google',
// To authenticate we are using aur passport strategy that I scoded in the passport.js file in config folder
    passport.authenticate('google', { scope: ['profile'] })
);

// get google auth callback(response) Auth/google/callback
router.get('/google/callback', 
            passport.authenticate('google', { failureRedirect: "/" }), 
            // if authentification is succesfull we want to redirect to the dashboard
            (req, res) => { res.redirect('/dashboard_view')
})

//  Description logout user
//  @route => /auth/logout

router.get('/logout', (req, res) => {
    req.logout(), //first we logout
    res.redirect('/') // then we get redirected to the home page
})

module.exports = router