const router    = require('express').Router();
const passport  = require('passport');
const User      = require('../models/User');

router.post('/signup', (req,res,next) => {
    User.register(req.body, req.body.password)
    .then(user => res.json(user))
    .catch(e=>res.json(e))
});

router.post('/login', passport.authenticate('local'), (req,res,next) => {
    User.findById(req.user._id)
    .populate('lists')
    .then(user => res.json(user))
    .catch(e => res.json(e))
})

  // update existing user
  router.put('/city-survey/:id', (req,res,next) => {
    console.log('editing user on backend')
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            return res.status(202).json(list)
        }).catch(err => {
            return res.status(404).json(err);
        });
  })


module.exports = router;