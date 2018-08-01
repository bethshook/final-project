const router    = require('express').Router();
const User      = require('../models/User');
const passport  = require('passport')

router.post('/signup', (req,res,next) => {
    User.register(req.body, req.body.password)
    .then(user => res.json(user))
    .catch(e=>res.json(e))
});

router.post('/login', passport.authenticate('local'), (req,res,next) => {
    res.json(req.user);
})


module.exports = router;