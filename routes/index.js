// we're requiring express to be able to use express.Router
const express = require('express')
const router = express.Router()
// routes to login and dashboard will b eprotected by the authentification midlewares written in authMdlwr.js
const {ensureAuth, ensureGuest} = require('../middleware/authMdlwr')
const Story = require('../models/Story')


// @desc is the Login Page/ Landing page : render via @route  a .get(){} to / /// login_layout.hbs layout rendering the login_view.hbs
router.get('/', ensureGuest, (req, res) => {
    // res.send('logiiiiiiiin') to test response rendering on localhost:3500 before creating the handelbars loginview
    res.render('login_view', {
        // here we specify that we want the login view to render the login_view based on the login_layout.hrs file in the layouts folder
        layout: 'login_layout'
    })
})

//@desc Dashboard page render via @route a .get(){} request to /dashboard //// 
// @description        users route
// @returns           ../views/dashboard_view.hbs
router.get('/dashboard_view', ensureAuth, async (req, res) => {
    console.log("🚀 ~ file: index.js ~ line 18 ~ router.get ~ req.user", req.user)
    // res.send('dasbooooooaaaard') to test response rendering on localhost:3500/dasboard before creating the handelbars loginview
    try {
        // lean() is a methode : mongoose queries return their mongoose objects with a bunch of extra properties, .lean() will return a dumb json from the mongoose database
       const stories = await Story.find({userId: req.user.id}).lean()
       res.render('dashboard_view', {
        nameUser: req.user.firstName,
        stories
    })
    } catch (err) {
        // in case of error we wonna render an error template
       console.error(err)
       res.render('/error/500')
    }
    // res.render('dashboard_view', {
    //     nameUser: req.user.firstName,
    // })
})

module.exports = router