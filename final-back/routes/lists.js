const express = require('express');
const router  = express.Router();
const path = require('path');
const Place     = require('../models/Place');
const List      = require('../models/List')
const User      = require('../models/User')

//archivos
// const multer = require('multer')
// const uploads = multer({dest: './public/images'})

// post new place (eventually to list)
router.post('/list-detail', (req,res,next) => {
    console.log(req.body)
    Place.create(req.body)
    .then(place => res.json(place))
    .catch(e=>res.json(e))
  });

  // post new list
  router.post('/dashboard', (req,res,next) => {
    List.create(req.body)
    .then(list => {
      res.json(list)
    })
    .catch(e=>res.json(e))
  })

  // edit existing list after survey
  router.put('/city-survey/:id', (req,res,next) => {
    List.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(list => {
      return res. status(202).json(list)
    }).catch(err => {
      return res.status(404).json(err)
    })
  })

  // edit existing list
  router.put('/list-detail/:id', (req,res,next) => {
    console.log('editing list on backend')
    List.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(list => {
            return res.status(202).json(list)
        }).catch(err => {
            return res.status(404).json(err);
        });
  })

  //get list
  router.get('/list-detail/:id', (req,res) => {
    List.findById(req.params.id)
    .populate('places')
    .populate('user')
    .then(list => {
      // console.log(list, 'this comes from back end') works
      if (!list) return res.status(404);
      return res.status(200).json(list);
    })
    .catch(err => {
      return res.status(500).json(err);
    })
  })

  //delete list
  router.delete('/list-detail/:id', (req,res,next)=>{
    List.findByIdAndRemove(req.params.id)
    .then(list => {
      res.status(200).json(list)
    }).catch(e=>{
      res.status(500).json({message: 'Something went wrong.'})
      next(e)
    })
  })

  //delete place
  // router.delete('/delete-place/:id', (req,res,next) => {
  //   Place.findByIdAndRemove(req.params.id)
  //   .then(place => {
  //     res.status(200).json(phone)
  //   })
  //   .catch(e=>{
  //     res.status(500).json({message:"Something went wrong."})
  //     next(e)
  //   })
  // })

  module.exports = router;