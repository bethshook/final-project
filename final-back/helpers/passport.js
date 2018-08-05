const passport = require('passport');
const User = require('../models/User');
var FacebookTokenStrategy = require('passport-facebook-token')

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// facebook strategy
passport.use(new FacebookTokenStrategy({
    clientID: '228596131187608',
    clientSecret: 'bb9a262000ecccdb200333b3935fba90'
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookId: profile.id})
    .then(user=>{
        if(!user) return User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            photoURL: profile.photos[0].value,
            facebookId: profile.id
        })
        return done(null, user) //if already exists
    })
    .then(user=>{
        return done(null,user)
    })
    .catch(e=>next(e))
    }
));

module.exports = passport;