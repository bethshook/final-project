const express = require('express');
const auth = express.Router();
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');

//multer config
const multer = require('multer');
const upload = multer({dest: './public/assets'});


// function isAuthenticated(req,res,next){
//     if(req.isAuthenticated()){
//         console.log(req.user)
//         return next()
//     }else{
//         res.json({message:"no tienes permiso"});
//     }
// }

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         res.redirect('/private')
//     }else{
//         next();
//     }
// }

auth.post('/logout', (req,res,next)=>{
    req.logout();
    res.status(200).json({message: 'SUCCESS!'});
});


auth.post('/login', (req,res,next)=>{
    passport.authenticate('local', (err, theUser, failureDetails)=>{
        if(err) {
            res.status(500).json({message: 'Something went wrong'});
            return;
        }
        if(!theUser){
            res.status(401).json(failureDetails);
            return;
        }
        req.login(theUser, (err)=>{
            if(err) {
                res.status(500).json({message: 'Something went wrong'});
                return;
            }
            res.status(200).json(req.user);
        });
    }) (req,res,next);
});

auth.get('/loggedin', (req,res,next)=>{
    if(req.isAuthenticated()){
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({message: 'Unauthorized'})
});

// auth.get('/private', isAuthenticated, (req,res)=>{
//     //const admin = req.user.role === "ADMIN";
//     //res.json({message:"esto es privao"});
//     Phone.find()
//     .then(phones=>res.json(phones))
//     .catch(e=>next(e))
// });

auth.post('/signup', (req,res,next)=>{
    // const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password ){ // || !username
        res.status(400).json({message: 'Provide email and password'});
        return;
    }
    User.findOne({ email }, '_id', (err,foundUser) => {
        if(foundUser) {
            res.status(400).json({message: 'This email already exists'});
            return
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password,salt);

        const theUser = new User ({
            // username,
            email,
            password: hashPass
        })

    theUser.save((err) => {
        if(err) {
            res.status(400).json({message: 'Something went wrong!'});
            return;
        }
        req.login(theUser, (err) => {
            if(err) {
                res.status(500).json({message: 'Something went wrong!'});
            }
            res.status(200).json(req.user)
        })
    })
});
});

module.exports = auth;