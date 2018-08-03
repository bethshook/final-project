const router    = require('express').Router();
const passport  = require('passport');
const User      = require('../models/User');
const Place     = require('../models/Place');
const List      = require('../models/List')

router.post('/signup', (req,res,next) => {
    User.register(req.body, req.body.password)
    .then(user => res.json(user))
    .catch(e=>res.json(e))
});

router.post('/login', passport.authenticate('local'), (req,res,next) => {
    res.json(req.user);
})

// post new place (eventually to list)
router.post('/list-detail', (req,res,next) => {
    console.log(req.body)
    Place.create(req.body)
    .then(place => res.json(place))
    .catch(e=>res.json(e))
  });

// post new list
router.post('/city-survey', (req,res,next) => {
    console.log(req.body)
    List.create(req.body)
    .then(list => res.json(list))
})

module.exports = router;