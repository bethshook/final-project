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

router.get('/loggedUser', isAuthenticated, (req,res)=>{
    User.findById(req.user._id)
    .populate('lists')
    .populate('friends')
    .populate('savedLists')
    .then(user=>{
        console.log(user)
        return res.json(user)
    })
    .catch(e=>console.log(e))
});

// sign up
router.post('/signup', (req,res,next) => {
    User.register(req.body, req.body.password)
    .then(user => res.json(user))
    .catch(e=>res.json(e))
});

// log in
router.post('/login', passport.authenticate('local'), (req,res,next) => {
    User.findById(req.user._id)
    .populate('lists')
    .then(user => res.json(user))
    .catch(e => res.json(e))
})

// facebook login
router.post('/facebook/login', passport.authenticate('facebook-token'), (req,res)=>{
    res.json(req.user)
})

router.get('/facebook/callback', passport.authenticate('facebook-token', {failureRedirect: '/signup'}),
    function(req,res){
        res.redirect('/signup')
    })

//log out
router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy()
    res.redirect('/');
  });

// get other user's profile
router.get('/profileUser/:id', (req,res)=>{
    User.findById(req.params.id)
    .populate('lists')
    .then(user=>{
        return res.json(user)
    }).catch(e=>console.log(e))
})

// get user profile
router.get('/dashboard/:id', isAuthenticated, (req,res,next)=>{
    User.findById(req.user._id)
    .populate('lists')
    .populate('friends')
    .populate('savedLists')
    .then(lists=>res.json(lists))
    .catch(e=>next(e))
});

// update existing user
  router.put('/dashboard/:id', (req,res,next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(user => {
            return res.status(202).json(user)
        }).catch(err => {
            return res.status(404).json(err);
        })
  })

  // updating existing user by adding friend
  router.put('/users/:id', (req,res,next) => {
      User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(user => {
        return res.status(202).json(user)
        }).catch(err => {
        return res.status(404).json(err);
    })
  })

// get all users
router.get('/users/:id', (req, res) => {
    User.find()
    .populate('lists')
        .then(users => {
            console.log(users)
            return res.status(200).json(users);
        })
        .catch(e => next(e))
    })

// save list to user savedLists array
router.put('/list-detail/:id/save', (req, res,next)=> {
    console.log('getting user for save get', req.user)
    User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    .then(list => {
        return res.status(202).json(list)
    }).catch(err => {
        return res.status(404).json(err)
    })
})

module.exports = router;