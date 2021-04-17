// we're requiring express to be able to use express.Router
const express = require('express')
const router = express.Router()

// Login / Landing page render via a .get(){} to /
router.get('/', (req, res) => {
    // res.send('logiiiiiiiin') to test before creating the handelbars loginview
    res.render('login_view')
})

// Dashboard page render via a .get(){} to /dashboard
router.get('/dashboard_view', (req, res) => {
    // res.send('dasbooooooaaaard') to test before creating the handelbars loginview
    res.render('dashboard_view')
})

module.exports = router