function checkAuthenticated(req, res, next) {
    if(req.user) return next()
    else res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if(!req.user) return next()
    else res.redirect("/")
}

module.exports = { checkAuthenticated, checkNotAuthenticated }