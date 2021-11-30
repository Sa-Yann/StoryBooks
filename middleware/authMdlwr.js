module.exports = {
    ensureAuth: function (req, res, next) {
        // if a user is identified the we next() 
        if(req.isAuthenticated()){
            return next()
        } else {
            // else we redirect to the homepage in our case main/dashboard_biew
            res.redirect('/')
        }
    },
    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard_view')
        } else {
            return next()
        }
    }
}