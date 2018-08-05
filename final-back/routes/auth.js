const router    = require('express').Router();
const passport  = require('passport');
const User      = require('../models/User');

//multer config
// const multer = require('multer');
// const upload = multer({dest: './public/assets'});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log(req.user)
        return next()
    }else{
        res.json({message:"You don't have permission"});
    }
}

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         res.redirect('/dashboard')
//     }else{
//         next();
//     }
// }

router.get('/dashboard', isAuthenticated, (req,res)=>{
    User.findById(req.user._id)
    .populate('lists')
    .then(lists=>res.json(lists))
    .catch(e=>next(e))
});

// facebook login
router.post('/facebook/login', passport.authenticate('facebook-token'), (req,res)=>{
    res.json(req.user)
})

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