// we're requiring express to be able to use express.Router
const express = require('express')
const router = express.Router()

// @desc is the Login Page/ Landing page : render via @route  a .get(){} to /
router.get('/', (req, res) => {
    // res.send('logiiiiiiiin') to test response rendering on localhost:3500 before creating the handelbars loginview
    res.render('login_view', {
        // here we specify that we want the login view to render the login_view based on the login_layout.hrs file in the layouts folder
        layout: 'login_layout'
    })
})

//@desc Dashboard page render via @route a .get(){} request to /dashboard
router.get('/dashboard_view', (req, res) => {
    // res.send('dasbooooooaaaard') to test response rendering on localhost:3500/dasboard before creating the handelbars loginview
    res.render('dashboard_view')
})

module.exports = router