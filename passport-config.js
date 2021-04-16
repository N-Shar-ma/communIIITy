const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("./models/user.js")

function initialize() {
    const authenticateUser = async (accessToken, refreshToken, profile, done) => {
        if(!(profile.emails[0].value.split("@")[1]===process.env.COLLEGE_DOMAIN)) {
            return done(null, false)
        }
        // console.log(profile)
        try {
            const currentUser = await User.findOne({ email: profile.emails[0].value })
            if(currentUser){
                return done(null, currentUser)
            } else{
                const newUser = await User.create({
                    email: profile.emails[0].value,
                    name: profile.displayName
                })
                return done(null, newUser)
            } 
        } catch(e) {
            return done(e)
        }
    }

    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URI
        }, authenticateUser)
    )
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    })
}

module.exports = initialize