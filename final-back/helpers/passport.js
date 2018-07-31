const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const User          = require('../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, next) => {
    User.findOne({ email }, (err, foundUser) => {
      if(err) {
        next(err);
        return;
      }
      if(!foundUser) {
        next(null, false, { message: 'Incorrect Username' });
        return;
      }
      if(!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect Password'});
        return;
      }
      next(null, foundUser);
    });
  }));

  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });

  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if(err) {
        cb(err);
        return;
      }
      cb(null, userDocument);
    });
  });

}